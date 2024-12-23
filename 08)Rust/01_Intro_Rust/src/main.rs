fn main() {
    // Print a greeting message to the console
    println!("Hello, world!");

    // 1. In Rust, by default, all variables are immutable (cannot be changed once assigned).
    let num: u8 = 10; // `u8` specifies the variable is an unsigned 8-bit integer.
    println!("Number is : {}", num);

    // 2. To make a variable mutable (able to change its value), use the `mut` keyword.
    let mut num: u8 = 11; 
    num = 56; 
    println!("Number is : {}", num);

    // 3. String literals are represented as `&str` in Rust.
    let string: &str = "Ck Tech Hub"; // A string slice (`&str`) is a view into a string.
    println!("String is : {}", string);

    // Using `String`, which is a growable, heap-allocated string.
    let str1: String = String::from("Chetan Ck"); // Creating a `String` from a string literal.
    println!("str1 is : {}", str1);

    // 4. Tuples can store a collection of values of different types.
    let info: (&str, u16) = ("chetan", 1); // A tuple with a string slice and an unsigned 16-bit integer.

    // Debug printing the entire tuple.
    println!("{:?}", info);

    // Accessing tuple elements using index notation.
    println!(
        "Student_Name: {}, Student_Roll_Number: {}",
        info.0, // Access the first element of the tuple.
        info.1  // Access the second element of the tuple.
    );

    // 5. Functions in Rust
    add(3, 2); // Calling a function that performs addition and prints the result.

    // Calling functions that return values and printing the results.
    println!("Subtraction Sum is : {}", sub(3, 2));
    println!("Multiplication is : {}", mul(3, 2));
}

// Function to add two numbers and print the result.
fn add(a: u8, b: u8) {
    let c: u8 = a + b; // Perform addition and store the result in `c`.
    println!("The sum of two numbers is : {}", c);
}

// Function to subtract two numbers and return the result.
fn sub(a: u8, b: u8) -> u8 {
    return a - b; // Return the result of subtraction.
}

// Function to multiply two numbers and return the result.
fn mul(a: u8, b: u8) -> u8 {
    a * b // Return the result of multiplication (no explicit `return` keyword needed).
}
