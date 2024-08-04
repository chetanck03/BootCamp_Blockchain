# Solidity Contract Interaction Example

## Alice Contract

- **Functions**:
  - `setter(uint256 _x)`: Sets the value of the state variable `x`.
  - `getter()`: Returns the current value of the state variable `x`.
  - `payableSetter(uint256 _x)`: Sets the value of `x` and stores the amount of Ether sent with the transaction in the state variable `value`.

## Bob Contract

- **Functions**:
  - `setter(Alice _alice, uint256 _x)`: Calls the `setter` function on the `Alice` contract instance to set `x`.
  - `getter(Alice _alice)`: Calls the `getter` function on the `Alice` contract instance and returns the value of `x`.
  - `setterViaAddress(address _addr, uint256 _x)`: Creates an instance of the `Alice` contract using its address and calls the `setter` function to set `x`.
  - `payableSetter(Alice _alice, uint256 _x)`: Calls the `payableSetter` function on the `Alice` contract instance, forwarding any Ether sent with the transaction to set `x` and store the value.

## Summary

- The `Alice` contract provides basic functions to set and get a value, including a payable function to handle Ether transfers.
- The `Bob` contract demonstrates various ways to interact with the `Alice` contract, either by passing the contract instance directly or by its address, and includes handling for payable functions.
