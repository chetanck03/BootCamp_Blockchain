

## Setup Instructions

### Step 1: Create a New Rust Project
To begin, create a new folder and initialize your Rust project using Cargo:
```bash
cargo new Intro_Rust
```
This will generate a new Rust project with the necessary files and folder structure.

### Step 2: Navigate to the Project Directory
Move into the newly created project directory:
```bash
cd Intro_Rust
```

### Step 3: Run the Project
To execute the project:
```bash
cargo run
```
This command compiles the project and runs the resulting binary.

### Step 4: Build the Project
To compile the current package without running it:
```bash
cargo build
```
This will create an optimized binary in the `target/debug` folder.

### Step 5: Run Production Code
For optimized performance, run the project in release mode:
```bash
cargo run --release
```
This will create and execute an optimized binary from the `target/release` folder.

---
# Intro to Rust Code

This Rust code demonstrates fundamental concepts, including immutability, mutability, string handling, tuples, and functions.

## Explanation

1. **Immutability and Mutability**:  
   - Variables are immutable by default. Use the `mut` keyword to make them mutable.

2. **String Handling**:  
   - `&str`: String slices for static, immutable strings.  
   - `String`: A growable, heap-allocated string.

3. **Tuples**:  
   - Tuples can hold multiple values of different types and allow indexing for individual elements.

4. **Functions**:  
   - Functions demonstrate basic operations like addition, subtraction, and multiplication.


