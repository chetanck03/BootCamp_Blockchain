// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract NftMinting is ERC721, ReentrancyGuard, PaymentSplitter, Ownable {
    // Constants
    uint public constant PRESALE_LIMIT = 5;
    uint public constant NFT_MINTING_PRICE = 0.01 ether;
    uint public constant MAX_SUPPLY = 20;

    // State Variables
    bytes32 immutable merkleRoot;
    string private baseURI;
    bool public isPaused;
    bool public isPreSaleActive;
    bool public isPublicSaleActive;
    uint currentTokenId;

    address[] private teamMembers = [
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    ];
    uint256[] private teamShares = [20, 40, 40];

    mapping(address => uint) public presaleCount;
    mapping(uint => string) public tokenCids;

    // Modifiers
    modifier onlyEOA() {
        require(tx.origin == msg.sender, "Contract calls not allowed");
        _;
    }

    modifier isVerified(bytes32[] calldata proof) {
        require(
            MerkleProof.verify(proof, merkleRoot, keccak256(abi.encodePacked((msg.sender)))),
            "Proof not valid"
        );
        _;
    }

    // Constructor
    constructor(string memory initialBaseURI, bytes32 root)
        ERC721("Ck Tech Hub", "CTH")
        Ownable()
        ReentrancyGuard()
        PaymentSplitter(teamMembers, teamShares)
    {
        baseURI = initialBaseURI;
        merkleRoot = root;
    }

    // Toggle Functions
    function togglePreSale() external onlyOwner {
        isPreSaleActive = !isPreSaleActive;
    }

    function togglePublicSale() external onlyOwner {
        isPublicSaleActive = !isPublicSaleActive;
    }

    // Mint Functions
    function preSaleMint(
        uint nftAmount,
        bytes32[] calldata proof,
        string[] calldata cids
    ) external payable onlyEOA nonReentrant isVerified(proof) {
        require(isPreSaleActive, "Presale not active");
        require(nftAmount > 0, "nftAmount > 0");
        require(presaleCount[msg.sender] + nftAmount <= PRESALE_LIMIT, "PRESALE_LIMIT exceed");
        require(currentTokenId + nftAmount <= MAX_SUPPLY, "MAX_SUPPLY exceed");
        require(cids.length == nftAmount, "CID count mismatch");
        require(msg.value == nftAmount * NFT_MINTING_PRICE, "Not enough ethers");

        presaleCount[msg.sender] += nftAmount;
        for (uint i = 0; i < nftAmount; i++) {
            _mintToken(msg.sender, cids[i]);
        }
    }

    function publicSaleMint(uint nftAmount, string[] calldata cids)
        external
        payable
        onlyEOA
        nonReentrant
    {
        require(!isPaused, "Contract is paused");
        require(isPublicSaleActive, "Public sale not active");
        require(nftAmount > 0, "Amount must be greater than zero");
        require(currentTokenId + nftAmount <= MAX_SUPPLY, "Max supply exceeded");
        require(cids.length == nftAmount, "CID count mismatch");
        require(msg.value == nftAmount * NFT_MINTING_PRICE, "Not enough ethers");

        for (uint i = 0; i < nftAmount; i++) {
            _mintToken(msg.sender, cids[i]);
        }
    }

    function _mintToken(address to, string calldata cid) internal {
        _safeMint(to, currentTokenId);
        tokenCids[currentTokenId] = cid;
        currentTokenId++;
    }

    // Token Management
    function setCid(uint tokenId, string calldata cid) external {
        _requireOwned(tokenId);
        tokenCids[tokenId] = cid;
    }

    function _requireOwned(uint tokenId) internal view {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) != address(0), "Token is not owned");
        require(ownerOf(tokenId) == msg.sender, "Token owner mismatch");
    }

    // View Functions
    function totalSupply() external view returns (uint) {
        return currentTokenId;
    }

    function remainingSupply() external view returns (uint) {
        return MAX_SUPPLY - currentTokenId;
    }

    // Withdrawal
    function withdrawEther() external payable onlyOwner {
        require(address(this).balance > 0, "Contract has zero balance");
        payable(msg.sender).transfer(address(this).balance);
    }
}
