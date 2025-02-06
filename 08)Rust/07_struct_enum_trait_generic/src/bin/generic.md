# Rust Generics with Traits

## Concepts Used

### 1. **Function Overloading Alternative Using Generics**
   - `fn print_value<T: std::fmt::Display>(value: T)`  
   - Uses **Generics (`T`)** to accept multiple data types.

### 2. **Trait Bound (`std::fmt::Display`)**
   - `T: std::fmt::Display` ensures `T` can be printed using `{}` in `println!`.

### 3. **Calling the Generic Function**
   - `print_value(num);` → Calls with an `i32`
   - `print_value(decimal);` → Calls with a `f64`
   - `print_value(status);` → Calls with a `bool`

## **Output**
```
Value is : 5
Value is : 5.1
Value is : true
```