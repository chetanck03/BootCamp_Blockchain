# 📌 Rust Lifetimes Example: Preventing Dangling References

## Overview
This project demonstrates the concept of **lifetimes** in Rust, which helps prevent **dangling references**. The example includes a function `longest` that takes two string slices and returns the longer one while ensuring memory safety using lifetime annotations.

---

## 🔹 Code Explanation

### **Function: `longest`**
```rust
fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() {
        s1
    } else {
        s2
    }
}
```
🔹 **Lifetime Annotation (`'a`)**:
- Ensures that the returned reference is valid as long as the shortest-lived input reference.
- Prevents returning references to invalid memory locations.

### **Main Function**
```rust
fn main() {
    let str1 = String::from("Hello");
    let str2 = String::from("Rust");

    let result = longest(&str1, &str2);
    println!("The longer string is: {}", result);
}
```
🔹 **Steps**:
1. Define two strings: `str1 = "Hello"`, `str2 = "Rust"`.
2. Call `longest(&str1, &str2)`.
3. Print the longest string.

🔹 **Expected Output**:
```
The longer string is: Hello
```

---

## ❌ Avoiding Dangling References
If we try to return a reference to a variable that **goes out of scope**, Rust will prevent it at compile time.

```rust
fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    let s3 = String::from("Temporary");
    &s3  // ❌ ERROR: `s3` will be dropped when function ends!
}
```
Rust's **borrow checker** prevents this error by enforcing lifetimes.

---

## ✅ Key Takeaways
- **Lifetimes ensure references remain valid.**
- **Prevents use of invalid references.**
- **Rust enforces lifetimes at compile-time for safety.**

---

## 🛠️ Run the Code
```sh
cargo run
```
Ensure Rust is installed before running the code.

🚀 Happy Coding with Rust Lifetimes!
