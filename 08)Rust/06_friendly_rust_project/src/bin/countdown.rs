use std::io;
use std::time::Duration;
use std::thread::sleep;

fn main() {
    loop {
        // Prompt the user to input the timer duration
        let mut input = String::new();
        println!("Please enter the Timer Duration in seconds: ");

        // Read input from the user
        io::stdin().read_line(&mut input).expect("Failed to read input");

        // Attempt to parse the input into an unsigned 16-bit integer (u16)
        let timer: u16 = match input.trim().parse() {
            Ok(timer) => timer,
            Err(_) => {
                println!("Invalid number. Please enter a valid number.");
                continue;
            }
        };

        println!("Timer CountDown Start:");
        start_timer(timer);
        println!("Timer CountDown Stop: {timer} seconds completed.");
        break;
    }
}
fn start_timer(timer: u16) {
    // Loop from the timer value down to 1
    for i in (1..=timer).rev() {
        println!("{i}");
        // Pause for one second before the next iteration
        sleep(Duration::from_secs(1));
    }
}
