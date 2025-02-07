# Rust Iterator Implementation

## Overview
This Rust program defines a custom iterator using a struct and the `Iterator` trait.

## Features
- Implements a counter that iterates up to a specified limit.
- Uses Rust's `Iterator` trait with an associated type.
- Demonstrates how to create a simple custom iterator in Rust.

## Code Breakdown
### `struct Counter`
- A struct with a `counter` field of type `u32`.

### `impl Counter`
- `new() -> Self`: Constructor that initializes `counter` to 0.

### `impl Iterator for Counter`
- Defines an associated type `Item = u32`.
- Implements the `next()` method, incrementing `counter` and returning `Some(counter)` if it's less than 5, otherwise returning `None`.

## Usage
1. Create an instance of `Counter` using `Counter::new()`.
2. Use a `while let` loop to iterate through the counter until `None` is returned.

## Example Execution
```
1
2
3
4
```