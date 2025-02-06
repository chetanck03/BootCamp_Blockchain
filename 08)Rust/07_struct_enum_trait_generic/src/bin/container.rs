struct Container<T> {
    value: T,
}

//  generic types
impl<T: Clone> Container<T> {
    // Associative function
    fn new(new_values: T) -> Self {
        Self { value: new_values }
    }

    fn set(&mut self, new_value: T) {
        self.value = new_value;
    }

    fn get(&self) -> T {
        self.value.clone()
    }
}

fn main() {
    let mut cont = Container::new(5); 
    println!("Value is : {}", cont.get()); 
    cont.set(10);
    println!("Value is : {}", cont.get()); 

    let mut cont = Container::new(true); 
    println!("Value is : {}", cont.get()); 
    cont.set(false);
    println!("Value is : {}", cont.get());

    let mut cont = Container::new(String::from("Chetan")); 
    println!("Value is : {}", cont.get()); 
    cont.set(String::from("Gautam"));
    println!("Value is : {}", cont.get());
}
