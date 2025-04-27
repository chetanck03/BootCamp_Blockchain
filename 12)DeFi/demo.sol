// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Standard ERC20 interface to interact with tokens
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool);
}

/**
 * @title AMM (Automated Market Maker)
 * @dev Implements a constant product AMM (x * y = k) similar to Uniswap V2
 */
contract AMM {
    // The two tokens in the liquidity pool
    IERC20 immutable tokenA;
    IERC20 immutable tokenB;

    // Current reserves of each token in the pool
    uint reserveA;
    uint reserveB;

    // Liquidity provider token tracking
    uint totalLPShares;                        // Total shares issued to liquidity providers
    mapping (address => uint256) shares;       // Mapping of LP addresses to their share amount

    /**
     * @dev Constructor initializes the AMM with token addresses
     * @param _tokenA Address of the first token
     * @param _tokenB Address of the second token
     */
    constructor(address _tokenA, address _tokenB){
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    /**
     * @dev Internal function to mint LP shares
     * @param _shares Number of shares to mint to the sender
     */
    function _mint(uint _shares) internal {
         shares[msg.sender] = shares[msg.sender] + _shares;
         totalLPShares = totalLPShares + _shares;  
    }

    /**
     * @dev Internal function to update token reserves
     * @param _newReserveA New reserve amount for token A
     * @param _newReserveB New reserve amount for token B
     */
    function _update(uint _newReserveA, uint _newReserveB) internal{
         reserveA = _newReserveA;
         reserveB = _newReserveB;
    }

    /**
     * @dev Allows users to add liquidity to the pool
     * @param _amtA Amount of token A to add
     * @param _amtB Amount of token B to add
     * 
     * Liquidity must be added in the correct ratio relative to existing reserves
     * LP shares are calculated based on contribution relative to existing reserves
     */
    function add_liquidity(uint _amtA, uint _amtB) external{
        require(_amtA > 0 && _amtB > 0, "invalid amount");

        // If pool is not empty, the ratio must match the current reserve ratio
        if(reserveA > 0 || reserveB > 0){
           require(reserveA * _amtB == reserveB * _amtA, "Invalid ratio");
        }
       
        // Transfer tokens from user to the contract
        tokenA.transferFrom(msg.sender, address(this), _amtA);
        tokenB.transferFrom(msg.sender, address(this), _amtB);

        uint shareQty;
        if (totalLPShares == 0){
            // For first liquidity provider, use geometric mean (sqrt of product)
            shareQty = _sqrt(_amtA * _amtB);
        } else {
            // For subsequent providers, shares based on proportion of reserves
            shareQty = _min(
                (totalLPShares * _amtA) / reserveA,
                (totalLPShares * _amtB) / reserveB
                );
        }
        // Mint shares to the liquidity provider
        _mint(shareQty);

        // Update reserves to reflect new balances
        _update(
            tokenA.balanceOf(address(this)),
            tokenB.balanceOf(address(this))
         );
      
    }

    /**
     * @dev Internal function to burn LP shares
     * @param _shares Number of shares to burn
     */
    function _burn(uint _shares) internal {
     shares[msg.sender] -= _shares;
     totalLPShares -= _shares;
    }

    /**
     * @dev Allows users to remove liquidity and receive back tokens
     * @param _shares Number of LP shares to burn
     * 
     * Returns tokens proportional to the shares of the total pool
     */
    function remove_liquidity(uint _shares) external {
      require(_shares > 0, "invalid share amount");
      require(shares[msg.sender] >= _shares, "not enough shares");
      
      // Calculate token amounts proportional to shares
      uint amtA = (reserveA * _shares) / totalLPShares;
      uint amtB = (reserveB * _shares) / totalLPShares;
      
      // Burn shares first (security best practice - checks-effects-interactions)
      _burn(_shares);
      
      // Update reserves to reflect new balances
      _update(
        tokenA.balanceOf(address(this)) - amtA,
        tokenB.balanceOf(address(this)) - amtB
      );
      
      // Transfer tokens back to user
      tokenA.transfer(msg.sender, amtA);
      tokenB.transfer(msg.sender, amtB);
    }

    /**
     * @dev Allows users to swap tokens with a 0.3% fee
     * @param _token Address of the token being sent (either tokenA or tokenB)
     * @param _amt Amount of tokens to swap
     * 
     * Uses constant product formula x*y=k to determine output amount
     */
    function swap(address _token, uint _amt) external {
        require(_token == address(tokenA) || _token == address(tokenB), "invalid token");
        
        // Determine which token is being sent and which is being received
        (IERC20 _tokenA, IERC20 _tokenB, uint _resA, uint _resB) = 
        _token == address(tokenA) ?
        (tokenA, tokenB, reserveA, reserveB) :
        (tokenB, tokenA, reserveB, reserveA);
        
        // Apply 0.3% fee to input amount
        uint amtInWithFee = (_amt * 997) / 1000; // dx(1-fee) = dx(1-0.3%) = dx(1-3/1000) = dx(997/1000)
        
        // Calculate output amount using constant product formula
        uint _amtOut = (amtInWithFee * _resB) / (_resA + amtInWithFee);

        // Transfer tokens
        _tokenA.transferFrom(msg.sender, address(this), _amt);
        _tokenB.transfer(msg.sender, _amtOut);
        
        // Update reserves to reflect new balances
        _update(
         _tokenA.balanceOf(address(this)),
         _tokenB.balanceOf(address(this)));
    }

    /**
     * @dev Returns the minimum of two values
     * @param x First value
     * @param y Second value
     * @return The smaller of the two values
     */
    function _min(uint x, uint y) internal pure returns(uint){
        return x > y ? y : x;
    }

    /**
     * @dev Calculates the square root of a number
     * @param y The number to find the square root of
     * @return z The square root result
     * 
     * Uses the Babylonian method for square root approximation
     */
    function _sqrt(uint256 y) private pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}


