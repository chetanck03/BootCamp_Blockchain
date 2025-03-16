use anchor_lang::prelude::*;  // Import the Anchor framework (helps in writing Solana programs)
use anchor_spl::{  
    token_interface::{self, Mint, MintTo, TokenAccount, TokenInterface, TransferChecked}, // Import token-related functions
};

// Declare program ID (unique identifier for this smart contract)
declare_id!("D6qAB5NKLWm8MYSFTB3hUGLAgrsrU9zExezbC1LAL3QK");

#[program] // This section contains the core logic of the smart contract
pub mod token_example {
    use super::*;

    // Function to create a new mint (a token type)
    pub fn create_mint(ctx: Context<CreateMint>) -> Result<()> {
        msg!("Created Mint Account: {:?}", ctx.accounts.mint.key()); // Print mint account info
        Ok(())
    }

    // Function to create a token account for holding tokens
    pub fn create_token_account(ctx: Context<CreateTokenAccount>) -> Result<()> {
        msg!("Created Token Account: {:?}", ctx.accounts.token_account.key());
        Ok(())
    }

    // Function to mint (create) new tokens
    pub fn mint_tokens(ctx: Context<MintTokens>, amount: u64) -> Result<()> {
        let cpi_accounts = MintTo {
            mint: ctx.accounts.mint.to_account_info(), // The token mint (where tokens are created)
            to: ctx.accounts.token_account.to_account_info(), // The receiver's token account
            authority: ctx.accounts.signer.to_account_info(), // The signer who has permission
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        
        token_interface::mint_to(cpi_context, amount)?; // Call mint function to create tokens
        Ok(())
    }

    // Function to transfer tokens from one account to another
    pub fn transfer_tokens(ctx: Context<TransferTokens>, amount: u64) -> Result<()> {
        let decimals = ctx.accounts.mint.decimals; // Get token decimals
        let cpi_accounts = TransferChecked {
            mint: ctx.accounts.mint.to_account_info(),
            from: ctx.accounts.sender_token_account.to_account_info(), // Sender's token account
            to: ctx.accounts.recipient_token_account.to_account_info(), // Recipient's token account
            authority: ctx.accounts.signer.to_account_info(), // Signer who authorizes the transfer
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_context = CpiContext::new(cpi_program, cpi_accounts);
        
        token_interface::transfer_checked(cpi_context, amount, decimals)?; // Call transfer function
        Ok(())
    }
}

// Define the accounts required for minting a new token
#[derive(Accounts)]
pub struct CreateMint<'info> {
    #[account(mut)]
    pub signer: Signer<'info>, // The user who creates the mint

    #[account(
       init, // Create a new account
       payer = signer, // Signer pays for account creation
       mint::decimals = 6, // Token has 6 decimal places
       mint::authority = signer.key(), // Signer has authority over the mint
       mint::freeze_authority = mint.key(), // Freezing is allowed by the mint
       seeds = [b"mint"], // Seed for account derivation
       bump
   )]
    pub mint: InterfaceAccount<'info, Mint>, // The mint (token type)
    
    pub token_program: Interface<'info, TokenInterface>, // Token program reference
    pub system_program: Program<'info, System>, // System program reference
}

// Define the accounts required for creating a token account
#[derive(Accounts)]
pub struct CreateTokenAccount<'info> {
    #[account(mut)]
    pub signer: Signer<'info>, // User creating the account

    #[account(
       init_if_needed, // Create account if it doesn't exist
       payer = signer, // Signer pays for creation
       token::mint = mint, // Token type (mint) associated with this account
       token::authority = signer, // Signer controls this account
       token::token_program = token_program, // Reference to token program
       seeds = [b"token",signer.key().as_ref()], // Unique seed for derivation
       bump
   )]
    pub token_account: InterfaceAccount<'info, TokenAccount>, // The token account
    pub mint: InterfaceAccount<'info, Mint>, // The mint reference
    pub token_program: Interface<'info, TokenInterface>, // Token program reference
    pub system_program: Program<'info, System>, // System program reference
}

// Define the accounts required for minting tokens
#[derive(Accounts)]
pub struct MintTokens<'info> {
    #[account(mut)]
    pub signer: Signer<'info>, // User minting the tokens
    #[account(mut)]
    pub mint: InterfaceAccount<'info, Mint>, // Token type
    #[account(mut)]
    pub token_account: InterfaceAccount<'info, TokenAccount>, // Account receiving the tokens
    pub token_program: Interface<'info, TokenInterface>, // Token program reference
}

// Define the accounts required for transferring tokens
#[derive(Accounts)]
pub struct TransferTokens<'info> {
    #[account(mut)]
    pub signer: Signer<'info>, // User transferring tokens
    #[account(mut)]
    pub mint: InterfaceAccount<'info, Mint>, // Token type
    #[account(mut)]
    pub sender_token_account: InterfaceAccount<'info, TokenAccount>, // Sender's account
    #[account(mut)]
    pub recipient_token_account: InterfaceAccount<'info, TokenAccount>, // Receiver's account
    pub token_program: Interface<'info, TokenInterface>, // Token program reference
}
