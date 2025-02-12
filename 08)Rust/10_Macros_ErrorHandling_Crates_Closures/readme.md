# Rust Basics: Macros, Error Handling, Crates & Closures

## Overview
This project provides a simple introduction to four key Rust concepts:

### 1. Macros
Macros in Rust allow writing code that writes other code, making it powerful for reducing redundancy.
- Example: `macro_rules!` for defining custom macros.

### 2. Error Handling
Rust uses `Result<T, E>` for handling errors gracefully instead of exceptions.
- Example: `Ok(value)` for success, `Err(error)` for failure.

### 3. Closures
Closures are anonymous functions that can capture variables from their scope.
- Example: `let add = |x, y| x + y;`

### 4. Crates
Crates are external libraries or packages that can be included via `Cargo.toml`.
- Example: Adding `regex = "1.5"` to dependencies.

## How to Run
1. Install Rust and Cargo if not already installed: [Rust Installation Guide](https://www.rust-lang.org/tools/install)
2. Clone or create a new Rust project.
3. Copy the provided Rust code into `main.rs`.
4. Run the project with:
   ```sh
   cargo run
   ```

## Dependencies
Ensure to add any required crates in `Cargo.toml` if using external libraries.

## License
This project is open-source and available under the MIT License.
