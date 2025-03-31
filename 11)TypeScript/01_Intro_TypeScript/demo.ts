// Basic Types
let firstName: string = "John";
console.log("String:", firstName);

let age: number = 25;
console.log("Number:", age);

let isStudent: boolean = true;
console.log("Boolean:", isStudent);

// Array Types
let numbers: number[] = [1, 2, 3, 4, 5];
console.log("Number Array:", numbers);

let names: string[] = ["John", "Jane"];
console.log("String Array:", names);

// Tuple
let person: [string, number] = ["John", 25];
console.log("Tuple:", person);

// Object
let user: {
    name: string;
    age: number;
    isAdmin: boolean;
} = {
    name: "John",
    age: 25,
    isAdmin: false
};
console.log("Object:", user);

// Function with Type Annotations
function addNumbers(a: number, b: number): number {
    return a + b;
}
console.log("Function Result:", addNumbers(5, 3));

// Optional Parameters Function
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}
console.log("Greet Function:", greet("John"));
console.log("Greet Function with greeting:", greet("John", "Good morning"));

// Interface
interface Car {
    brand: string;
    model: string;
    year: number;
}

let myCar: Car = {
    brand: "Toyota",
    model: "Camry",
    year: 2022
};
console.log("Interface Car:", myCar);

// Enum
enum DaysOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
console.log("Enum Day:", DaysOfWeek.Monday);

// Union Types
let mixedType: string | number = "Hello";
console.log("Union Type (string):", mixedType);
mixedType = 42;
console.log("Union Type (number):", mixedType);

// Type Alias
type Point = {
    x: number;
    y: number;
};

let coordinates: Point = {
    x: 10,
    y: 20
};
console.log("Type Alias Point:", coordinates);


// Generics
// Generic Function
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}
console.log("Generic Function with numbers:", getFirstElement([1, 2, 3]));
console.log("Generic Function with strings:", getFirstElement(["a", "b", "c"]));

// Generic Interface
interface Box<T> {
    content: T;
}

let numberBox: Box<number> = { content: 42 };
let stringBox: Box<string> = { content: "Hello" };
console.log("Generic Interface (number):", numberBox);
console.log("Generic Interface (string):", stringBox);

// Generic Class
class Queue<T> {
    private data: T[] = [];

    push(item: T) {
        this.data.push(item);
    }

    pop(): T | undefined {
        return this.data.shift();
    }
}

let numberQueue = new Queue<number>();
numberQueue.push(1);
numberQueue.push(2);
console.log("Generic Class Queue:", numberQueue);