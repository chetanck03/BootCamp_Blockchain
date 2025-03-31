# TypeScript Fundamentals

## Table of Contents

- [Basic Types](#basic-types)
- [Arrays and Tuples](#arrays-and-tuples)
- [Objects](#objects)
- [Functions](#functions)
- [Interfaces](#interfaces)
- [Enums](#enums)
- [Union Types](#union-types)
- [Type Aliases](#type-aliases)
- [Generics](#generics)
- [Output](#output)

## Installation and Setup

```bash
# Install TypeScript globally
npm install -g typescript

# Check TypeScript version
tsc --version

# Compile TypeScript file
tsc demo.ts

# Run the compiled JavaScript
node demo.js
```

## Basic Types

```typescript
let firstName: string = "John"; // String type
let age: number = 25; // Number type
let isStudent: boolean = true; // Boolean type
let nullValue: null = null; // Null type
let undefinedValue: undefined = undefined; // Undefined type
```

## Arrays and Tuples

```typescript
// Array Types
let numbers: number[] = [1, 2, 3, 4, 5]; // Array of numbers
let names: string[] = ["John", "Jane"]; // Array of strings

// Tuple Type (Fixed length array with defined types)
let person: [string, number] = ["John", 25];
```

## Objects

```typescript
let user: {
  name: string;
  age: number;
  isAdmin: boolean;
} = {
  name: "John",
  age: 25,
  isAdmin: false,
};
```

## Functions

```typescript
// Function with Type Annotations
function addNumbers(a: number, b: number): number {
  return a + b;
}

// Optional Parameters
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}
```

## Interfaces

```typescript
interface Car {
  brand: string;
  model: string;
  year: number;
}

let myCar: Car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
};
```

## Enums

```typescript
enum DaysOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
```

## Union Types

```typescript
let mixedType: string | number = "Hello";
mixedType = 42; // This is also valid
```

## Type Aliases

```typescript
type Point = {
  x: number;
  y: number;
};

let coordinates: Point = {
  x: 10,
  y: 20,
};
```

## Generics
Generics allow you to write flexible, reusable code that works with multiple types.

```typescript
// Generic Function
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

// Usage
getFirstElement([1, 2, 3]);        // Returns number
getFirstElement(["a", "b", "c"]);  // Returns string

// Generic Interface
interface Box<T> {
    content: T;
}
let numberBox: Box<number> = { content: 42 };
let stringBox: Box<string> = { content: "Hello" };

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
```

## Output 

```
String: John
Number: 25
Boolean: true
Number Array: [ 1, 2, 3, 4, 5 ]
String Array: [ 'John', 'Jane' ]
Tuple: [ 'John', 25 ]
Object: { name: 'John', age: 25, isAdmin: false }
Function Result: 8
Greet Function: Hello, John!
Greet Function with greeting: Good morning, John!
Interface Car: { brand: 'Toyota', model: 'Camry', year: 2022 }
Enum Day: 1
Union Type (string): Hello
Union Type (number): 42
Type Alias Point: { x: 10, y: 20 }
Generic Function with numbers: 1
Generic Function with strings: a
Generic Interface (number): { content: 42 }
Generic Interface (string): { content: 'Hello' }
Generic Class Queue: Queue { data: [ 1, 2 ] }
```

## Running the Examples

1. Save the code in `demo.ts`
2. Open terminal in the project directory
3. Run the following commands:

```bash
tsc demo.ts
node demo.js
```

## Key Benefits of TypeScript

- Static typing
- Object-oriented features
- Compile-time errors
- Great tooling support
- ECMAScript compatibility
- Cross-platform and cross-browser compatibility
