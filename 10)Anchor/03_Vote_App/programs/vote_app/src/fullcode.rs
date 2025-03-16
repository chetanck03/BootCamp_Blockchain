use anchor_lang::prelude::*;

declare_id!("8P73DpCUxjtccmimQ5EF7W1QNi9TQknjV2fvmuDVkGVt");

#[program]
pub mod vote_app {
    use super::*;
    
    // ==================== ADMIN FUNCTIONS ====================
    
    /// Registers the election commission (admin) account
    /// @param ctx: Program context containing all account information
    /// @param c_name: Name of the commission
    /// @param party_name: Name of the party
    pub fn register_election_commision(ctx: Context<RegisterElectionCommision>) -> Result<()> {
        let election_commision = &mut ctx.accounts.election_commision;
        // Store the account that created this as the election commission ID
        election_commision.e_id = ctx.accounts.payer.key();
        Ok(())
    }

    // ==================== CANDIDATE FUNCTIONS ====================

    /// Registers a new candidate for the election
    /// @param ctx: Program context
    /// @param c_name: Candidate's name
    /// @param party_name: Candidate's party name
    pub fn register_candidate(ctx: Context<RegisterCandidate>,c_name:String,party_name:String) -> Result<()> {
        let candidate = &mut ctx.accounts.candidate;
        // Initialize new candidate with 0 votes
        candidate.set_inner(Candidate{
           c_id:ctx.accounts.payer.key(),
           party_name:party_name,
           c_name:c_name,
           votes:0
        });
        Ok(())
    }

    // ==================== VOTER FUNCTIONS ====================

    /// Registers a new voter
    /// @param ctx: Program context
    /// @param v_name: Voter's name
    pub fn register_voter(ctx: Context<RegisterVoter>,v_name:String) -> Result<()> {
        let voter = &mut ctx.accounts.voter;
        // Initialize new voter with voting status as false
        voter.set_inner(Voter{
           v_id:ctx.accounts.payer.key(),
           v_name:v_name,
           is_voted:false
        });
        Ok(())
    }

    /// Allows a voter to cast their vote for a candidate
    /// @param ctx: Program context containing voter and candidate accounts
    pub fn cast_vote(ctx: Context<CastVote>) -> Result<()> {
        let voter = &mut ctx.accounts.voter;
        let candidate = &mut ctx.accounts.candidate;

        // Security checks
        require!(voter.is_voted==false,VotingError::AlreadyVoted);
        require!(voter.v_id==ctx.accounts.payer.key(),VotingError::NotTheOwner);

        // Update voting records
        candidate.votes=candidate.votes+1;
        voter.is_voted=true;
        Ok(())
    }
    
    /// Announces the winner (admin only function)
    /// @param ctx: Program context
    pub fn announce_winner(ctx: Context<AnnounceWinner>) -> Result<()> {
        require!(ctx.accounts.election_commision.e_id==ctx.accounts.payer.key(),VotingError::NotFromElectionCommision);
        let election_commision = &mut ctx.accounts.election_commision;
        let candidate = &mut ctx.accounts.candidate;
        Ok(())
    }
}

// ==================== ERROR DEFINITIONS ====================

/// Custom error types for the voting program
#[error_code]
pub enum VotingError{
    #[msg("Already voted")]
    AlreadyVoted,      // When voter tries to vote twice

    #[msg("Not the owner")]
    NotTheOwner,       // When someone tries to use another's account

    #[msg("Not from election commision")]
    NotFromElectionCommision  // When non-admin tries admin actions
}

// ==================== ACCOUNT STRUCTURES ====================

/// Structure for storing election commission data
#[account]
#[derive(InitSpace)]
pub struct ElectionCommision{
    e_id:Pubkey,  // Commission's public key
}

/// Structure for storing candidate information
#[account]
#[derive(InitSpace)]
pub struct Candidate{
    c_id:Pubkey,           // Candidate's public key
    #[max_len(20)]
    party_name:String,     // Party name (limited to 20 chars)
    #[max_len(20)]
    c_name:String,         // Candidate name (limited to 20 chars)
    votes:u8               // Vote count
}

/// Structure for storing voter information
#[account]
#[derive(InitSpace)]
pub struct Voter{
    v_id:Pubkey,          // Voter's public key
    #[max_len(20)]
    v_name:String,        // Voter name (limited to 20 chars)
    is_voted:bool         // Voting status
}

// ==================== ACCOUNT VALIDATION STRUCTURES ====================

/// Validation structure for RegisterCandidate instruction
#[derive(Accounts)]
#[instruction(c_name:String)]
pub struct RegisterCandidate<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,    // Transaction signer (fee payer)

    #[account(init,
    space= 8 + Candidate::INIT_SPACE,
    payer = payer,
    seeds=[c_name.as_bytes(),payer.key().as_ref()],
    bump)]
    pub candidate:Account<'info,Candidate>,    // Candidate account

    pub system_program:Program<'info,System>   // System program
}

/// Validation structure for RegisterVoter instruction
#[derive(Accounts)]
#[instruction(v_name:String)]
pub struct RegisterVoter<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,    // Transaction signer

    #[account(init,
    space= 8 + Voter::INIT_SPACE,
    payer = payer,
    seeds=[v_name.as_bytes(),payer.key().as_ref()],
    bump)]
    pub voter:Account<'info,Voter>,    // Voter account

    pub system_program:Program<'info,System>
}

/// Validation structure for CastVote instruction
#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,          // Transaction signer

    #[account(mut)]
    pub voter:Account<'info,Voter>,    // Voter account

    #[account(mut)]
    pub candidate:Account<'info,Candidate>    // Candidate account
}

/// Validation structure for RegisterElectionCommision instruction
#[derive(Accounts)]
pub struct RegisterElectionCommision<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,    // Transaction signer

    #[account(init,
    space= 8 + ElectionCommision::INIT_SPACE,
    payer = payer,
    seeds=[b"ec"],
    bump)]
    pub election_commision:Account<'info,ElectionCommision>,    // Commission account

    pub system_program:Program<'info,System>
}

/// Validation structure for AnnounceWinner instruction
#[derive(Accounts)]
pub struct AnnounceWinner<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,    // Transaction signer

    #[account(mut)]
    pub election_commision:Account<'info,ElectionCommision>,    // Commission account

    #[account(mut)]
    pub candidate:Account<'info,Candidate>    // Candidate account
}


