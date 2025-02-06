// Define a struct named `Student` with a single field `name` of type String
struct Student {
    name: String,
}

// Define a trait named `Name` which declares a method `name_change`
// This method will be implemented by any struct that implements this trait
trait Name {
    fn name_change(&mut self, new_name: String);
}

// Implement the `Name` trait for the `Student` struct
impl Name for Student {
    fn name_change(&mut self, new_name: String) {
        // Change the name of the student
        self.name = new_name;
    }
}

fn main() {
    // Create an instance of `Student` with the initial name "Chetan"
    let mut stu = Student {
        name: String::from("Chetan"),
    };
    
    // Print the initial name of the student
    println!("Student Name : {}", stu.name);

    // Change the student's name to "Gautam" using the `name_change` method
    stu.name_change(String::from("Gautam"));

    // Print the updated name of the student
    println!("Student Name : {}", stu.name);
}
