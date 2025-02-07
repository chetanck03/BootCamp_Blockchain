// Write a function that removes all whitespace from a string & reverse the string & check palindrome input

use std::io;

fn main() {
    println!("Please Enter the String value: ");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed Input");

    // Trim the newline character from input
    let input = input.trim();

    // Remove whitespace from input
    let no_whitespace = re_whitespace(input);
    println!("Output 1 (Without Whitespace): {}", no_whitespace);

    // Reverse the string
    let reversed = reverse(&no_whitespace);
    println!("Output 2 (Reversed String): {}", reversed);

    // Check if the original cleaned string is a palindrome
    if is_palindrome(&no_whitespace) {
        println!("The input string is a palindrome.");
    } else {
        println!("The input string is not a palindrome.");
    }
}

// Function to remove whitespace from the string
fn re_whitespace(input: &str) -> String {
    input.split_whitespace().collect::<String>()
}

// Function to reverse the string
fn reverse(input: &str) -> String {
    input.chars().rev().collect::<String>()
}

// Function to check if the string is a palindrome
fn is_palindrome(input: &str) -> bool {
    input.eq_ignore_ascii_case(&reverse(input))
}
