# Rust Decimal to Binary and Hexadecimal Converter

## Overview
This program is a simple Rust application that converts a decimal number provided by the user into its binary and hexadecimal representations. It validates user input and continuously prompts for new input until the user exits the program.

## Features
- Validates user input to ensure it is a positive integer.
- Handles invalid input gracefully by re-prompting the user.
- Displays the binary and hexadecimal equivalents of the input decimal number.
- Ensures output is clean and formatted for readability.

## How It Works
1. The program continuously loops to accept user input.
2. User input is read and parsed into an unsigned 32-bit integer (`u32`).
3. If the input is invalid (non-numeric), the program informs the user and prompts for input again.
4. Once valid input is received:
   - The binary representation of the number is computed using `format!("{:b}", decimal_val)`.
   - The hexadecimal representation of the number is computed using `format!("{:X}", decimal_val)`.
5. The results are displayed to the user, along with a success message.

## Code Structure
- **Main Function**: Handles user input, validation, and calls the conversion functions.
- **`binary_converter` Function**: Converts the decimal number into its binary representation and displays it.
- **`hex_converter` Function**: Converts the decimal number into its hexadecimal representation and displays it.

## Prerequisites
- Install the Rust compiler and toolchain: [Rust Installation](https://www.rust-lang.org/tools/install).

## Usage
1. Compile the program using the following command:
   ```sh
   rustc decimal_converter.rs
   ```
2. Run the compiled program:
   ```sh
   ./decimal_converter
   ```
3. Follow the on-screen instructions to input a decimal number.

## Example Output
```
Please enter the decimal number: 42
Binary representation: 101010
Hexadecimal representation: 2A
<-----Number converted into Binary & Hexadecimal Format Successfully----->
```

## Error Handling
- If the user enters invalid input (e.g., text or special characters), the program will display:
  ```
  Invalid number. Please try again.
  ```
  and prompt the user again.

---
