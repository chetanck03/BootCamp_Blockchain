// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol"; // for console output during development

contract TokenMarketPlace is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    uint256 public tokenPrice = 2e16 wei; // 0.02 ether per Ck token
    uint256 public sellerCount = 1;
    uint256 public buyerCount = 1;

    IERC20 public CkToken;

    event TokenPriceUpdated(uint256 newPrice);
    event TokenBought(address indexed buyer, uint256 amount, uint256 totalCost);
    event TokenSold(address indexed seller, uint256 amount, uint256 totalEarned);
    event TokensWithdrawn(address indexed owner, uint256 amount);
    event EtherWithdrawn(address indexed owner, uint256 amount);
    event CalculateTokenPrice(uint256 priceToPay);

    constructor(address _CkToken) Ownable(msg.sender) {
        CkToken = IERC20(_CkToken);
    }

    // Adjust the token price based on demand
    function adjustTokenPriceBasedOnDemand() internal {
        uint256 marketDemandRatio = buyerCount.mul(1e18).div(sellerCount);
        uint256 smoothingFactor = 1e18;
        uint256 adjustedRatio = marketDemandRatio.add(smoothingFactor).div(2);
        uint256 newTokenPrice = tokenPrice.mul(adjustedRatio).div(1e18);
        uint256 minimumPrice = 2e16;

        if (newTokenPrice < minimumPrice) {
            tokenPrice = minimumPrice;
        } else {
            tokenPrice = newTokenPrice;
        }

        emit TokenPriceUpdated(tokenPrice);
    }

    // Calculate the total cost for a given amount of tokens
    function calculateTokenPrice(uint256 _amountOfToken) public returns (uint256) {
        require(_amountOfToken > 0, "Amount of tokens must be greater than 0");
        adjustTokenPriceBasedOnDemand();
        uint256 amountToPay = _amountOfToken.mul(tokenPrice).div(1e18);
        console.log("Amount to pay:", amountToPay);
        emit CalculateTokenPrice(amountToPay);
        return amountToPay;
    }

    // Buy tokens from the marketplace
    function buyCkToken(uint256 _amountOfToken) public payable {
        require(_amountOfToken > 0, "Amount of tokens must be greater than 0");

        uint256 totalCost = calculateTokenPrice(_amountOfToken);
        require(msg.value >= totalCost, "Insufficient Ether sent");

        // Transfer tokens to the buyer
        CkToken.safeTransfer(msg.sender, _amountOfToken);

        // Update buyer count and adjust the token price
        buyerCount++;
        adjustTokenPriceBasedOnDemand();

        emit TokenBought(msg.sender, _amountOfToken, totalCost);

        // Refund any excess Ether sent
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value.sub(totalCost));
        }
    }

    // Sell tokens back to the marketplace
    function sellCkToken(uint256 _amountOfToken) public {
        require(_amountOfToken > 0, "Amount of tokens must be greater than 0");

        uint256 totalEarned = calculateTokenPrice(_amountOfToken);

        // Transfer tokens from the seller to the contract
        CkToken.safeTransferFrom(msg.sender, address(this), _amountOfToken);

        // Update seller count and adjust the token price
        sellerCount++;
        adjustTokenPriceBasedOnDemand();

        // Transfer Ether to the seller
        payable(msg.sender).transfer(totalEarned);

        emit TokenSold(msg.sender, _amountOfToken, totalEarned);
    }

    // Owner can withdraw excess tokens from the contract
    function withdrawTokens(uint256 _amount) public onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(CkToken.balanceOf(address(this)) >= _amount, "Insufficient tokens in contract");

        CkToken.safeTransfer(owner(), _amount);
        emit TokensWithdrawn(owner(), _amount);
    }

    // Owner can withdraw accumulated Ether from the contract
    function withdrawEther(uint256 _amount) public onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= _amount, "Insufficient Ether in contract");

        payable(owner()).transfer(_amount);
        emit EtherWithdrawn(owner(), _amount);
    }

}
