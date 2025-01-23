# Rust Timer Countdown Program

## Overview
This program is a simple Rust application that prompts the user to input a timer duration in seconds. The program then starts a countdown from the specified time, displaying each second until the timer reaches zero. 

## Features
- Validates user input to ensure it is a positive integer.
- Handles invalid input gracefully by re-prompting the user.
- Implements a countdown using Rust's `std::time::Duration` and `std::thread::sleep`.

## How It Works
1. The program continuously loops until valid input is provided by the user.
2. User input is read and parsed into an unsigned 16-bit integer (`u16`).
3. If the input is invalid (non-numeric), the program informs the user and prompts for input again.
4. Once valid input is received:
   - The countdown starts, printing each second in reverse order.
   - The program waits for one second between prints using `std::thread::sleep`.
5. After the countdown ends, the program displays a completion message and exits.

## Code Structure
- **Main Function**: Handles user input, validation, and calls the timer function.
- **`start_timer` Function**: Manages the countdown logic and printing of seconds.

## Prerequisites
- Install the Rust compiler and toolchain: [Rust Installation](https://www.rust-lang.org/tools/install).

## Usage
1. Compile the program using the following command:
   ```sh
   rustc timer_program.rs
   ```
2. Run the compiled program:
   ```sh
   ./timer_program
   ```
3. Follow the on-screen instructions to input the timer duration.

## Example Output
```
Please enter the Timer Duration in seconds: 
5
Timer CountDown Start:
5
4
3
2
1
Timer CountDown Stop: 5 seconds completed.
```

## Error Handling
- If the user enters invalid input (e.g., text or special characters), the program will display:
  ```
  Invalid number. Please enter a valid number.
  ```
  and prompt the user again.

---
