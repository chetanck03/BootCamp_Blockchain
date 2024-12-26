const GLOBAL_VARIABLE: u8 = 100;

fn main() {
    let x = 5;
    // Start of a nested scope
    {
        let y: i32 = 3;

        println!("Global variable is: {GLOBAL_VARIABLE}");
        println!("x is: {x}");
        println!("y is: {y}");
    } // y goes out of scope here, and its memory is released

    println!("Global variable is: {GLOBAL_VARIABLE}");
    println!("x is: {x}");

    // Demonstrating ownership with fixed-size data stored on the stack
    let a: i32 = 5; 
    let b: i32 = a; // Copy the value of a into b (ownership not affected for stack data)

    println!("a is: {a}");
    println!("b is: {b}");

    // Demonstrating ownership with dynamic data stored on the heap
    let c: String = String::from("hello everyone!"); 
    let d: String = c.clone(); // Clone c into d (ownership preserved as a new copy is created)

    println!("c is: {c}");
    println!("d is: {d}");
}
