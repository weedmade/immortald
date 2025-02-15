// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DomainNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("ImmortalDomain", "IMD") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintDomainNFT(address to) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        tokenCounter++;
        return newTokenId;
    }
}
