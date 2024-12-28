# Rust Projects

## Project 1: Calculator

### Description
A simple Rust program that performs basic arithmetic operations such as addition, subtraction, multiplication, division, and calculates the square root of numbers.

### Features
- Add, subtract, multiply, and divide two numbers.
- Calculate the square root of a number.
- Handles invalid inputs and division by zero.

### How to Run
1. Create the project directory (if not already created):
   ```bash
   mkdir src/bin
   ```
2. Place the `calculator.rs` file in the `src/bin` folder.
3. Run the program using:
   ```bash
   cargo run --bin calculator
   ```

### Usage
- Enter two numbers when prompted.
- The program will display the results of all operations.
- For division, it will handle cases where the denominator is zero.

---

## Project 2: Guess the Number Game

### Description
A fun Rust-based game where the user guesses a random number between 1 and 10.

### Features
- Randomly generates a number between 1 and 10.
- Provides feedback on whether the guess is too high, too low, or correct.
- Handles invalid input gracefully.

### How to Run
1. Create the project directory (if not already created):
   ```bash
   mkdir src/bin
   ```
2. Place the `guess_number.rs` file in the `src/bin` folder.
3. Run the program using:
   ```bash
   cargo run --bin guess_number
   ```

### Usage
- Input guesses until the correct number is found.
- The program will provide feedback for each guess.
- Once guessed correctly, the program ends.

---

### Common Setup
- Ensure you have Rust and Cargo installed on your system.
- Use the following command to add required dependencies (if not already installed):
   ```bash
   cargo add rand
   
