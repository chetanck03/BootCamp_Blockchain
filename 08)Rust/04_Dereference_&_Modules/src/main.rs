// mod maths {
//     pub fn add(a:u8,b:u8)->u8{
//         a+b
//     }

//     pub fn sub(a:u8,b:u8)->u8{
//         a-b
//     }
// }

// Modules Import

mod math_file; // Import the module from `math_file.rs`
use math_file::maths::*; // Bring all functions from the `maths` module into scope.

// use maths::*; // Uncomment this line if not using `math_file` to import `maths`.

// use maths::add; // Optionally, bring specific functions like `add` into scope.
// use maths::sub; // Optionally, bring specific functions like `sub` into scope.

fn main() {
    // Dereferencing Example:
    let mut x = 5; 
    let mut y = &mut x; // Create a mutable reference `y` to `x`.
    *y += 1; //  Now `x` becomes 6.
    let z = &mut y; 
    **z = 120; // Double dereference `z` to modify the value of `x` directly. Now `x` becomes 120.
    println!("x Is : {x}"); //  120.

    // Shadowing Example:
    let s1 = String::from("hello"); // Create a `String` object `s1`.
    let s1 = s1.len(); // Shadow the variable `s1` with its length (an `usize` value).
    println!("String Length is : {s1}"); // Output the length of the string, which is 5.

    // Using Modules:
    let result = add(3, 2); 
    println!("Result add is : {result}"); 

    let res = sub(3, 2);
    println!("Result sub is : {res}"); 

    // Match Statement Example:
    let x = 5; 

    // Match on the value of `x` and execute corresponding block.
    match x {
        1 => println!("1"), 
        2 => println!("2"), 
        _ => println!("Default value"), 
    }
}
