var { assert } = require('chai');
let { totalPriceShoppingBasket, bookSetsWithMinimumPrice } = require('../src/code');

describe("Kata books with limitations", function() {
  describe("Test algorithm create minimal sets", function(){
    describe("with ordered shopping basket", function(){
      it("with 2 repeated elements", function(){
        assert.deepEqual(bookSetsWithMinimumPrice([0, 0]), [[0], [0]], "Should be two different sets [0], [0]");
        assert.deepEqual(bookSetsWithMinimumPrice([1, 1]), [[1], [1]], "Should be two different sets [1], [1]");
        assert.deepEqual(bookSetsWithMinimumPrice([0, 1, 1]), [[0, 1], [1]], "Should be two different sets [0, 1], [1]");
        assert.deepEqual(bookSetsWithMinimumPrice([0, 0, 1, 1]), [[0, 1], [0, 1]], "Should be two different sets [0, 1], [0, 1]");
      });

      it("with 3 types of book", function(){
        assert.deepEqual(bookSetsWithMinimumPrice([0, 0, 1, 1, 2 ,3]), [[0, 1, 2, 3], [0, 1]], "Should be two different sets [0, 1, 2], [0, 1, 3]");
      });

      it("with 5 types of book", function(){
        assert.deepEqual(bookSetsWithMinimumPrice([0, 0, 1, 1, 2 , 2, 3, 4,]), [[0, 1, 2, 3], [0, 1, 2, 4]], "Should be two different sets [0, 1, 2, 3], [0, 1, 2, 4]");
      });
    });
  });

  describe("Basic rules shopping basket", function(){
    it("with 1 element", function(){
      assert.equal(totalPriceShoppingBasket([0]), 8);
      assert.equal(totalPriceShoppingBasket([1]), 8);
      assert.equal(totalPriceShoppingBasket([2]), 8);
      assert.equal(totalPriceShoppingBasket([3]), 8);
      assert.equal(totalPriceShoppingBasket([4]), 8);
    });
    it("with no repetitions", function(){
      assert.equal(totalPriceShoppingBasket([0, 1]), 8 * 2 * 0.95, 'Should get 5% of discount');
      assert.equal(totalPriceShoppingBasket([0, 1, 2]), 8 * 3 * 0.9, 'Should get 10% of discount');
      assert.equal(totalPriceShoppingBasket([0, 1, 2, 3]), 8 * 4 * 0.8, 'Should get 20% of discount');
      assert.equal(totalPriceShoppingBasket([0, 1, 2, 3, 4]), 8 * 5 * 0.75, 'Should get 25% of discount');
    });

    it("with repetitions", function(){
      assert.equal(totalPriceShoppingBasket([0, 0, 1]), 8 + (8 * 2 * 0.95), '1 - Books: [0, 0, 1]');
      assert.equal(totalPriceShoppingBasket([0, 0, 1, 1]), 2 * (8 * 2 * 0.95), '2 - Books: [0, 0, 1, 1]');
      assert.equal(totalPriceShoppingBasket([0, 0, 1, 2, 2, 3]), (8 * 4 * 0.8) + (8 * 2 * 0.95), '3 - Books: [0, 0, 1, 2, 2, 3]');
      assert.equal(totalPriceShoppingBasket([0, 1, 1, 2, 3, 4]), 8 + (8 * 5 * 0.75), '4 - Books: [0, 1, 1, 2, 3, 4]');
      assert.equal(totalPriceShoppingBasket([0, 0, 1, 1, 2, 2, 3, 4]), 2 * (8 * 4 * 0.8), '5 - Books: [0, 0, 1, 1, 2, 2, 3, 4]');
      assert.equal(
        totalPriceShoppingBasket([0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4]), 
        3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8)
        );
    });
  });
});
