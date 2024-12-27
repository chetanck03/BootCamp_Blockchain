fn main() {
    //  `str` owns this String.
    let str: String = String::from("HELLO!!"); 
    // `st` owns this String.
    let st: String = String::from("HI!!"); 
    
    // Clone `str` and transfer ownership of the clone to the `print` function.
    print(str.clone()); 
    // Print `str` in the main function (ownership is not transferred as we used clone earlier).
    println!("{str} in main function");

    // Clone `str` and calculate its length. Ownership of the clone is transferred to `cal_length`.
    let length = cal_length(str.clone());
    // Pass a reference of `st` to `cal_len`. Ownership is not transferred due to borrowing.
    let len = cal_len(&st); 
    // Print the length of `str` (calculated using the clone).
    println!("length of {str} string is : {length}");
    // Print the length of `st` (calculated using reference).
    println!("length of {st} string is : {len}");
    
    // Mutable reference example:
    let mut a: String = String::from("Hello ");
    // Pass a mutable reference of `a` to `append_string`. This allows modification of `a` in place.
    append_string(&mut a);
    println!("The append string is : {a}");
}

// A function to print a String.
// The ownership of `str1` is transferred to this function.
fn print(str1: String) {
    println!("{str1} in print function");
}

// A function to calculate the length of a String.
// The ownership of `str2` is transferred to this function.
fn cal_length(str2: String) -> usize {
    str2.len() // Returns the length of the String.
}

// A function to calculate the length of a String using a reference.
// Ownership is not transferred; the function borrows the String via reference.
fn cal_len(str3: &String) -> usize {
    str3.len() // Returns the length of the borrowed String.
}

// A function to append a string to a mutable String.
// Uses a mutable reference to modify the original String in place.
fn append_string(s: &mut String) {
    s.push_str("World!") // Appends "World!" to the String.
}
