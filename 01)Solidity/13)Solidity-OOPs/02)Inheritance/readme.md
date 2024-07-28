## Inheritance and Function Overriding:

- Demonstrated with the `Base` and `Derived` contracts.
- The `Derived` contract inherits from the `Base` contract and overrides the `greet` function.
- `virtual` and `override` keywords are used to facilitate overriding

## Example:

```solidity
contract Base {
    uint public a = 1234567;
    function greet() public pure virtual returns (string memory) {
        return "Hello from Base";
    }
}

contract Derived is Base {
    function greet() public pure override returns (string memory) {
        return "Hello from Derived";
    }
}
