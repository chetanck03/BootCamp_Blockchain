# Rust Iterators and Borrowing Example

This Rust program demonstrates the difference between directly iterating over an array and using iterators. It highlights how Rust manages ownership and borrowing while iterating through collections.

## Features
- Iterates over an array without using explicit iterators.
- Demonstrates borrowing (`&`) to prevent ownership transfer.
- Uses `.iter()` to iterate over a borrowed reference.
- Uses `.next()` to manually fetch elements from an iterator.
- Uses `assert_eq!` to verify iterator behavior.

## Code Explanation
1. **Direct Iteration**: The loop consumes the array, so it cannot be used after the loop.
2. **Borrowing (`&`)**: When using `&a`, the array remains accessible after iteration.
3. **Using `.iter()`**: Iterators allow traversing the collection while keeping ownership intact.
4. **Manually Accessing Elements**: The `next()` method is used to retrieve values step by step.
5. **Using `assert_eq!`**: 
   - `assert_eq!(Some(&1), iter.next());`
   - This ensures that the first element retrieved from the iterator is `1`.
   - If the expected value (`Some(&1)`) does not match the actual value returned by `iter.next()`, the program will panic.

## How to Run
Ensure you have Rust installed, then run:
```sh
cargo run
```

## Output

```
Without Iterators:
1
2
3
["Hello", "world!"]
Hello
world!
Iterators:
1
2
3
[1, 2, 3]
```