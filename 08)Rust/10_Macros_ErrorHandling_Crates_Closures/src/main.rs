// Macros (like functions but more powerful)
macro_rules! say_hello {
    () => {
        println!("Hello from a macro!");
    };
}

fn main() {
    // Using a macro
    say_hello!();

    // Error Handling
    let result = divide(10, 0);
    match result {
        Ok(value) => println!("Result: {}", value),
        Err(e) => println!("Error: {}", e),
    }

    // Closures (anonymous functions)
    let add = |x, y| x + y;
    println!("Closure sum: {}", add(3, 4));
}

fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

// Crates: Add dependencies in Cargo.toml
// Example:
// [dependencies]
// regex = "1.5"

// Then use it in your project:
// use regex::Regex;
