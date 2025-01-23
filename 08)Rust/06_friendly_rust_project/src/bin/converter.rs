// Brings io module and Write trait into scope, used for input/output operations and flushing stdout
use std::io::{self, Write};

fn main() {
    loop {
        // Prompt the user to input a decimal number
        let mut input = String::new();
        print!("Please enter the decimal number: ");
        io::stdout().flush().unwrap(); // Ensure the prompt is printed immediately

        // Read input from the user
        io::stdin()
            .read_line(&mut input)
            .expect("Failed to read input");

        // Attempt to parse the input into an unsigned 32-bit integer (u32)
        let decimal_val: u32 = match input.trim().parse() {
            Ok(decimal_val) => decimal_val,
            Err(_) => {
                // Handle invalid input
                println!("Invalid number. Please try again.");
                continue;
            }
        };

        binary_converter(decimal_val);
        hex_converter(decimal_val);
        println!("<-----Number converted into Binary & Hexadecimal Format Successfully----->");
        break;
    }
}

// Function to convert a decimal number to binary and display it
fn binary_converter(decimal_val: u32) {
    let binary = format!("{:b}", decimal_val);
    println!("Binary representation: {binary}");
}

// Function to convert a decimal number to hexadecimal and display it
fn hex_converter(decimal_val: u32) {
    let hex = format!("{:X}", decimal_val);
    println!("Hexadecimal representation: {hex}");
}
