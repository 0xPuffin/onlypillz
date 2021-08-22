
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pillz is ERC721, Ownable {
  using Counters for Counters.Counter;
  using Strings for uint256;
  Counters.Counter private _tokenIds;
  mapping (uint256 => string) private _tokenURIs;
  uint256 public minted;
  uint256 public maxSupply = 6666;
  uint256 public mintPrice = 30000000000000000;//0.03 ETH

  event Mint(uint256 id, address recipient);
  
  constructor() ERC721("Pillz", "PLLZ") {}  
  
  function _setTokenURI(uint256 tokenId, string memory _tokenURI)
    internal
    override
    virtual
  {
    _tokenURIs[tokenId] = _tokenURI;
  }  
  
  function tokenURI(uint256 tokenId) 
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    string memory _tokenURI = _tokenURIs[tokenId];    return _tokenURI;
  } 
  
   function mint(address recipient, string[] memory uris, address referal)
    public
    payable
  {
    require(_tokenIds.current() < maxSupply, "the doctors stash is dry");
    require(msg.value >= mintPrice * uris.length, "these drugs aren't free");
    require(uris.length <= 10, "save some for the rest");
      for (uint i=0; i<uris.length; i++) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();   
        minted = newItemId; 
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uris[i]);

        emit Mint(newItemId, recipient);
      }
   
    if (referal != 0x0000000000000000000000000000000000000000) {
        //someone refered, they get 10% of sale
        payable(referal).transfer(msg.value / 10);
    }
  }
}

