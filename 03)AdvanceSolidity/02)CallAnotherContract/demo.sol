// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Alice {
    uint256 public x;
    uint256 public value;

    function setter(uint256 _x) public {
        x = _x;
    }

    function getter() public view returns(uint){
        return x;
    }

    function payableSetter(uint256 _x)
        public
        payable
    {
        x = _x;
        value = msg.value;
   
    }
}

contract Bob {
    function setter(Alice _alice, uint256 _x) public {
        _alice.setter(_x);
    }

    function getter(Alice _alice) public view returns(uint) {
       uint item =  _alice.getter();
       return item;
    }

    function setterViaAddress(address _addr, uint256 _x) public {
        Alice alice = Alice(_addr);
        alice.setter(_x);
    }

    function payableSetter(Alice _alice, uint256 _x) public payable {
            _alice.payableSetter{value: msg.value}(_x);
    }
}
