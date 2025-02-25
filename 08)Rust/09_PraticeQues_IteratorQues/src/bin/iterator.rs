// Define a struct named Counter with a single field 'counter' of type u32
struct Counter {
    counter: u32,
}

// Implement methods for Counter
impl Counter {
    // Constructor method to create a new Counter instance with counter set to 0
    fn new() -> Self {
        Counter { counter: 0 }
    }
}

// Implement the Iterator trait for Counter
impl Iterator for Counter {
    // Define the type of items the iterator will produce (u32)
    type Item = u32;

    // Implement the next() method which returns the next number in the sequence
    fn next(&mut self) -> Option<Self::Item> {
        self.counter += 1; // Increment the counter by 1

        // If counter is less than 5, return Some(counter), else return None to stop iteration
        if self.counter < 5 {
            Some(self.counter)
        } else {
            None
        }
    }
}

fn main() {
    // Create a new Counter instance
    let mut counter = Counter::new();

    // Iterate through the Counter using a while loop
    while let Some(value) = counter.next() {
        println!("{}", value); // Print each value generated by the iterator
    }
}
