fn main() {
    // Define an array of integers
    let arr = [1, 2, 3]; 
    // Define a vector of Strings
    let a = [String::from("Hello"), String::from("world!")]; 

    // Iterating over an array without using an explicit iterator
    println!("Without Iterators:");

    for item in arr {
        println!("{item}"); // Prints each element
    }

    // This will cause a compilation error because `arr` was moved in the loop above
    // println!("{:?}", arr); // Uncommenting this will cause an error

    // Iterating over the array `a` by borrowing its elements
    for item in &a {
        println!("{item}"); // Prints each element while keeping ownership intact
    }

    println!("{:?}", a); // Works fine because `a` was not moved

    // Using Iterators to iterate over the reference of the array
    println!("Iterators:");
    for element in arr.iter() {
        println!("{element}"); // Prints each element
    }
    println!("{:?}", arr); // Works fine because `arr.iter()` borrows the array instead of moving it

    // Creating a mutable iterator to traverse elements one by one
    let mut iter = arr.iter();
    
    // Using `next()` to fetch the first element of the iterator
    assert_eq!(Some(&1), iter.next()); // Ensures that the first element is `1`
}
