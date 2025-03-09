use anchor_lang::prelude::*;

declare_id!("7jb2gtjANXop9FnHaQ2Hm5JqzvyhaYRuoqW9ebBoSCeF");

#[program]
pub mod todolist {
    use super::*;

// create todo

// ctx = context

    pub fn create_todo(ctx: Context<CreateTodo>,name:String,priority:u8) -> Result<()> {
        // ctx.accounts.list.todo.name = name;
        // ctx.accounts.list.todo.priority = priority;

        let todo = &mut ctx.accounts.list;
        todo.owner = ctx.accounts.owner.key();
        todo.name = name;
        todo.priority = priority;
        Ok(())
    }
    pub fn update_name(ctx: Context<UpdateName>,name:String) -> Result<()> {

        let todo = &mut ctx.accounts.list;
        todo.name = name;
        Ok(())
    }
    pub fn update_priority(ctx: Context<UpdatePriority>,priority:u8) -> Result<()> {
        
        let todo = &mut ctx.accounts.list;
        todo.priority = priority;
        Ok(())
    }
}

// create todo account
#[account]
#[derive(InitSpace)]
pub struct Todo {
    pub owner: Pubkey,
    #[max_len(32)]
    pub name: String,
    pub priority: u8,
}
    
// Accounts
#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateTodo<'info> {
    // account created by the user to pay for the program
    #[account(mut)]
    pub owner: Signer<'info>,

    // account created by the program
    #[account(
        init,
        space = 8 + 32 + 32 + 1, // 8 discriminator + 32 owner + 32 name + 1 priority
        payer = owner,
        seeds = [name.as_bytes(), owner.key().as_ref()],
        bump
    )]
    pub list: Account<'info, Todo>,

    // system program
    #[account(address = anchor_lang::system_program::ID)]
    pub system_program: Program<'info, System>,
}

// Context structure for updating a todo's name
#[derive(Accounts)]
#[instruction(name: String)]
pub struct UpdateName<'info> {
    // The user who owns the todo
    #[account(mut)]
    pub owner: Signer<'info>,

    // The todo account to update
    #[account(
        mut,
        seeds = [list.name.as_bytes(), owner.key().as_ref()],
        bump,
        constraint = list.owner == owner.key() // Verify the owner
    )]
    pub list: Account<'info, Todo>,
}

// Context structure for updating a todo's priority
#[derive(Accounts)]
pub struct UpdatePriority<'info> {
    // The user who owns the todo
    #[account(mut)]
    pub owner: Signer<'info>,

    // The todo account to update
    #[account(
        mut,
        seeds = [list.name.as_bytes(), owner.key().as_ref()],
        bump,
        constraint = list.owner == owner.key() // Verify the owner
    )]
    pub list: Account<'info, Todo>,
}
