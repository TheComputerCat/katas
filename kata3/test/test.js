import * as incrementalKataFunctions from '../code.js';
import { assert } from 'chai'
describe('Kata 3 incremental kata', function () {
  describe('Step 1 add function', function () {
    it('with one parameter ""', function(){
      const expected = 0;
      const actual = incrementalKataFunctions.add("");
      assert.equal(actual, expected);
    });
    it('with one parameter "1"', function(){
      const expected = 1;
      const actual = incrementalKataFunctions.add("1");
      assert.equal(actual, expected);
    });
    it('with one parameter "12"', function(){
      const expected = 12;
      const actual = incrementalKataFunctions.add("12");
      assert.equal(actual, expected);
    });
    it('with one parameter "989"', function(){
      const expected = 989;
      const actual = incrementalKataFunctions.add("989");
      assert.equal(actual, expected);
    });
    it('with two parameters "1,2"', function(){
      const expected = 3;
      const actual = incrementalKataFunctions.add("1,2");
      assert.equal(actual, expected);
    });
    it('with two parameters "132,21"', function(){
      const expected = 153;
      const actual = incrementalKataFunctions.add("132,21");
      assert.equal(actual, expected);
    });
  });

  describe('Step 2 handle an unknown amount of numbers', function () {
    it('with 3 parameters "1,2,3"', function(){
      const expected = 6;
      const actual = incrementalKataFunctions.add("1,2,3");
      assert.equal(actual, expected);
    });
    it('with 3 parameters "33,21,345"', function(){
      const expected = 399;
      const actual = incrementalKataFunctions.add("33,21,345");
      assert.equal(actual, expected);
    });
    it('with 4 parameters "33,21,345,1"', function(){
      const expected = 400;
      const actual = incrementalKataFunctions.add("33,21,345,1");
      assert.equal(actual, expected);
    });
    it('with 10 parameters "1,2,3,4,5,6,7,8,9,10"', function(){
      const expected = 55;
      const actual = incrementalKataFunctions.add("1,2,3,4,5,6,7,8,9,10");
      assert.equal(actual, expected);
    });
  });

  describe('Step 3 handle new lines between numbers', function () {
    it('with 2 parameters "1\\n2"', function(){
      const expected = 3;
      const actual = incrementalKataFunctions.add("1\n2");
      assert.equal(actual, expected);
    });
    it('with 2 parameters "14\\n25"', function(){
      const expected = 39;
      const actual = incrementalKataFunctions.add("14\n25");
      assert.equal(actual, expected);
    });
    it('with 3 parameters "1\\n2,3"', function(){
      const expected = 6;
      const actual = incrementalKataFunctions.add("1\n2,3");
      assert.equal(actual, expected);
    });
    it('with 3 parameters "45\\n223,102"', function(){
      const expected = 370;
      const actual = incrementalKataFunctions.add("45\n223,102");
      assert.equal(actual, expected);
    });
  });

  describe('Check new delimiter syntax', function () {
    it('with ; as delimiter and 2 parameters "//;\\n1;2"', function(){
      const expected = true;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//;\n1;2");
      assert.equal(actual, expected);
    });
    it('with + as delimiter and 2 parameters "//+\\n1;2"', function(){
      const expected = true;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//+\n1;2");
      assert.equal(actual, expected);
    });
    it('with wrong syntax "//+fa\\n1;2"', function(){
      const expected = false;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//+fa\n1;2");
      assert.equal(actual, expected);
    });
  });

  describe('Get operands', function () {
    it('with normal syntax "1,2"', function(){
      const expected = [1,2];
      const actual = incrementalKataFunctions.getOperands("1,2");
      assert.deepEqual(actual, expected);
    });
    it('with ; as delimiter and 2 parameters "//;\\n1;2"', function(){
      const expected = [1,2];
      const actual = incrementalKataFunctions.getOperands("//;\n1;2");
      assert.deepEqual(actual, expected);
    });

    it('with + as delimiter and 4 parameters "//+\\n12+14\\n2"', function(){
      const expected = [12,14,2];
      const actual = incrementalKataFunctions.getOperands("//+\n12+14\n2");
      assert.deepEqual(actual, expected);
    });
  });

  describe('Step 4 support different delimiters ', function () {
    it('with ; as delimiter and 2 parameters "//;\\n1;2"', function(){
      const expected = 3;
      const actual = incrementalKataFunctions.add("//;\n1;2");
      assert.equal(actual, expected);
    });
    it('with + as delimiter and 4 parameters "//+\\n12+14\\n2"', function(){
      const expected = 28;
      const actual = incrementalKataFunctions.add("//+\n12+14\n2");
      assert.equal(actual, expected);
    });
    it('with p as delimiter and 10 parameters "//p\\n1p2p3p4p5p6p7p8p9p10"', function(){
      const expected = 55;
      const actual = incrementalKataFunctions.add("//p\n1p2p3p4p5p6p7p8p9p10");
      assert.equal(actual, expected);
    });
  });

  describe('Step 5 no negative numbers ', function () {
    it('with two parameters "1,-2"', function(){
      const expected = "negatives not allowed -2";
      const actual = incrementalKataFunctions.add("1,-2");
      assert.equal(actual, expected);
    });
    it('with two parameters "-1,-2"', function(){
      const expected = "negatives not allowed -1, -2";
      const actual = incrementalKataFunctions.add("-1,-2");
      assert.equal(actual, expected);
    });
    it('with 3 parameters "-1,-2,-9"', function(){
      const expected = "negatives not allowed -1, -2, -9";
      const actual = incrementalKataFunctions.add("-1,-2,-9");
      assert.equal(actual, expected);
    });
    it('with + as delimiter and 4 parameters "//+\\n12+-14\\n2"', function(){
      const expected = "negatives not allowed -14";
      const actual = incrementalKataFunctions.add("//+\n12+-14\n2");
      assert.equal(actual, expected);
    });
  });

  describe('Step 6 ignore numbers bigger than 1000 ', function () {
    it('with two parameters "2,1001"', function(){
      const expected = 2;
      const actual = incrementalKataFunctions.add("2, 1001");
      assert.equal(actual, expected);
    });
    it('with two parameters "1001,1001"', function(){
      const expected = 0;
      const actual = incrementalKataFunctions.add("1001, 1001");
      assert.equal(actual, expected);
    });
    it('with + as delimiter and 4 parameters "//+\\n1200+1400\\n2"', function(){
      const expected = 2;
      const actual = incrementalKataFunctions.add("//+\n1200+1400\n2");
      assert.equal(actual, expected);
    });
  });

  describe('Check new delimiter syntax with new format', function () {
    it('with *** as delimiter and 3 parameters "//[***]\\n1***2***3"', function(){
      const expected = true;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//[***]\n1***2***3");
      assert.equal(actual, expected);
    });
    it('with wrong syntax "//***]\\n1***2***3"', function(){
      const expected = false;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//***]\n1***2***3");
      assert.equal(actual, expected);
    });
  });

  describe('Step 7 any length delimiter ', function () {
    it('with *** as delimiter and 3 parameters "//[***]\\n1***2***3"', function(){
      const expected = 6;
      const actual = incrementalKataFunctions.add("//[***]\n1***2***3");
      assert.equal(actual, expected);
    });
    it('with ; as delimiter and 3 parameters "//l\\n1;2;3"', function(){
      const expected = 6;
      const actual = incrementalKataFunctions.add("//;\n1;2;3");
      assert.equal(actual, expected);
    });
    it('with miaw as delimiter and 3 parameters "//[miaw]\\n1miaw2miaw33"', function(){
      const expected = 36;
      const actual = incrementalKataFunctions.add("//[miaw]\n1miaw2miaw33");
      assert.equal(actual, expected);
    });
  });

  describe('Check new delimiter syntax with for multiple delimiters', function () {
    it('with * and % as delimiters and 3 parameters "//[*][%]\\n1*2%3"', function(){
      const expected = true;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//[*][%]\n1*2%3");
      assert.equal(actual, expected);
    });
    it('with *,% and ; as delimiters and 4 parameters "//[*][%][;]\\n1*2%3;4"', function(){
      const expected = true;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//[*][%][;]\n1*2%3;4");
      assert.equal(actual, expected);
    });
    it('wrong syntax "//[[]]\\n1*2%3;4"', function(){
      const expected = false;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//[[]]\n1*2%3;4");
      assert.equal(actual, expected);
    });
    it('with wrong syntax "//[*][][;]\\n1*2%3;4"', function(){
      const expected = false;
      const actual = incrementalKataFunctions.checkNewDelimiterSyntax("//[*][][;]\n1*2%3;4");
      assert.equal(actual, expected);
    });
  });


  describe('Get delimiters', function () {
    it('with *** as delimiter and 3 parameters "//[***]\\n1***2***3"', function(){
      const expected = ["***"];
      const actual = incrementalKataFunctions.getDelimiters("//[***]\n1***2***3");
      assert.deepEqual(actual, expected);
    });
    it('with ; as delimiters and 3 parameters "//l\\n1;2;3"', function(){
      const expected = [";"];
      const actual = incrementalKataFunctions.getDelimiters("//;\n1;2;3");
      assert.deepEqual(actual, expected);
    });
    it('with * and % as delimiters and 3 parameters "//[*][%]\\n1*2%3"', function(){
      const expected = ["*", "%"];
      const actual = incrementalKataFunctions.getDelimiters("//[*][%]\n1*2%3");
      assert.deepEqual(actual, expected);
    });
  });

  describe('Step 8 multiple delimiters ', function () {
    it('with * and % as delimiters and 3 parameters "//[*][%]\\n1*2%3"', function(){
      const expected = 6;
      const actual = incrementalKataFunctions.add("//[*][%]\n1*2%3");
      assert.equal(actual, expected);
    });
    it('with *,% and ; as delimiters and 4 parameters "//[*][%][;]\\n1*2%3;4"', function(){
      const expected = 10;
      const actual = incrementalKataFunctions.add("//[*][%][;]\n1*2%3;4");
      assert.equal(actual, expected);
    });
    it('with *,%,+ and; as delimiters and 5 parameters "//[*][%][+][;]\\n1*2%3;4+5"', function(){
      const expected = 15;
      const actual = incrementalKataFunctions.add("//[*][%][+][;]\n1*2%3;4+5");
      assert.equal(actual, expected);
    });
  });
  describe('Step 9 multiple length longer than 1 ', function () {
    it('with *** and %% as delimiters and 3 parameters "//[***][%%]\\n1***2%%3"', function(){
      const expected = 6;
      const actual = incrementalKataFunctions.add("//[*][%]\n1***2%%3");
      assert.equal(actual, expected);
    });
    it('with **,%%%% and ;;; as delimiters and 4 parameters "//[**][%%%%][;;;]\\n1**2%%%%%3;;;4"', function(){
      const expected = 10;
      const actual = incrementalKataFunctions.add("//[**][%%%%][;;;]\n1**2%%%%3;;;4");
      assert.equal(actual, expected);
    });
    it('with *,%%,++ and; as delimiters and 5 parameters "//[*][%%][++][;]\\n1*2%%3;4++5"', function(){
      const expected = 15;
      const actual = incrementalKataFunctions.add("//[*][%%][++][;]\n1*2%%3;4++5");
      assert.equal(actual, expected);
    });
  });
});