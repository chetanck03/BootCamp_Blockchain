use anchor_lang::prelude::*;

declare_id!("Fvuo8WTt91JmT88xrFq4xQHiR7nVCe1urrWFJHs1GcnK");

#[program]
pub mod vote_app {
    use super::*;

    // Instruction 1: Register a new candidate
    // Takes candidate name and party name as inputs
    pub fn register_candidate(ctx: Context<RegisterCandidate>,c_name:String,party_name:String) -> Result<()> {
        let candidate = &mut ctx.accounts.candidate;
        // Create new candidate with initial vote count of 0
        candidate.set_inner(Candidate{
           c_id:ctx.accounts.payer.key(),      // Unique ID (public key) of candidate
           party_name:party_name,              // Political party name
           c_name:c_name,                      // Candidate name
           votes:0                             // Initial vote count
        });
        Ok(())
    }

    // Instruction 2: Register a new voter
    // Takes voter name as input
    pub fn register_voter(ctx: Context<RegisterVoter>,v_name:String) -> Result<()> {
        let voter = &mut ctx.accounts.voter;
        // Create new voter with voting status as false (hasn't voted yet)
        voter.set_inner(Voter{
           v_id:ctx.accounts.payer.key(),      // Unique ID (public key) of voter
           v_name:v_name,                      // Voter name
           is_voted:false                      // Voting status (false = hasn't voted)
        });
        Ok(())
    }

    // Instruction 3: Cast a vote for a candidate
    pub fn cast_vote(ctx: Context<CastVote>) -> Result<()> {
        let voter = &mut ctx.accounts.voter;
        let candidate = &mut ctx.accounts.candidate;

        // Check if voter hasn't already voted
        require!(voter.is_voted==false,VotingError::AlreadyVoted);
        // Check if the voter is the rightful owner
        require!(voter.v_id==ctx.accounts.payer.key(),VotingError::NotTheOwner);

        // Increment candidate's vote count and mark voter as voted
        candidate.votes=candidate.votes+1;
        voter.is_voted=true;
        Ok(())
    }
}

// Custom error types for the program
#[error_code]
pub enum VotingError{
    #[msg("Already voted")]              // Error when voter tries to vote twice
    AlreadyVoted,

    #[msg("Not the owner")]             // Error when someone tries to vote with wrong account
    NotTheOwner,
}

// Data Structures (Accounts)

// Candidate Account Structure
#[account]
#[derive(InitSpace)]
pub struct Candidate{
    c_id:Pubkey,                        // Candidate's public key
    #[max_len(20)]                      // Maximum length of party name is 20 characters
    party_name:String,
    #[max_len(20)]                      // Maximum length of candidate name is 20 characters
    c_name:String,
    votes:u8                            // Vote count (u8 means maximum 255 votes)
}

// Voter Account Structure
#[account]
#[derive(InitSpace)]
pub struct Voter{
    v_id:Pubkey,                        // Voter's public key
    #[max_len(20)]                      // Maximum length of voter name is 20 characters
    v_name:String,
    is_voted:bool                       // Voting status (true = has voted)
}

// Context for RegisterCandidate instruction
#[derive(Accounts)]
#[instruction(c_name:String)]
pub struct RegisterCandidate<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,            // Account that pays for transaction

    // Initialize new candidate account with PDA (Program Derived Address)
    #[account(init,
    space= 8 + Candidate::INIT_SPACE,   // Space for account data
    payer = payer,                      // Who pays for account creation
    seeds=[c_name.as_bytes(),payer.key().as_ref()], // Seeds for generating PDA
    bump)]                              // Bump seed for PDA
    pub candidate:Account<'info,Candidate>,

    pub system_program:Program<'info,System> // Required for creating new accounts
}

// Context for RegisterVoter instruction
#[derive(Accounts)]
#[instruction(v_name:String)]
pub struct RegisterVoter<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,            // Account that pays for transaction

    // Initialize new voter account with PDA
    #[account(init,
    space= 8 + Voter::INIT_SPACE,       // Space for account data
    payer = payer,                      // Who pays for account creation
    seeds=[v_name.as_bytes(),payer.key().as_ref()], // Seeds for generating PDA
    bump)]                              // Bump seed for PDA
    pub voter:Account<'info,Voter>,

    pub system_program:Program<'info,System> // Required for creating new accounts
}

// Context for CastVote instruction
#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub payer:Signer<'info>,            // Account that pays for transaction

    #[account(mut)]
    pub voter:Account<'info,Voter>,     // Voter account to be modified

    #[account(mut)]
    pub candidate:Account<'info,Candidate>, // Candidate account to be modified
}
