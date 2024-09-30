const Rent = artifacts.require("Rent");

contract("Rent", (accounts) => {
 let adoption;
 let expectedAdopter;

 before(async () => {
     adoption = await Rent.deployed();
 });

 describe("renting a storage and retrieving account addresses", async () => {
   before("rent a storage using accounts[0]", async () => {
     await adoption.adopt(8, { from: accounts[0] });
     expectedAdopter = accounts[0];
   });
   
  it("can fetch the address of an holder by storage id", async () => {
   const adopter = await adoption.adopters(8);
   assert.equal(adopter, expectedAdopter, "The holder of the rented storage should be the first account.");
  }); 
   
 it("can fetch the collection of all storage holders' addresses", async () => {
   const adopters = await adoption.getAdopters();
   assert.equal(adopters[8], expectedAdopter, "The holder of the rented storage should be in the collection.");
});
   
 });
});

