// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTContract is ERC721, Ownable, ReentrancyGuard, PaymentSplitter {

    bytes32 public immutable merkleRoot; 
    // Immutable Merkle root used to verify presale participants.

    string private baseTokenURI;
    // Base URI for fetching metadata of NFTs.

    uint256 private currentTokenId;
    // Tracks the current token ID for minted NFTs.

    bool public isPaused;
    bool public isPresaleActive;
    bool public isPublicSaleActive;
    // Flags for controlling the contract's state (paused, presale, public sale).

    uint256 public constant PRESALE_LIMIT = 5;
    uint256 public constant MAX_SUPPLY = 20;
    uint256 public constant TOKEN_PRICE = 0.000001 ether;
    // Constants for presale limits, maximum supply, and token price.

    mapping(address => uint256) public presaleMintCount;
    // Tracks how many tokens an address has minted during the presale.

    mapping(uint256 => string) private tokenCIDs;
    // Maps token IDs to their corresponding Content Identifiers (CIDs).

    uint256[] private teamShares = [20, 30, 50];
    address[] private teamMembers = [
        0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
        0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
        0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
    ];
    // Specifies team members and their respective shares for payment splitting.

    modifier onlyEOA() {
        require(msg.sender == tx.origin, "Contract calls not allowed");
        _;
    }
    // Ensures that only externally owned accounts (EOAs) can call certain functions.

    modifier isValidProof(bytes32[] calldata proof) {
        require(
            MerkleProof.verify(proof, merkleRoot, keccak256(abi.encodePacked(msg.sender))),
            "Invalid merkle proof"
        );
        _;
    }
    // Validates a Merkle proof against the provided Merkle root.

    constructor(string memory initialBaseURI, bytes32 root)
        ERC721("Ck Tech Hub", "CTH")
        PaymentSplitter(teamMembers, teamShares)
        ReentrancyGuard()
        Ownable(msg.sender)
    {
        merkleRoot = root;
        setBaseTokenURI(initialBaseURI);
    }
    // Initializes the contract with a base URI, Merkle root, and sets up the payment splitter.

    function setBaseTokenURI(string memory newBaseURI) public onlyOwner {
        baseTokenURI = newBaseURI;
    }
    // Allows the owner to set or update the base token URI.

    function togglePause() public onlyOwner {
        isPaused = !isPaused;
    }
    // Toggles the paused state of the contract.

    function togglePresale() public onlyOwner {
        isPresaleActive = !isPresaleActive;
    }
    // Toggles the presale state.

    function presaleMint(uint256 nftAmount, bytes32[] calldata proof, string[] calldata cids)
        external payable isValidProof(proof) onlyEOA nonReentrant
    {
        require(!isPaused, "Contract: Paused");
        require(isPresaleActive, "Presale: Not Active");
        require(nftAmount > 0, "Amount must be greater than zero");
        require(
            presaleMintCount[msg.sender] + nftAmount <= PRESALE_LIMIT,
            "Presale limit exceeded"
        );
        require(
            currentTokenId + nftAmount <= MAX_SUPPLY,
            "Max supply exceeded"
        );
        require(msg.value >= TOKEN_PRICE * nftAmount, "Insufficient ETH");
        require(cids.length == nftAmount, "CIDs and nftAmount mismatched");
        presaleMintCount[msg.sender] += nftAmount;

        for (uint256 i = 0; i < nftAmount; i++) {
            _mintToken(msg.sender, cids[i]);
        }
    }
    // Allows eligible users to mint tokens during the presale with a valid Merkle proof.

    function publicSaleMint(uint256 nftAmount, string[] calldata cids)
        external payable onlyEOA nonReentrant
    {
        require(!isPaused, "Contract: Paused");
        require(isPublicSaleActive, "Public sale is not active");
        require(nftAmount > 0, "Amount must be greater than zero");
        require(
            currentTokenId + nftAmount <= MAX_SUPPLY,
            "Max supply exceeded"
        );
        require(msg.value >= TOKEN_PRICE * nftAmount, "Insufficient ETH");
        require(cids.length == nftAmount, "CIDs and nftAmount mismatched");

        for (uint256 i = 0; i < nftAmount; i++) {
            _mintToken(msg.sender, cids[i]);
        }
    }
    // Allows users to mint tokens during the public sale.

    function _mintToken(address to, string memory cid) internal {
        currentTokenId++;
        _safeMint(to, currentTokenId);
        tokenCIDs[currentTokenId] = cid;
    }
    // Handles the actual minting of tokens and assigns a CID to each.

    function togglePublicSale() public onlyOwner {
        isPublicSaleActive = !isPublicSaleActive;
    }
    // Toggles the public sale state.

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        string memory cid = tokenCIDs[tokenId];
        require(bytes(cid).length > 0, "CID not found");
        return string(abi.encodePacked(baseTokenURI, cid));
    }
    // Returns the metadata URI for a given token.

    function totalSupply() public view returns (uint256) {
        return currentTokenId;
    }
    // Returns the total number of tokens minted so far.

    function withdrawFunds() public onlyOwner nonReentrant {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
    // Allows the owner to withdraw funds from the contract.

    receive() external payable override {}
    // Allows the contract to receive Ether directly.
}
