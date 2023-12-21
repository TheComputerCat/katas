const { getHand } = require('../src/code');

const hand1 = getHand("2H 3D 5S 9C KD");

const hand2 = getHand("2C 3H 4S 8C AH");

const hand3 = getHand("2H 4S 4C 2D 4H");

const hand4 = getHand("2S 8S AS QS 3S");

const hand5 = getHand("2H 2D 5S 9C KD");

const hand6 = getHand("2C 3H 8S 8C AH");

const hand7 = getHand("2C 3H 7S 8C AH");

const hand9 = getHand("2H 2D 5S 5C KD");

const hand10 = getHand("2C 3H 3S 8C 8H");

const hand11 = getHand("2C 3H 7S 8C 8H");

const hand12 = getHand("2C 2H 7S 8C 8H");

const hand13 = getHand("2H 2D 2S 9C KD");

const hand14 = getHand("2C 8H 8S 8C AH");

const hand15 = getHand("1H 2D 2S 9C KD");

const hand16 = getHand("1C 2H 3S 4C 5H");

const hand17 = getHand("TC JH QS KC AH");

const hand18 = getHand("1H 2H 2H 9H KH");

const hand19 = getHand("1D 2D 3D 4D 5D");

const hand21 = getHand("2H 2H 2H 9H 9H");

const hand22 = getHand("1H 1H 2H 2H 2H");

const hand23 = getHand("1H 2H 2H 2H 3H");

const hand24 = getHand("1H 2H 3S 4H 7H");

const hand25 = getHand("2H 2D 2S 2C KD");

const hand26 = getHand("2C 8H 8S 8C 8H");

const hand27 = getHand("1H 2H 3H 4H 5H");

const hand29 = getHand("TC JC QC KC AH");

const hand30 = getHand("TC JC 4C KC AH");

const hand32 = getHand("1H 1H 1H 1H 2H");

const game1 = { "Black": getHand("3D 2H 5S 9C KD"), "White": getHand("4S 3H 2C AH 8C"), };

const game1Sorted = { "Black": getHand("2H 3D 5S 9C KD"), "White": getHand("2C 3H 4S 8C AH"), };

const game2 = { "Black": getHand("2H 3D 5S 9C KD"), "White": getHand("2C 3H 4S 8C AH"), };

const game3 = { "Black": getHand("2H 2D 4C 4H 4S"), "White": getHand("2S 3S 8S QS AS"), };

const game4 = { "Black": getHand("2H 2D 4C 4H AS"), "White": getHand("2S 3S 8S QS AS"), };

const game5 = { "Black": getHand("2H 2D 8C QH AS"), "White": getHand("2S 3S 8S QS AS"), };

const game6 = { "Black": getHand("2H 3D 8C QH AS"), "White": getHand("1S 3S 8S QS AS"), };

const game7 = { "Black": getHand("1H 3D 8C QH AS"), "White": getHand("1S 3S 8S QS AS"), };

const game8 = { "Black": getHand("1H 3D 8C QH AS"), "White": getHand("1S 3S 8S QS AS"), };

const game9 = { "Black": getHand("2H 3D 5S 9C KD"), "White": getHand("2C 3H 5S 9C KH"), };

const game10 = { "Black": getHand("2H 2D 5S 9C KD"), "White": getHand("2C 3H 8S 8C AH"), };

const game11 = { "Black": getHand("2H 2D 5S 9C KD"), "White": getHand("2C 2H 8S 8C AH"), };

const game12 = { "Black": getHand("2H 2D 5S 9C KD"), "White": getHand("2C 2H 8S 8C KH"), };

const game13 = { "Black": getHand("2H 2D 5S 9C KD"), "White": getHand("2C 2H 5S 9C KH"), };

const game14 = { "Black": getHand("1H 3D 3S 9C KD"), "White": getHand("2C 3H 3S 9C KH"), };

const game15 = { "Black": getHand("1H 2D 3S KC KD"), "White": getHand("3C 4H 5S KC KH"), };

const game16 = { "Black": getHand("2H 2D 5S 5C KD"), "White": getHand("1C 3H 3S 8C 8H"), };

const game17 = { "Black": getHand("2H 5D 5S 8C 8D"), "White": getHand("2C 2H 8S 8C AH"), };

const game18 = { "Black": getHand("2H 3D 3S 8C 8D"), "White": getHand("1C 3H 3S 8C 8H"), };

const game19 = { "Black": getHand("2H 2D 5S 5C KD"), "White": getHand("2C 2H 5S 5C KH"), };

const game20 = { "Black": getHand("2H 2D 2S 5C KD"), "White": getHand("1C 3H 8S 8C 8H"), };

const game21 = { "Black": getHand("2H 9D 9S 9C 8D"), "White": getHand("2C 8H 8S 8C AH"), };

const game22 = { "Black": getHand("2H 3D 8S 8C 8D"), "White": getHand("1C 3H 8S 8C 8H"), };

const game23 = { "Black": getHand("2H 2D 2S 5C KD"), "White": getHand("2C 2H 2S 5C KH"), };

const game24 = { "Black": getHand("1H 2D 3S 4C 5D"), "White": getHand("4C 5H 6S 7C 8H"), };

const game25 = { "Black": getHand("1H 2D 3S 4C 5D"), "White": getHand("TC JH QS KC AH"), };

const game26 = { "Black": getHand("4H 5D 6S 7C 8D"), "White": getHand("5C 6H 7S 8C 9H"), };

const game27 = { "Black": getHand("4H 5D 6S 7C 8D"), "White": getHand("4H 5D 6S 7C 8D"), };

const game28 = { "Black": getHand("1D 2D 2D 4D 5D"), "White": getHand("2S 5S 6S 7S 8S"), };

const game29 = { "Black": getHand("1D 2D 2D 4D JD"), "White": getHand("2S 5S 6S 7S 8S"), };

const game30 = { "Black": getHand("1D 2D 3D 4D 5D"), "White": getHand("1S 2S 3S 4S 5S"), };

const game31 = { "Black": getHand("2H 2H 2H 9H 9H"), "White": getHand("1H 1H 3H 3H 3H"), };

const game32 = { "Black": getHand("2H 2H 2H 9H 9H"), "White": getHand("2H 2H 2H 3H 3H"), };

const game33 = { "Black": getHand("2H 2H 2H 9H 9H"), "White": getHand("2H 2H 2H 9H 9H"), };

const game34 = { "Black": getHand("2H 2D 2S 2C KD"), "White": getHand("1C 8H 8S 8C 8H"), };

const game35 = { "Black": getHand("2H 9D 9S 9C 9D"), "White": getHand("8C 8H 8S 8C AH"), };

const game36 = { "Black": getHand("2H 8D 8S 8C 8D"), "White": getHand("1C 8H 8S 8C 8H"), };

const game37 = { "Black": getHand("2H 2D 2S 2C 2D"), "White": getHand("2C 2H 2S 2C 2H"), };

const game38 = { "Black": getHand("1D 2D 3D 4D 5D"), "White": getHand("2S 3S 4S 5S 6S"), };

const game39 = { "Black": getHand("7D 8D 9D TD JD"), "White": getHand("2S 3S 4S 5S 6S"), };

const game40 = { "Black": getHand("1D 2D 3D 4D 5D"), "White": getHand("1S 2S 3S 4S 5S"), };

module.exports = {
    game1, game1Sorted, game2, game3, game4, game5, game6, game7, game8, game9, game10, game11, game12, game13, game14, game15, game16, game17,
    game18, game19, game20, game21, game22, game23, game24, game25, game26, game27, game28, game29, game30, game31, game32, game33, game34,
    game35, game36, game37, game38, game39, game40, 
    hand1, hand2, hand3, hand4, hand5, hand6, hand7, hand9, hand10, hand11, hand12, hand13, hand14, hand15, hand16, hand17,
    hand18, hand19, hand21, hand22, hand23, hand24, hand25, hand26, hand27, hand29, hand30, hand32,
};
