# Rust: Understanding `struct`, `enum`, `impl`, and `self`

Rust is a systems programming language that provides powerful features like `struct`, `enum`, and `impl`. Below is a simple explanation with examples.

## 1. `struct` (Structure)
A `struct` in Rust is a way to group related data together.

### Example:
```rust
struct Person {
    name: String,
    age: u32,
}

fn main() {
    let person = Person {
        name: String::from("Alice"),
        age: 25,
    };
    
    println!("{} is {} years old", person.name, person.age);
}
```
### Output:
```
Alice is 25 years old
```

### Explanation:
- The `Person` struct has two fields: `name` and `age`.
- We create an instance of `Person` and access its fields.

## 2. `enum` (Enumeration)
An `enum` allows us to define a type that can have multiple possible values.

### Example:
```rust
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn main() {
    let light = TrafficLight::Green;
    match light {
        TrafficLight::Red => println!("Stop"),
        TrafficLight::Yellow => println!("Get Ready"),
        TrafficLight::Green => println!("Go"),
    }
}
```
### Output:
```
Go
```

### Explanation:
- The `TrafficLight` enum has three possible values: `Red`, `Yellow`, and `Green`.
- We use a `match` statement to check the current state of `light` and print a message accordingly.

### Types of Enums in Rust:
Rust supports different types of enums, including:
1. **Simple Enums** - Like `TrafficLight`, where each variant has no data.
2. **Enums with Data** - Variants can store additional data.
   ```rust
   enum Message {
       Text(String),
       Move { x: i32, y: i32 },
       Quit,
   }
   ```
3. **C-like Enums** - Enums with explicit integer values.
   ```rust
   enum Status {
       Success = 200,
       NotFound = 404,
   }
   ```
4. **Option Enum** - Built-in Rust enum for handling null values.
   ```rust
   let some_number: Option<i32> = Some(5);
   let absent_number: Option<i32> = None;
   ```
5. **Result Enum** - Used for error handling in Rust.
   ```rust
   fn divide(a: i32, b: i32) -> Result<i32, String> {
       if b == 0 {
           Err(String::from("Cannot divide by zero"))
       } else {
           Ok(a / b)
       }
   }

   fn main() {
       match divide(10, 2) {
           Ok(result) => println!("Result: {}", result),
           Err(e) => println!("Error: {}", e),
       }
   }
   ```
   **Output:**
   ```
   Result: 5
   ```

## 3. `impl` (Implementation Block)
The `impl` keyword is used to define methods for a `struct` or `enum`.

### Example:
```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 20 };
    println!("Area: {}", rect.area());
}
```
### Output:
```
Area: 200
```

### Explanation:
- The `impl Rectangle` block defines a method `area` for `Rectangle`.
- `self` refers to the instance of the `Rectangle` struct.

## 4. `self` Keyword
The `self` keyword is used inside methods to refer to the current instance of a struct or enum.

### Example:
```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn increment(&mut self) {
        self.count += 1;
    }
    
    fn get_count(&self) -> u32 {
        self.count
    }
}

fn main() {
    let mut counter = Counter { count: 0 };
    counter.increment();
    println!("Counter: {}", counter.get_count());
}
```
### Output:
```
Counter: 1
```

### Explanation:
- `self.count += 1;` modifies the instance.
- `self` is used as an immutable reference in `get_count()` and as a mutable reference in `increment()`.

---
This guide provides a simple introduction to `struct`, `enum`, `impl`, and `self` in Rust. These concepts help in building structured and reusable code.
