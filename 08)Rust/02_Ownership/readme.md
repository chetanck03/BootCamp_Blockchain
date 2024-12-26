# Understanding Ownership in Rust

Ownership is a fundamental concept in Rust that ensures memory safety without requiring a garbage collector. Below is a simple explanation and examples to help you grasp this concept.

## Key Ownership Rules
1. Each value in Rust has a variable that is its owner.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value is dropped (memory is freed).

## Example Code
```rust
fn main() {
    // Example of ownership with stack data (fixed size)
    let a = 5; // `a` owns the value 5
    let b = a; // Value of `a` is copied to `b` (ownership is not affected for stack data)
    println!("a: {a}, b: {b}");

    // Example of ownership with heap data (dynamic size)
    let s1 = String::from("hello"); // `s1` owns the String "hello"
    let s2 = s1; // Ownership of the String is moved to `s2`

    // println!("s1: {s1}"); // This will cause a compile-time error because `s1` no longer owns the value
    println!("s2: {s2}");

    // Cloning heap data to retain ownership
    let s3 = String::from("world");
    let s4 = s3.clone(); // Creates a new copy of the String, so both `s3` and `s4` own separate values
    println!("s3: {s3}, s4: {s4}");
}
```

## Ownership with Scope
```rust
fn main() {
    {
        let x = 10; // `x` is valid within this scope
        println!("x: {x}");
    } // `x` goes out of scope here, and its memory is freed

    // println!("x: {x}"); // This will cause a compile-time error because `x` is out of scope
}
```

## Common Ownership Concepts
### Stack Data
- Data with a fixed size (e.g., integers, floats) is stored on the stack.
- Copies of stack data do not affect ownership.

### Heap Data
- Data with a dynamic size (e.g., Strings, Vectors) is stored on the heap.
- Moving heap data transfers ownership.
- Cloning heap data creates a new, independent copy.

### Borrowing
- Instead of transferring ownership, you can borrow a value using references (`&`).
```rust
fn main() {
    let s = String::from("borrow me");
    print_string(&s); // Borrowing `s`
    println!("Original String: {s}"); // Ownership is retained by `s`
}

fn print_string(s: &String) {
    println!("Borrowed String: {s}");
}
```

## Summary
- Ownership in Rust ensures memory safety by enforcing strict rules about how values are used and transferred.
- Understanding ownership helps you write efficient and safe programs without relying on a garbage collector.

For more information, check out the [Rust Ownership Documentation](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html).
