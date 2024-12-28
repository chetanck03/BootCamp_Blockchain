# Understanding Key Rust Concepts: Modules, Dereferencing, Shadowing, and Match Statements

This README explains key Rust concepts using an example code snippet. Each section provides a brief overview and practical usage.

---

## 1. **Modules**
Modules allow code organization into separate files or sections. Functions like `add` and `sub` are defined in a separate module (`maths`) and imported into the main program.

```rust
mod math_file; // Import the module from `math_file.rs`
use math_file::maths::*; // Bring all functions from `maths` into scope.

let result = add(3, 2); // Call the add function
println!("Result of addition: {result}");

let res = sub(3, 2); // Call the sub function
println!("Result of subtraction: {res}");
```

---

## 2. **Dereferencing**
Dereferencing allows accessing or modifying the value a reference points to.

```rust
let mut x = 5;           // Define a mutable variable
let mut y = &mut x;      // Create a mutable reference
*y += 1;                 // Increment value via dereference (x becomes 6)
let z = &mut y;          // Create another mutable reference
**z = 120;               // Double dereference to modify x directly
println!("x is: {x}");  // Output: x is: 120
```

---

## 3. **Shadowing**
Shadowing allows re-declaring a variable name in the same scope with a new value or type.

```rust
let s1 = String::from("hello"); // Initial string value
let s1 = s1.len();              // Shadowed with length (usize type)
println!("String length is: {s1}"); // Output: String length is: 5
```

---

## 4. **Match Statements**
`match` provides a concise way to handle different patterns, similar to a switch-case.

```rust
let x = 5;
match x {
    1 => println!("1"),
    2 => println!("2"),
    _ => println!("Default value"), // Fallback for unmatched values
}
```

---

## Example Output
Below is the expected output when running the example code:

```
x is: 120
String length is: 5
Result of addition: 5
Result of subtraction: 1
Default value
```

---

## Key Takeaways
1. **Modules** help organize code.
2. **Dereferencing** allows modifying values through references.
3. **Shadowing** enables reusing variable names for transformations.
4. **Match Statements** simplify pattern matching and decision-making.

For further exploration, refer to the [Rust documentation](https://doc.rust-lang.org/).
