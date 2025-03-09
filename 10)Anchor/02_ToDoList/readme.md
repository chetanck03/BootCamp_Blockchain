## setup :

- anchor init todolist
- write code in program folder & src folder in lib.rs
- anchor build
- deploy the code on solana playground

## Overview

This project is a Solana program for managing a simple todo list. It allows users to create, update, and manage todo items on the Solana blockchain. The program is written using the Anchor framework, which simplifies Solana program development.

### Key Features

- **Create Todo**: Users can create a new todo item with a name and priority. Each todo is associated with the user's public key, ensuring ownership.
- **Update Name**: Users can update the name of an existing todo item. Ownership is verified before allowing updates.
- **Update Priority**: Users can update the priority of an existing todo item. Ownership is verified before allowing updates.

### Program Structure

- **Todo Account**: Stores the details of each todo item, including the owner's public key, name, and priority.
- **CreateTodo Context**: Used for creating new todo items. Ensures the account is initialized with the correct space and ownership.
- **UpdateName Context**: Used for updating the name of a todo item. Verifies ownership before allowing changes.
- **UpdatePriority Context**: Used for updating the priority of a todo item. Verifies ownership before allowing changes.

### Instructions

1. **Create Todo**: Call the `create_todo` function with the desired name and priority.
2. **Update Name**: Call the `update_name` function with the new name.
3. **Update Priority**: Call the `update_priority` function with the new priority.

This program demonstrates basic account management and ownership verification on the Solana blockchain using the Anchor framework.