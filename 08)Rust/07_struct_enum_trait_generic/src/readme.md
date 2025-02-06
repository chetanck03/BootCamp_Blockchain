# Rust Student Struct with Traits

## Concepts Used

### 1. **Structs**
   - `struct Student { name: String }`  
   - Defines a custom data type `Student` with a single field `name`.

### 2. **Traits (Similar to Interfaces)**
   - `trait Name { fn name_change(&mut self, new_name: String); }`  
   - Defines a blueprint for behavior that structs can implement.

### 3. **Trait Implementation**
   - `impl Name for Student { fn name_change(&mut self, new_name: String) { self.name = new_name; } }`  
   - Implements the `name_change` function for the `Student` struct.

### 4. **Mutable Struct Instance**
   - `let mut stu = Student { name: String::from("Chetan") };`  
   - `mut` allows modifying the `name` field.

### 5. **Function Calling**
   - `stu.name_change(String::from("Gautam"));`  
   - Calls the trait method to change the student's name.

## **Output**

```
Student Name : Chetan 
Student Name : Gautam
```
