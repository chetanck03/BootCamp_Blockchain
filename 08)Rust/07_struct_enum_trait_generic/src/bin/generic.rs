// fn print_value(value:i32){
//     println!("Value is : {value}");
// } 

// Generic (T=type)
fn print_value<T: std::fmt::Display>(value:T){
    println!("Value is : {value}");
}

fn main(){
    let num = 5;
    print_value(num);

    let decimal = 5.1;
    print_value(decimal);

    let status = true;
    print_value(status);

}