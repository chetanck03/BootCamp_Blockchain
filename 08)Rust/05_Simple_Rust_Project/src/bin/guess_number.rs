// Run file instructions:
// To create the required directory structure and run the program:
// - mkdir src/bin     
// - cargo run --bin guess_number 

// Guessing Number Game

use rand::Rng; // Importing the `rand` crate for generating random numbers
use std::cmp::Ordering; // Importing `Ordering` enum to compare values
use std::io; // Importing `io` module for handling user input

fn main() {
    println!("Welcome to the Guess the Number game!");
    println!("I have selected a number between 1 and 10. Can you guess it?");

    // Generate a random number between 1 and 10 (inclusive)
    let secret_number = rand::thread_rng().gen_range(1..=10);

    loop {
        println!("Please input your guess:");

        // Create a mutable string to hold the user's guess
        let mut guess = String::new();
        
        // Read the user's input and handle potential input errors
        io::stdin()
            .read_line(&mut guess) 
            .expect("Failed to read line"); 

        // Convert the input string to a number (u32) and handle invalid input
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num, 
            Err(_) => {
                println!("Please enter a valid number."); 
                continue; 
            }
        };

        // Compare the user's guess to the secret number
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"), 
            Ordering::Greater => println!("Too big!"), 
            Ordering::Equal => {
                // Guess is correct
                println!("You guessed it! The number was {}.", secret_number);
                break; // Exit the loop and end the game
            }

        }
    }
}

