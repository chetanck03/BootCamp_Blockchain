## Abstract Contracts:

- Demonstrated with the `AbstractExample` abstract contract and the `abstracts` contract.
- Abstract contracts can have both implemented and unimplemented (abstract) functions.
- They cannot be deployed directly and are used to define common behavior.

### Example:

```solidity
abstract contract AbstractExample {
    string public name;
    constructor() {
        name = "Hello World";
    }
    
    function InFunction() public pure returns (string memory) {
        return "InFunction";
    }

    function greet() public virtual returns (string memory);
}

contract abstracts is AbstractExample {
    function greet() public pure override returns (string memory) {
        return "Hello from abstracts";
    }
}
```

## Interface Contracts:

- Demonstrated with the `IExample` interface and the `Interface` contract.
- Interfaces declare function signatures without implementations.
- All functions in interfaces are external by default.

### Example:

```solidity
interface IExample {
    function greet() external view returns (string memory);
}

contract Interface is IExample {
    function greet() external pure override returns (string memory) {
        return "Hello from Interface";
    }
}
```
