// To Do List : Add task , remove task , view task , edit task & exit
use std::io; 

fn main() {
    // Initialize an empty vector to store tasks
    let mut task_list: Vec<String> = Vec::new();
    
    loop {
        // Display menu options
        println!("-----To Do List-----");
        println!("1. Add Task ");
        println!("2. Remove Task ");
        println!("3. View Task ");
        println!("4. Edit Task ");
        println!("5. Exit ");
        println!("--------------------");
        
        let mut choice = String::new();
        println!("Please enter your choice: ");
        io::stdin().read_line(&mut choice).expect("Invalid Input");
        
        // Convert input string to an integer
        let option: usize = choice.trim().parse().expect("Invalid Number");
        
        // Match user input to corresponding function
        match option {
            1 => add_task(&mut task_list),
            2 => remove_task(&mut task_list),
            3 => view_task(&task_list),
            4 => edit_task(&mut task_list),
            5 => {
                println!("Exiting.....!!");
                break;
            },
            _ => println!("Wrong Input! Please try Again"),
        }
    }
}

// Function to add a task to the list
fn add_task(task_list: &mut Vec<String>) {
    let mut desc = String::new();
    println!("Please Add the Task: ");
    io::stdin().read_line(&mut desc).expect("Invalid Input");
    
    let desc = desc.trim().to_string();
    if !desc.is_empty() {
        task_list.push(desc);
        println!("Task is Added!");
    } else {
        println!("Description cannot be empty");
    }
}

// Function to remove a task from the list
fn remove_task(task_list: &mut Vec<String>) {
    if task_list.is_empty() {
        println!("No tasks are found");
        return;
    }
    
    let mut task_number = String::new();
    println!("Please enter the task number to remove: ");
    view_task(task_list); // Show available tasks
    
    io::stdin().read_line(&mut task_number).expect("Invalid Input");
    let option: usize = task_number.trim().parse().expect("Invalid Number");
    
    if option == 0 || option > task_list.len() {
        println!("Invalid task number");
        return;
    }
    
    task_list.remove(option - 1);
    println!("Task is removed!");
}

// Function to view all tasks
fn view_task(task_list: &Vec<String>) {
    if task_list.is_empty() {
        println!("No tasks are found");
        return;
    }
    println!("Task List:");
    for (index, task) in task_list.iter().enumerate() {
        println!("{}. {}", index + 1, task);
    }
}

// Function to edit an existing task
fn edit_task(task_list: &mut Vec<String>) {
    if task_list.is_empty() {
        println!("No tasks are found");
        return;
    }
    
    view_task(task_list); // Show available tasks
    
    let mut task_number = String::new();
    println!("Enter the task number you want to edit: ");
    io::stdin().read_line(&mut task_number).expect("Invalid Input");
    
    let option: usize = match task_number.trim().parse() {
        Ok(num) if num > 0 && num <= task_list.len() => num,
        _ => {
            println!("Invalid task number. Please try again.");
            return;
        }
    };
    
    let mut new_desc = String::new();
    println!("Enter the new task description: ");
    io::stdin().read_line(&mut new_desc).expect("Invalid Input");
    
    let new_desc = new_desc.trim().to_string();
    if !new_desc.is_empty() {
        task_list[option - 1] = new_desc;
        println!("Task updated successfully!");
    } else {
        println!("Task description cannot be empty.");
    }
}
