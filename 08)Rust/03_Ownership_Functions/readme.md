# Rust Ownership and References Example

This project demonstrates key concepts of Rust's ownership model, including cloning, borrowing, and mutable references. The program performs string manipulations while highlighting how ownership works in different scenarios.

## Code Breakdown

### `main` Function
1. **String Ownership**:
   - Strings `str` and `st` are created and own their values.
   - `str.clone()` is used to create a copy of `str` for passing to the `print` function.

2. **Functions with Ownership and References**:
   - `cal_length` takes ownership of a cloned string and returns its length.
   - `cal_len` borrows a string using a reference and calculates its length without transferring ownership.

3. **Mutable References**:
   - A mutable string `a` is created.
   - `append_string` modifies `a` by appending "World!" using a mutable reference.

### Functions
- **`print`**: Prints the string passed to it. Ownership of the string is transferred to this function.
- **`cal_length`**: Calculates the length of a string passed to it by transferring ownership.
- **`cal_len`**: Calculates the length of a string passed by reference (ownership is not transferred).
- **`append_string`**: Appends "World!" to a mutable string passed by mutable reference.

## Key Concepts
1. **Ownership**:
   - Values in Rust have a single owner.
   - Passing a value to a function transfers ownership unless it is passed by reference.

2. **Cloning**:
   - Use `.clone()` to create a copy of a value if you need to retain the original.

3. **Borrowing and References**:
   - Passing a reference (`&`) allows the function to read the value without taking ownership.

4. **Mutable References**:
   - Passing a mutable reference (`&mut`) allows the function to modify the value in place.

## Example Output
```text
HELLO!! in print function
HELLO!! in main function
length of HELLO!! string is : 7
length of HI!! string is : 3
The append string is : Hello World!
```

## How to Run
1. Ensure you have Rust installed. If not, install it from [Rust's official website](https://www.rust-lang.org/).
2. Save the code in a file named `main.rs`.
3. Run the program using:
   ```bash
   cargo run
   
