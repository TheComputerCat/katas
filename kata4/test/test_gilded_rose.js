var { assert } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
let { items } = require('./texttest_fixture.js');
describe("Gilded Rose", function() {
  describe("Basic behaviour updateQuality with", function(){
    it('Generic item "+5 Dexterity Vest"', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[0];
      const exptedItem = new Item("+5 Dexterity Vest", 9, 19);
      assert.deepEqual(item, exptedItem);
    });
    it('Generic item "Elixir of the Mongoose"', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[1];
      const exptedItem = new Item("Elixir of the Mongoose", 4, 6);
      assert.deepEqual(item, exptedItem);
    });
    it('Aged Brie"', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[2];
      const exptedItem = new Item("Aged Brie", 1, 1);
      assert.deepEqual(item, exptedItem);
    });    
    it('Aged Brie with 0 days remaining', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[3];
      const exptedItem = new Item("Aged Brie", -1, 5);
      assert.deepEqual(item, exptedItem);
    });
    it('Sulfuras with 0 days remaining', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[4];
      const exptedItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      assert.deepEqual(item, exptedItem);
    });
    it('Backstage passes with 15 days remaining', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[6];
      const exptedItem = new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21);
      assert.deepEqual(item, exptedItem);
    });
    it('Backstage passes to with 10 days remaining', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[7];
      const exptedItem = new Item("Backstage passes to a TAFKAL80ETC concert", 9, 12);
      assert.deepEqual(item, exptedItem);
    });
    it('Backstage passes with 5 days remaining', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[8];
      const exptedItem = new Item("Backstage passes to a TAFKAL80ETC concert", 4, 18);
      assert.deepEqual(item, exptedItem);
    });
    it('Backstage passes with 0 remaining', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[9];
      const exptedItem = new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0);
      assert.deepEqual(item, exptedItem);
    });
  });
  describe("Special behaviour", function(){
    it('Once the sell by date has passed, Quality degrades twice as fast', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[10];
      const exptedItem = new Item("+12 Dexterity Vest", -1, 18);
      assert.deepEqual(item, exptedItem);
    });
    it('Quality drops to 0 after the concert', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[13];
      const exptedItem = new Item("Backstage passes to a TAFK concert", 0, 0);
      assert.deepEqual(item, exptedItem);
    });
  });
  describe("Constrains", function(){
    it('The Quality of an item is never negative', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[11];
      const exptedItem = new Item("+15 Dexterity Vest", -1, 0);
      assert.deepEqual(item, exptedItem);
    });
    describe("The Quality of an item is never more than 50", function(){
      it('Item with quality 50', function() {
        const gildedRose = new Shop(items);
        const item = gildedRose.updateQuality()[12];
        const exptedItem = new Item("Aged Brie", 2, 50);
        assert.deepEqual(item, exptedItem);
      });
      it('Backstage with 5 days remaining and 48 of quality', function() {
        const gildedRose = new Shop(items);
        const item = gildedRose.updateQuality()[14];
        const exptedItem = new Item("Backstage passes to a VALLENATICO concert", 4, 50);
        assert.deepEqual(item, exptedItem);
      });
    });
  });

  describe("New functionality", function() {
    it('Test updateQuality with "Conjured Mana Cake", 3, 6"', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[15];
      const exptedItem = new Item("Conjured Mana Cake", 2, 4);
      assert.deepEqual(item, exptedItem);
    });
    it('Test updateQuality with 0 days remaining', function() {
      const gildedRose = new Shop(items);
      const item = gildedRose.updateQuality()[16];
      const exptedItem = new Item("Conjured Mana Cake", -1, 6);
      assert.deepEqual(item, exptedItem);
    });
  });
});
