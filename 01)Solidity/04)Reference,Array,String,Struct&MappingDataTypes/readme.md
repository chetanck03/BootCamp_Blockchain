# Overview

This Solidity code provides examples of various reference data types including fixed and dynamic arrays, strings, structs, and mappings.

## Contracts

### Fixed Array

- **Contract Name**: `fixedArray`
- **Description**: Demonstrates a fixed-size array of integers.
- **Functions**:
  - `getLength`: Returns the length of the array.
  - `updateElement`: Updates the value at a specific index in the array.

### Dynamic Array

- **Contract Name**: `dynamicArray`
- **Description**: Demonstrates a dynamic array of integers.
- **Functions**:
  - `addElement`: Adds an element to the end of the array.
  - `geElement`: Returns the length of the array.
  - `removeElement`: Removes the last element from the array.

### String Data Type

- **Contract Name**: `stringType`
- **Description**: Demonstrates the usage of string data type.
- **Functions**:
  - `addString`: Sets the value of the string.
  - `getString`: Returns the value of the string.

### Struct Data Type

- **Contract Name**: `structType`
- **Description**: Demonstrates the usage of a struct to group related data.
- **Struct**:
  - `Student`: Contains `name`, `roll`, and `pass` fields.
- **Functions**:
  - `insert`: Inserts values into the `Student` struct using two methods.

### Mapping Data Type

- **Contract Name**: `mapType`
- **Description**: Demonstrates simple and nested mappings.
- **Mappings**:
  - `student`: Maps a `uint` (roll) to a `string` (name).
  - `user`: Nested mapping from `uint` (id) to another mapping of `uint` (experience) to `string` (position).
- **Functions**:
  - `insertData`: Inserts data into the `student` mapping.
  - `getData`: Retrieves data from the `student` mapping.
  - `insertUser`: Inserts data into the nested `user` mapping.
  - `getUser`: Retrieves data from the nested `user` mapping.

## Data Type Overview

1. **Reference Data Types**:
   - Store the location of data, not the data itself.
   - Common types: Arrays, Structs, Mappings.
   - Storage: Permanent on blockchain.
   - Memory: Temporary during function execution.

2. **Arrays**:
   - Collections of elements of the same type.
   - Types: Fixed-size and Dynamic.
   - Common operations: `push`, `pop`, `length`.

3. **String Data Type**:
   - Sequences of characters used to store text.
   - Stored as byte arrays.

4. **Struct Data Type**:
   - Custom data types that group multiple variables under a single name.
   - Efficiently manage related data.

5. **Mapping Data Type**:
   - Key-value pairs used to store and retrieve values efficiently.
   - Cannot be iterated directly.
   - Supports nested mappings.
