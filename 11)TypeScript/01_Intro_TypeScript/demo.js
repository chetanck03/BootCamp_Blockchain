// Basic Types
var firstName = "John";
console.log("String:", firstName);
var age = 25;
console.log("Number:", age);
var isStudent = true;
console.log("Boolean:", isStudent);
// Array Types
var numbers = [1, 2, 3, 4, 5];
console.log("Number Array:", numbers);
var names = ["John", "Jane"];
console.log("String Array:", names);
// Tuple
var person = ["John", 25];
console.log("Tuple:", person);
// Object
var user = {
    name: "John",
    age: 25,
    isAdmin: false
};
console.log("Object:", user);
// Function with Type Annotations
function addNumbers(a, b) {
    return a + b;
}
console.log("Function Result:", addNumbers(5, 3));
// Optional Parameters Function
function greet(name, greeting) {
    if (greeting) {
        return "".concat(greeting, ", ").concat(name, "!");
    }
    return "Hello, ".concat(name, "!");
}
console.log("Greet Function:", greet("John"));
console.log("Greet Function with greeting:", greet("John", "Good morning"));
var myCar = {
    brand: "Toyota",
    model: "Camry",
    year: 2022
};
console.log("Interface Car:", myCar);
// Enum
var DaysOfWeek;
(function (DaysOfWeek) {
    DaysOfWeek[DaysOfWeek["Sunday"] = 0] = "Sunday";
    DaysOfWeek[DaysOfWeek["Monday"] = 1] = "Monday";
    DaysOfWeek[DaysOfWeek["Tuesday"] = 2] = "Tuesday";
    DaysOfWeek[DaysOfWeek["Wednesday"] = 3] = "Wednesday";
    DaysOfWeek[DaysOfWeek["Thursday"] = 4] = "Thursday";
    DaysOfWeek[DaysOfWeek["Friday"] = 5] = "Friday";
    DaysOfWeek[DaysOfWeek["Saturday"] = 6] = "Saturday";
})(DaysOfWeek || (DaysOfWeek = {}));
console.log("Enum Day:", DaysOfWeek.Monday);
// Union Types
var mixedType = "Hello";
console.log("Union Type (string):", mixedType);
mixedType = 42;
console.log("Union Type (number):", mixedType);
var coordinates = {
    x: 10,
    y: 20
};
console.log("Type Alias Point:", coordinates);
// Generics
// Generic Function
function getFirstElement(arr) {
    return arr[0];
}
console.log("Generic Function with numbers:", getFirstElement([1, 2, 3]));
console.log("Generic Function with strings:", getFirstElement(["a", "b", "c"]));
var numberBox = { content: 42 };
var stringBox = { content: "Hello" };
console.log("Generic Interface (number):", numberBox);
console.log("Generic Interface (string):", stringBox);
// Generic Class
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.push = function (item) {
        this.data.push(item);
    };
    Queue.prototype.pop = function () {
        return this.data.shift();
    };
    return Queue;
}());
var numberQueue = new Queue();
numberQueue.push(1);
numberQueue.push(2);
console.log("Generic Class Queue:", numberQueue);
