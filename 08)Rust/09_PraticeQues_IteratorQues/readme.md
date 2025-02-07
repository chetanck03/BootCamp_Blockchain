# Rust String Processing Program

## Overview
This Rust program performs three main operations on a user-input string:
1. Removes all whitespace from the string.
2. Reverses the processed string.
3. Checks whether the processed string is a palindrome.

## Features
- Reads user input and processes the string by removing whitespace.
- Reverses the modified string and displays the result.
- Determines if the modified string is a palindrome (case insensitive).
- Uses efficient Rust string manipulation functions.

## Functions
### `re_whitespace(input: &str) -> String`
- Removes all whitespace characters from the input string.
- Utilizes `split_whitespace()` and `collect::<String>()`.

### `reverse(input: &str) -> String`
- Reverses the given string using `chars().rev().collect::<String>()`.

### `is_palindrome(input: &str) -> bool`
- Compares the cleaned string with its reversed version.
- Uses `eq_ignore_ascii_case()` for case-insensitive comparison.

## Usage
1. Run the program.
2. Enter a string when prompted.
3. The program will:
   - Remove whitespace and display the modified string.
   - Reverse the string and display the result.
   - Check if the string is a palindrome and display the result.

## Example Execution
```
Please Enter the String value:
race car
Output 1 (Without Whitespace): racecar
Output 2 (Reversed String): racecar
The input string is a palindrome.
