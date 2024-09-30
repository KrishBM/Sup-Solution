pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rent.sol";

contract TestRent {
 // The address of the adoption contract to be tested
 Rent adoption = Rent(DeployedAddresses.Rent());

 // The id of the pet that will be used for testing
 uint expectedPetId = 8;

 //The expected owner of adopted pet is this contract
 address expectedAdopter = address(this);

  // Testing the adopt() function
  function testUserCanRentStorage() public {
    uint returnedId = adoption.adopt(expectedPetId);

    Assert.equal(returnedId, expectedPetId, "Rent of the expected storage should match what is returned.");
  }

  // Testing retrieval of a single pet's owner
  function testGetHolderAddressByStorageId() public {
    address adopter = adoption.adopters(expectedPetId);

    Assert.equal(adopter, expectedAdopter, "Holder of the expected storage should be this contract");
  }

  // Testing retrieval of all pet owners
  function testGetHolderAddressByStorageIdInArray() public {
    // Store adopters in memory rather than contract's storage
    address[16] memory adopters = adoption.getAdopters();

    Assert.equal(adopters[expectedPetId], expectedAdopter, "Holder of the expected storage should be this contract");
  }

}
