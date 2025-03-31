# TypeScript Overview

## What is TypeScript?
TypeScript is a superset of JavaScript that adds static typing, making it easier to catch errors during development. It is developed and maintained by Microsoft.

## Why Use TypeScript?
- **Static Typing**: Helps catch errors before runtime.
- **Better Code Readability**: Improves maintainability.
- **Object-Oriented Features**: Supports classes, interfaces, and inheritance.
- **Compatibility**: Works with existing JavaScript code.
- **Improved IDE Support**: Provides better autocomplete and error checking.

## Installing TypeScript
To install TypeScript globally, use:
```sh
npm install -g typescript
```

To check if TypeScript is installed:
```sh
tsc --version
```

## Writing and Running TypeScript Code
Create a file `hello.ts`:
```ts
function greet(name: string): string {
    return `Hello, ${name}!`;
}
console.log(greet("Chetan"));
```

Compile it to JavaScript:
```sh
tsc hello.ts
```
This generates a `hello.js` file that can be run using Node.js:
```sh
node hello.js
```

## TypeScript Features
### 1. **Basic Types**
```ts
let isDone: boolean = true;
let count: number = 10;
let name: string = "TypeScript";
```

### 2. **Interfaces**
```ts
interface Person {
    name: string;
    age: number;
}
let user: Person = { name: "John", age: 25 };
```

### 3. **Classes**
```ts
class Animal {
    constructor(public name: string) {}
    speak(): void {
        console.log(`${this.name} makes a sound.`);
    }
}
let dog = new Animal("Dog");
dog.speak();
```

### 4. **Functions**
```ts
function add(a: number, b: number): number {
    return a + b;
}
console.log(add(5, 10));
```

### 5. **Generics**
```ts
function identity<T>(arg: T): T {
    return arg;
}
console.log(identity<string>("Hello"));
console.log(identity<number>(100));
```

## TypeScript Compiler Options
You can configure TypeScript using `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true
  }
}
```

Compile all TypeScript files in a project:
```sh
tsc
```

## Conclusion
TypeScript makes JavaScript development more scalable and maintainable. By adding static typing and modern features, it enhances the developer experience and reduces runtime errors.

Happy Coding! 🚀
