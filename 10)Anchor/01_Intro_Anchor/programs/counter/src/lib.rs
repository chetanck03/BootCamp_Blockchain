// Importing necessary modules from the Anchor framework
use anchor_lang::prelude::*;

// Declaring the program ID (replace with your actual program ID)
declare_id!("2vey9vfUN6x8frPVyTxvP65v89dBF3zwYtDiGVqcZozm");

#[program]
pub mod counter {
    use super::*;

    // Function to initialize the counter
    pub fn initialize_counter(ctx: Context<InitializeCounter>) -> Result<()> {
        ctx.accounts.counter.count = 0; // Setting the initial count to zero
        Ok(())
    }

    // Function to increment the counter value
    pub fn increment_counter(ctx: Context<IncrementCounter>) -> Result<()> {
        ctx.accounts.counter.count += 1; // Increasing the counter by 1
        Ok(())
    }

    // Function to decrement the counter value
    pub fn decrement_counter(ctx: Context<DecrementCounter>) -> Result<()> {
        ctx.accounts.counter.count -= 1; // Decreasing the counter by 1
        Ok(())
    }
}

// Struct representing the counter account
#[account]
#[derive(InitSpace)]
pub struct Counter {
    pub count: i64, // Counter variable to store the count
}

// Struct for initializing the counter account
#[derive(Accounts)]
pub struct InitializeCounter<'info> {
    #[account(mut)]
    pub payer: Signer<'info>, // The payer who initializes the counter

    // Initializing the counter account with the necessary space allocation
    #[account(init, payer = payer, space = 8 + Counter::INIT_SPACE)]
    pub counter: Account<'info, Counter>,

    // System program required for account creation
    pub system_program: Program<'info, System>,
}

// Struct for handling counter increments
#[derive(Accounts)]
pub struct IncrementCounter<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>, // The counter account (mutable)
}

// Struct for handling counter decrements
#[derive(Accounts)]
pub struct DecrementCounter<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>, // The counter account (mutable)
}
