const { expect } = require('chai');

const { 
    getCard, getHand, getGame, sortByValue, numberToValue, highCardInHand, highCardTie, genericPrint,
    firstPairInHand,pairTie,
    doublePairInHand, doublePairTie,
    threeInHand, threeTie,
    straightInHand,
    flushInHand,
    fullInHand, fullTie,
    fourInHand, fourTie,
    straightFlushInHand, straightAndFlushTie,
    rankHand, setWinner,
} = require('../src/code');

const fixture = require('./fixture');

describe("Kata #1 poker, refactor. Now it's personal", function() {
    describe("Parsing input", function() {
        describe("given a card, represented as [value][suit]", function() {
            it("an object with the value as a number and the suit is returned", function test_getCard() {
                expect(getCard("2H")).to.deep.equal({value: 2, suit: "H"});
                expect(getCard("3D")).to.deep.equal({value: 3, suit: "D"});
                expect(getCard("5S")).to.deep.equal({value: 5, suit: "S"});
                expect(getCard("TS")).to.deep.equal({value: 10, suit: "S"});
            });
        });

        describe("given a string with the cards separated by space", function() {
            it("an array contains the card objects is returned", function test_getHand() {
                const cards0 = "2H 3D 5S 9C KD";
                const cards1 = "2C 3H 4S 8C AH";
                
                expect(getHand(cards0)).to.deep.equal(
                    [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}]
                );
    
                expect(getHand(cards1)).to.deep.equal(
                    [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
                );
            });
        });

        describe("given a string containing the cards of two players(black & white)", function() {
            it("a object with the hand representation of the two players is returned)", function test_getGame() {
                const game1 = "Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH";
                const game2 = "Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S";
                
                expect(getGame(game1)).to.deep.equal(
                    {
                        "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                        "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
                    }
                );

                expect(getGame(game2)).to.deep.equal(
                    {
                        "Black": [{value: 2, suit: "H"}, {value: 4, suit: "S"}, {value: 4, suit: "C"}, {value: 2, suit: "D"}, {value: 4, suit: "H"}],
                        "White": [{value: 2, suit: "S"}, {value: 8, suit: "S"}, {value: 14, suit: "S"}, {value: 12, suit: "S"}, {value: 3, suit: "S"}]
                    }
                );
            });    
        });
    }); 

    describe("Some important helpers",function() {
        describe("given a game object",function() {
            it("an object with the hand of each player sorted by value is returned",function test_sortByValue() {
                expect(sortByValue(fixture.game1)).to.deep.equal(fixture.game1Sorted); 
            });
        });

        describe("given a number representation if the card value,", function() {
            it("if the numbers is between 10 and 14, the value of the card is returned", function test_numberToValue() {
                const num1 = 10;
                const num2 = 11;
                const num3 = 12;
                const num4 = 13;
                const num5 = 14;
                const num6 = 9;
                expect(numberToValue(num1)).to.equal("T");
                expect(numberToValue(num2)).to.equal("J");
                expect(numberToValue(num3)).to.equal("Q");
                expect(numberToValue(num4)).to.equal("K");
                expect(numberToValue(num5)).to.equal("A");
                expect(numberToValue(num6)).to.equal(9);
            });
        });
    });

    describe("Game rules", function() {
        describe("High Card in hand", function() {
            describe("given a hand", function() {
                it("the value of the high card is returned", function() {
                    expect(highCardInHand(fixture.hand1)).to.deep.equal(13);
                    expect(highCardInHand(fixture.hand2)).to.deep.equal(14);
                });
            });

            describe("given a game where the two hands have the same highest value,", function() {
                it("the cards are ranked by the highest next value", function() {
                    expect(highCardTie(fixture.game2)).to.deep.equal({"isWinner":true, "winner": "White", high: 14});
                    expect(highCardTie(fixture.game3)).to.deep.equal({"isWinner":true, "winner": "White", high: 14});
                    expect(highCardTie(fixture.game4)).to.deep.equal({"isWinner":true, "winner": "White", high: 12});
                    expect(highCardTie(fixture.game5)).to.deep.equal({"isWinner":true, "winner": "White", high: 3});
                    expect(highCardTie(fixture.game6)).to.deep.equal({"isWinner":true, "winner": "Black", high: 2});
                });
                
                it("if all the next values are equal, there is no winner", function() {
                    expect(highCardTie(fixture.game7)).to.deep.equal({"isWinner":false});
                }); 
            });

            describe("given a game", function() {
                it("if there is a winner, the winner player and the highest card are shown", function() {
                    expect(genericPrint(fixture.game2, highCardTie, "high card")).to.equal(
                        "White wins. - with high card: A"
                    );
                });

                it("if there is a tie, a message shows 'Tie'", function() {
                    expect(genericPrint(fixture.game9, highCardTie, "high card")).to.equal(
                        "Tie."
                    );
                });
            });
        });

        describe("Pair", function() {
            describe("given a hand with at least a pair", function test_firstPairInHand() {
                it("the first pair is found and the position where the pair begins is returned", function() {
                    expect(firstPairInHand(fixture.hand5)).to.deep.equal({
                        "pair": true,
                        "beginning": 0
                    });
                    expect(firstPairInHand(fixture.hand6)).to.deep.equal({
                        "pair": true,
                        "beginning": 2
                    });
                    expect(firstPairInHand(fixture.hand7)).to.deep.equal({
                        "pair": false
                    });
                });
            }); 
        });
    });

    describe("Detect  first pair in hand", function() {
        it("Normal input", function() {
            expect(firstPairInHand(fixture.hand5)).to.deep.equal({
                "pair": true,
                "beginning": 0
            });
            expect(firstPairInHand(fixture.hand6)).to.deep.equal({
                "pair": true,
                "beginning": 2
            });
            expect(firstPairInHand(fixture.hand7)).to.deep.equal({
                "pair": false
            });
        });
    });

    describe("Pair tie", function() {
        it("Normal input", function() {
            expect(pairTie(fixture.game10)).to.deep.equal({"isWinner":true, "winner": "White", high: 8});
            expect(pairTie(fixture.game11)).to.deep.equal({"isWinner":true, "winner": "White", high: 14});
            expect(pairTie(fixture.game12)).to.deep.equal({"isWinner":true, "winner": "Black", high: 9});
            expect(pairTie(fixture.game13)).to.deep.equal({"isWinner": false});
            expect(pairTie(fixture.game14)).to.deep.equal({"isWinner":true, "winner": "White", high: 2});
            expect(pairTie(fixture.game15)).to.deep.equal({"isWinner":true, "winner": "White", high: 5});
        });

        describe("Print tie", function() {
            it("Normal input", function() {
                expect(genericPrint(fixture.game10, pairTie, "pair")).equal("White wins. - with pair: 8");
                expect(genericPrint(fixture.game11, pairTie, "pair")).equal("White wins. - with pair: A");
                expect(genericPrint(fixture.game12, pairTie, "pair")).equal("Black wins. - with pair: 9");
                expect(genericPrint(fixture.game13, pairTie, "pair")).equal("Tie.");
                expect(genericPrint(fixture.game14, pairTie, "pair")).equal("White wins. - with pair: 2");
                expect(genericPrint(fixture.game15, pairTie, "pair")).equal("White wins. - with pair: 5");
            });
        });


        describe("Detect double pair in hand", function() {
            it("Normal input", function() {
                expect(doublePairInHand(fixture.hand9)).to.deep.equal({
                    "doublePair": true,
                    "beginningLowest": 0,
                    "beginningHighest": 2
                });
                expect(doublePairInHand(fixture.hand10)).to.deep.equal({
                    "doublePair": true,
                    "beginningLowest": 1,
                    "beginningHighest": 3
                });
                expect(doublePairInHand(fixture.hand11)).to.deep.equal({
                    "doublePair": false
                });
                expect(doublePairInHand(fixture.hand12)).to.deep.equal({
                    "doublePair": true,
                    "beginningLowest": 0,
                    "beginningHighest": 3
                });
            });
        });
    });

    describe("Double pair tie", function() {
        it("Normal input", function() {
            expect(doublePairTie(fixture.game16)).to.deep.equal({"isWinner":true, "winner": "White", high: 8});
            expect(doublePairTie(fixture.game17)).to.deep.equal({"isWinner":true, "winner": "Black", high: 5});
            expect(doublePairTie(fixture.game18)).to.deep.equal({"isWinner":true, "winner": "Black", high: 2});
            expect(doublePairTie(fixture.game19)).to.deep.equal({"isWinner": false});
        });
    });

    describe("Print double pair", function() {
        it("Normal input", function() {
            expect(genericPrint(fixture.game16, doublePairTie, "double pair")).to.equal("White wins. - with double pair: 8");
            expect(genericPrint(fixture.game17, doublePairTie, "double pair")).to.equal("Black wins. - with double pair: 5");
            expect(genericPrint(fixture.game18, doublePairTie, "double pair")).to.equal("Black wins. - with double pair: 2");
            expect(genericPrint(fixture.game19, doublePairTie, "double pair")).to.equal("Tie.");
        });
    });

    describe("Detect three of a kind", function() {
        it("Normal input", function() {
            expect(threeInHand(fixture.hand13)).to.deep.equal({
                "three": true,
                "beginning": 0
            });
            expect(threeInHand(fixture.hand14)).to.deep.equal({
                "three": true,
                "beginning": 1
            });
            expect(threeInHand(fixture.hand7)).to.deep.equal({
                "three": false
            });
        });
    });

    describe("Three tie", function() {
        it("Normal input", function() {
            expect(threeTie(fixture.game20)).to.deep.equal({"isWinner":true, "winner": "White", high: 8});
            expect(threeTie(fixture.game21)).to.deep.equal({"isWinner":true, "winner": "Black", high: 9});
            expect(threeTie(fixture.game22)).to.deep.equal({"isWinner":true, "winner": "Black", high: 2});
            expect(threeTie(fixture.game23)).to.deep.equal({"isWinner": false});
        });
    });

    describe("Print three", function() {
        it("Normal input", function() {
            expect(genericPrint(fixture.game20, threeTie, "three of a kind")).to.equal("White wins. - with three of a kind: 8");
            expect(genericPrint(fixture.game21, threeTie, "three of a kind")).to.equal("Black wins. - with three of a kind: 9");
            expect(genericPrint(fixture.game22, threeTie, "three of a kind")).to.equal("Black wins. - with three of a kind: 2");
            expect(genericPrint(fixture.game23, threeTie, "three of a kind")).to.equal("Tie.");
        });
    });

    describe("Detect straight", function() {
        it("Normal input", function() {
            expect(straightInHand(fixture.hand15)).to.equal(false);
            expect(straightInHand(fixture.hand16)).to.equal(true);
            expect(straightInHand(fixture.hand17)).to.equal(true);
        });
    });

    describe("Straight tie", function() {
        it("Normal input", function() {
            expect(straightAndFlushTie(fixture.game24)).to.deep.equal({"isWinner":true, "winner": "White", high: 8});
            expect(straightAndFlushTie(fixture.game25)).to.deep.equal({"isWinner":true, "winner": "White", high: 14});
            expect(straightAndFlushTie(fixture.game26)).to.deep.equal({"isWinner":true, "winner": "White", high: 9});
            expect(straightAndFlushTie(fixture.game27)).to.deep.equal({"isWinner":false});
        });
    });

    describe("Print straight", function() {
        it("Normal input", function() {
            expect(genericPrint(fixture.game24, straightAndFlushTie, "straight")).to.equal("White wins. - with straight: 8");
            expect(genericPrint(fixture.game25, straightAndFlushTie, "straight")).to.equal("White wins. - with straight: A");
            expect(genericPrint(fixture.game26, straightAndFlushTie, "straight")).to.equal("White wins. - with straight: 9");
            expect(genericPrint(fixture.game27, straightAndFlushTie, "straight")).to.equal("Tie.");

        });
    });

    describe("Detect flush", function() {
        it("Normal input", function() {
            expect(flushInHand(fixture.hand18)).to.equal(true);
            expect(flushInHand(fixture.hand19)).to.equal(true);
            expect(flushInHand(fixture.hand17)).to.equal(false);
        });
    });

    describe("Flush tie", function() {
        it("Normal input", function() {
            expect(straightAndFlushTie(fixture.game28)).to.deep.equal({"isWinner":true, "winner": "White", high: 8});
            expect(straightAndFlushTie(fixture.game29)).to.deep.equal({"isWinner":true, "winner": "Black", high: 11});
            expect(straightAndFlushTie(fixture.game30)).to.deep.equal({"isWinner":false});
        });
    });

    describe("Print flush", function() {
        it("Normal input", function() {
            expect(genericPrint(fixture.game28, straightAndFlushTie, "flush")).to.equal("White wins. - with flush: 8");
            expect(genericPrint(fixture.game29, straightAndFlushTie, "flush")).to.equal("Black wins. - with flush: J");
            expect(genericPrint(fixture.game30, straightAndFlushTie, "flush")).to.equal("Tie.");

        });
    });

    describe("Detect full house", function() {
        it("Normal input", function() {
            expect(fullInHand(fixture.hand21)).to.deep.equal({
                "full": true,
                "threeBeginning": 0,
                "pairBeginning": 3
            });
            expect(fullInHand(fixture.hand22)).to.deep.equal({
                "full": true,
                "threeBeginning": 2,
                "pairBeginning": 0
            });
            expect(fullInHand(fixture.hand23)).to.deep.equal({
                "full": false
            });
            expect(fullInHand(fixture.hand24)).to.deep.equal({
                "full": false
            });
        });
    });

    describe("Full house tie", function() {
        it("Normal input", function() {
            expect(fullTie(fixture.game31)).to.deep.equal({"isWinner":true, "winner": "White", high: 3});
            expect(fullTie(fixture.game32)).to.deep.equal({"isWinner":true, "winner": "Black", high: 9});
            expect(fullTie(fixture.game33)).to.deep.equal({"isWinner":false});
        });
    });

    describe("Print full", function() {
        it("Normal input", function() {
            expect(genericPrint(fixture.game31, fullTie, "full house")).to.deep.equal("White wins. - with full house: 3");
            expect(genericPrint(fixture.game32, fullTie, "full house")).to.deep.equal("Black wins. - with full house: 9");
            expect(genericPrint(fixture.game33, fullTie, "full house")).to.deep.equal("Tie.");

        });
    });

    describe("Detect four of a kind", function() {
        it("Normal input", function() {
            expect(fourInHand(fixture.hand25)).to.deep.equal({
                "four": true,
                "beginning": 0
            });
            expect(fourInHand(fixture.hand26)).to.deep.equal({
                "four": true,
                "beginning": 1
            });
            expect(fourInHand(fixture.hand7)).to.deep.equal({
                "four": false
            });
        });
    });

    describe("Four tie", function() {
        it("Normal input", function() {
            expect(fourTie(fixture.game34)).to.deep.equal({"isWinner":true, "winner": "White", high: 8});
            expect(fourTie(fixture.game35)).to.deep.equal({"isWinner":true, "winner": "Black", high: 9});
            expect(fourTie(fixture.game36)).to.deep.equal({"isWinner":true, "winner": "Black", high: 2});
            expect(fourTie(fixture.game37)).to.deep.equal({"isWinner": false});
        });
    });

    describe("Print four", function() {
        it("Normal input", function() {
            expect(genericPrint(fixture.game34, fourTie, "four of a kind")).to.equal("White wins. - with four of a kind: 8");
            expect(genericPrint(fixture.game35, fourTie, "four of a kind")).to.equal("Black wins. - with four of a kind: 9");
            expect(genericPrint(fixture.game36, fourTie, "four of a kind")).to.equal("Black wins. - with four of a kind: 2");
            expect(genericPrint(fixture.game37, fourTie, "four of a kind")).to.equal("Tie.");
        });
    });

    describe("Detect straight flush", function() {
        it("Normal input", function() {
            expect(straightFlushInHand(fixture.hand27)).to.equal(true);
            expect(straightFlushInHand(fixture.hand19)).to.equal(true);
            expect(straightFlushInHand(fixture.hand29)).to.equal(false);
            expect(straightFlushInHand(fixture.hand30)).to.equal(false);
        });
    });

    describe("Straight Flush tie", function() {
        it("Normal input", function() {
            expect(straightAndFlushTie(fixture.game38)).to.deep.equal({"isWinner":true, "winner": "White", high: 6});
            expect(straightAndFlushTie(fixture.game39)).to.deep.equal({"isWinner":true, "winner": "Black", high: 11});
            expect(straightAndFlushTie(fixture.game40)).to.deep.equal({"isWinner":false});
        });
    });

    describe("Print straight flush", function() {
        it("Normal input", function() {
            expect(genericPrint(fixture.game38, straightAndFlushTie, "flush")).to.equal("White wins. - with flush: 6");
            expect(genericPrint(fixture.game39, straightAndFlushTie, "flush")).to.equal("Black wins. - with flush: J");
            expect(genericPrint(fixture.game40, straightAndFlushTie, "flush")).to.equal("Tie.");

        });
    });

    describe("Rank hand", function() {
        it("Normal input", function() {

            expect(rankHand(fixture.hand27)).to.equal(8);

            expect(rankHand(fixture.hand32)).to.equal(7);

            expect(rankHand(fixture.hand21)).to.equal(6);
            expect(rankHand(fixture.hand22)).to.equal(6);

            expect(rankHand(fixture.hand18)).to.equal(5);

            expect(rankHand(fixture.hand16)).to.equal(4);
            expect(rankHand(fixture.hand17)).to.equal(4);

            expect(rankHand(fixture.hand13)).to.equal(3);
            expect(rankHand(fixture.hand14)).to.equal(3);
                
            expect(rankHand(fixture.hand9)).to.equal(2);
            expect(rankHand(fixture.hand10)).to.equal(2);

            expect(rankHand(fixture.hand5)).to.equal(1);
            expect(rankHand(fixture.hand6)).to.equal(1);

            expect(rankHand(fixture.hand1)).to.equal(0);
            expect(rankHand(fixture.hand2)).to.equal(0);

        });
    });

    describe("Set winner", function() {
        it("Normal input", function() {
            const game1 = getGame("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH");
            const game2 = getGame("Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S");
            const game3 = getGame("Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C KH");
            const game4 = getGame("Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH");
            const game5 = getGame("Black: 2H 2D 2S 2C 3D  White: 1A 2A 3A 4A 5A");

            expect(setWinner(sortByValue(game1))).to.equal("White wins. - with high card: A");
            expect(setWinner(sortByValue(game2))).to.equal("Black wins. - with full house: 4 over 2");
            expect(setWinner(sortByValue(game3))).to.equal("Black wins. - with high card: 9");
            expect(setWinner(sortByValue(game4))).to.equal("Tie.");
            expect(setWinner(sortByValue(game5))).to.equal("White wins. - with straight flush");
        });
    });
});
