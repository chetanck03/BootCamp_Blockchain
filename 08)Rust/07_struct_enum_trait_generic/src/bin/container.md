# Rust Generics with Structs and Methods

## Concepts Used

### 1. **Generic Struct**
   - `struct Container<T> { value: T }`  
   - Defines a struct that can store any type (`T`).

### 2. **Generic Implementation with Trait Bound**
   - `impl<T: Clone> Container<T>`  
   - Ensures `T` implements `Clone` for value retrieval.

### 3. **Associated Function (Constructor)**
   - `fn new(new_values: T) -> Self`  
   - Creates a new `Container` instance.

### 4. **Getter and Setter Methods**
   - `fn get(&self) -> T { self.value.clone() }` → Returns a copy of `value`.  
   - `fn set(&mut self, new_value: T) { self.value = new_value; }` → Updates `value`.

### 5. **Usage in `main()`**
   - Creates `Container` instances for `i32`, `bool`, and `String`.
   - Uses `.get()` to retrieve values and `.set()` to update values.

## **Output**
```
Value is : 5
Value is : 10
Value is : true
Value is : false
Value is : Chetan
Value is : Gautam
```