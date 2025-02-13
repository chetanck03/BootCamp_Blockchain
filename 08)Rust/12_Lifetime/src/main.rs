// Lifetime : To prevent dangling refrences and we talk about it regarding the references

// A function that takes two string slices with the same lifetime `'a` 
// and returns the longer one
fn longest<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() {
        s1  // Return first string if it's longer
    } else {
        s2  // Otherwise, return the second string
    }
}

fn main() {
    let str1 = String::from("Hello");
    let str2 = String::from("Rust");

    // Calling the function with string references
    let result = longest(&str1, &str2);

    println!("The longer string is: {}", result);
}
