// Importing the `io` module to handle user input
use std::io;

fn add(a: u32, b: u32) -> u32 {
    a + b
}
fn sub(a: u32, b: u32) -> u32 {
    if b > a {
        return b - a;
    }
    a - b
}
// Returns `Option<f64>` to handle cases where the denominator is zero
fn div(a: u32, b: u32) -> Option<f64> {
    if b == 0 {
        return None; // Return None if division by zero
    }
    Some((a as f64) / (b as f64)) // Perform division and return the result wrapped in Some
}

// Function to multiply two numbers
fn mul(a: u32, b: u32) -> u32 {
    a * b
}

fn square_root(a: u32) -> f64 {
    (a as f64).sqrt()
}

// Displays a prompt, reads input, and ensures it's a valid unsigned integer (u32)
fn get_number(prompt: &str) -> u32 {
    loop {
        let mut input = String::new(); // String to hold user input
        println!("{prompt}"); // Display the prompt message
        io::stdin().read_line(&mut input).expect("Failed to read input"); // Read input
        match input.trim().parse::<u32>() {
            Ok(num) => return num, // Return valid number
            Err(_) => println!("Invalid input. Please try again."), // Ask again for input if invalid
        }
    }
}
fn main() {
    // Prompt the user to enter two numbers using the `get_number` function
    let num_one = get_number("Enter your First Number: ");
    let num_second = get_number("Enter your Second Number: ");

     // let mut a = String::new();
    // println!("Enter your First Number : ");
    // io::stdin().read_line(&mut a).expect("Not valid input");
    
    // let num_one:u32 = a.trim().parse().expect("Not a valid Number");

    // let mut b = String::new();
    // println!("Enter your Second Number : ");
    // io::stdin().read_line(&mut b).expect("Not valid input");
    
    // let num_second:u32 = b.trim().parse().expect("Not a valid Number");

    println!("Addition is: {}", add(num_one, num_second));
    println!("Subtraction is: {}", sub(num_one, num_second));
    println!("Multiplication is: {}", mul(num_one, num_second));
    
    // Perform and handle division, checking for division by zero
    match div(num_one, num_second) {
        Some(result) => println!("Division is: {result}"),
        None => println!("Division Error: Denominator cannot be zero"),
    }

    println!("Square Root of First Number is: {}", square_root(num_one));
    println!("Square Root of Second Number is: {}", square_root(num_second));
}
