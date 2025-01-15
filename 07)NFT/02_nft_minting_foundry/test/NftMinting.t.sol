// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {NftMinting} from "../src/NftMinting.sol";

contract NftMintingTest is Test {
    NftMinting public nftMinting;
    bytes32 merkleRoot;
// Predefined addresses for the contract owner and a test user (Alice).
    address owner = address(0x1);
    address alice = address(0x2);
 // Setup function to initialize the test environment.
    function setUp() public {
      // Command array for running a Node.js script to generate the Merkle root.
        string[] memory cmds = new string[](2);
        cmds[0] = "node";
        cmds[1] = "script/generateMerkleRoot";
        // Execute the script and decode the returned Merkle root.

        bytes memory data = vm.ffi(cmds);
        merkleRoot = abi.decode(data, (bytes32));
        // console.logBytes32(merkleRoot);

 // Simulate the owner starting a transaction.
        vm.startPrank(owner);
        nftMinting = new NftMinting("http:://ipfs:", merkleRoot);
// Fund the owner and Alice's accounts with Ether for testing.
        vm.deal(owner, 10 ether);
        vm.deal(alice, 10 ether);
      
    }

//    test case :
// Test case 1: Check if the total supply of NFTs does not exceed the maximum allowed supply.
    // function invariant_SupplyCap() public view {
    //     assert(nftMinting.totalSupply() <= nftMinting.MAX_SUPPLY());
    // }


// Test case 2: Validate the publicSaleMint function.
    function test_publicMint() public {
        nftMinting.togglePublicSale();
// Stop the owner from simulating transactions to simulate a different user.
        vm.stopPrank();

 // Define the number of NFTs to mint and their corresponding content identifiers (CIDs).
        uint nftAmount = 2;
        string[] memory cids = new string[](2);
        cids[0] = "cid1";
        cids[1] = "cid2";
 // Simulate Alice calling the publicSaleMint function.
        vm.prank(alice, alice);
        nftMinting.publicSaleMint{value: 0.02 ether}(nftAmount, cids);
// Assertions to check if NFTs were minted correctly and the metadata (CIDs) is stored properly.
        assertEq(nftMinting.ownerOf(0), alice, "Owner of token 1 mismatch");
        assertEq(nftMinting.ownerOf(1), alice, "Owner of token 2 mismatch");
        assertEq(nftMinting.tokenCids(0), "cid1", "Cid 1 mismatch");
        assertEq(nftMinting.tokenCids(1), "cid2", "Cid 1 mismatch");
    }

 // Test case 3: Validate the setCid function.
    function test_setCid() public {
        nftMinting.togglePublicSale();
        vm.stopPrank();
 // Mint one NFT and assign an initial CID.
        uint nftAmount = 1;
        string[] memory cids = new string[](1);
        cids[0] = "cid0";

        vm.prank(alice, alice);
        nftMinting.publicSaleMint{value: 0.01 ether}(nftAmount, cids);
        assertEq(nftMinting.tokenCids(0), "cid0");

        vm.prank(alice);
        nftMinting.setCid(0, "cid1");
        assertEq(nftMinting.tokenCids(0), "cid1");

        vm.expectRevert("Token owner mismatch");
        nftMinting.setCid(0, "cid2");
    }
 // Test case 4: Fuzz testing for the setCid function to handle non-existent token IDs.
    function testFuzz_setCid(uint tokenId) public {
        vm.expectRevert("Token does not exist");
        nftMinting.setCid(tokenId, "random cid");
    }

}