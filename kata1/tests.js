import { it, describe } from "mocha";
import { expect } from "chai";
import * as functions from "./code";

describe("Kata 1 tests", () => {
    describe("Get card", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let card0 = "2H";
            let card1 = "3D";
            let card2 = "5S";
            expect(functions.getCard(card0)).to.deep.equal({value: 2, suit: "H"});
            expect(functions.getCard(card1)).to.deep.equal({value: 3, suit: "D"});
            expect(functions.getCard(card2)).to.deep.equal({value: 5, suit: "S"});
        });
    });

    describe("Get hand", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let cards0 = "2H 3D 5S 9C KD";
            let cards1 = "2C 3H 4S 8C AH";
            
            expect(functions.getHand(cards0)).to.deep.equal(
                [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}]
            );

            expect(functions.getHand(cards1)).to.deep.equal(
                [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            );
        });
    });
    describe("Value as number", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let suit1 = "T";
            let suit2 = "J";
            let suit3 = "Q";
            let suit4 = "K";
            let suit5 = "A";
            let suit6 = 9;
            
            expect(functions.valueAsNumber(suit1)).to.eqls(10);
            expect(functions.valueAsNumber(suit2)).to.eqls(11);
            expect(functions.valueAsNumber(suit3)).to.eqls(12);
            expect(functions.valueAsNumber(suit4)).to.eqls(13);
            expect(functions.valueAsNumber(suit5)).to.eqls(14);
            expect(functions.valueAsNumber(suit6)).to.eqls(9);
        });
    });
    describe("Get game", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = "Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH";
            let game2 = "Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S";
            
            expect(functions.getGame(game1)).to.deep.equal(
                {
                    "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
                }
            );

            expect(functions.getGame(game2)).to.deep.equal(
                {
                    "Black": [{value: 2, suit: "H"}, {value: 4, suit: "S"}, {value: 4, suit: "C"}, {value: 2, suit: "D"}, {value: 4, suit: "H"}],
                    "White": [{value: 2, suit: "S"}, {value: 8, suit: "S"}, {value: 14, suit: "S"}, {value: 12, suit: "S"}, {value: 3, suit: "S"}]
                }
            );

        });
    });
    describe("Sort by value",() => {
        //TODO: abnormal input
        it("Normal input",() => {
            let game1 =  {
                "Black": [{value: 3, suit: "D"}, {value: 2, suit: "H"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 4, suit: "S"}, {value: 3, suit: "H"}, {value: 2, suit: "C"}, {value: 14, suit: "H"}, {value: 8, suit: "C"}]
            }; 
            expect(functions.sortByValue(game1)).to.deep.equal(
                {
                    "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
                }
            ); 
        });
    });
    describe("Create game object", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let black1 = [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let white1 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            
            let black2 = [{value: 2, suit: "H"}, {value: 4, suit: "S"}, {value: 4, suit: "C"}, {value: 2, suit: "D"}, {value: 4, suit: "H"}];
            let white2 = [{value: 2, suit: "S"}, {value: 8, suit: "S"}, {value: 14, suit: "S"}, {value: 12, suit: "S"}, {value: 3, suit: "S"}];
            
            expect(functions.createGame(black1, white1)).to.deep.equal(
                {
                    "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
                }
            );
            expect(functions.createGame(black2, white2)).to.deep.equal(
                {
                    "Black": [{value: 2, suit: "H"}, {value: 4, suit: "S"}, {value: 4, suit: "C"}, {value: 2, suit: "D"}, {value: 4, suit: "H"}],
                    "White": [{value: 2, suit: "S"}, {value: 8, suit: "S"}, {value: 14, suit: "S"}, {value: 12, suit: "S"}, {value: 3, suit: "S"}]
                }
            );
        });
    });

    describe("High Card in hand", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let hand1 = [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand2 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.highCardInHand(hand1)).to.deep.equals(13);
            expect(functions.highCardInHand(hand2)).to.deep.equals(14);
        });
    });

    describe("High Card in hand", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let hand1 = [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand2 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.highCardInHand(hand1)).to.deep.equals(13);
            expect(functions.highCardInHand(hand2)).to.deep.equals(14);
        });
    });
    describe("High Card tie", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            };
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 4, suit: "C"}, {value: 4, suit: "H"}, {value: 4, suit: "S"}],
                "White": [{value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 8, suit: "S"}, {value: 12, suit: "S"}, {value: 14, suit: "S"}]
            };
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 4, suit: "C"}, {value: 4, suit: "H"}, {value: 14, suit: "S"}],
                "White": [{value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 8, suit: "S"}, {value: 12, suit: "S"}, {value: 14, suit: "S"}]
            };
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 8, suit: "C"}, {value: 12, suit: "H"}, {value: 14, suit: "S"}],
                "White": [{value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 8, suit: "S"}, {value: 12, suit: "S"}, {value: 14, suit: "S"}]
            };
            let game5 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 8, suit: "C"}, {value: 12, suit: "H"}, {value: 14, suit: "S"}],
                "White": [{value: 1, suit: "S"}, {value: 3, suit: "S"}, {value: 8, suit: "S"}, {value: 12, suit: "S"}, {value: 14, suit: "S"}]
            };
            let game6 = {
                "Black": [{value: 1, suit: "H"}, {value: 3, suit: "D"}, {value: 8, suit: "C"}, {value: 12, suit: "H"}, {value: 14, suit: "S"}],
                "White": [{value: 1, suit: "S"}, {value: 3, suit: "S"}, {value: 8, suit: "S"}, {value: 12, suit: "S"}, {value: 14, suit: "S"}]
            };
            let game7 = {
                "Black": [{value: 1, suit: "H"}, {value: 3, suit: "D"}, {value: 8, suit: "C"}, {value: 12, suit: "H"}, {value: 14, suit: "S"}],
                "White": [{value: 1, suit: "S"}, {value: 3, suit: "S"}, {value: 8, suit: "S"}, {value: 12, suit: "S"}, {value: 14, suit: "S"}]
            };
            expect(functions.highCardTie(game1)).to.eqls({"isWinner":true, "winner": "White", high: 14});
            expect(functions.highCardTie(game2)).to.eqls({"isWinner":true, "winner": "White", high: 14});
            expect(functions.highCardTie(game3)).to.eqls({"isWinner":true, "winner": "White", high: 12});
            expect(functions.highCardTie(game4)).to.eqls({"isWinner":true, "winner": "White", high: 3});
            expect(functions.highCardTie(game5)).to.eqls({"isWinner":true, "winner": "Black", high: 2});
            expect(functions.highCardTie(game6)).to.eqls({"isWinner":false});
        });
    });
    
    describe("High Card print", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            };
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "H"}]
            };
            expect(functions.genericPrint(game1, functions.highCardTie, "high card")).to.eqls(
                "White wins. - with high card: A"
            );

            expect(functions.genericPrint(game2, functions.highCardTie, "high card")).to.eqls(
                "Tie."
            );
        });
    });
    describe("Number to Value", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let num1 = 10;
            let num2 = 11;
            let num3 = 12;
            let num4 = 13;
            let num5 = 14;
            let num6 = 9;
            expect(functions.numberToValue(num1)).to.eqls("T");
            expect(functions.numberToValue(num2)).to.eqls("J");
            expect(functions.numberToValue(num3)).to.eqls("Q");
            expect(functions.numberToValue(num4)).to.eqls("K");
            expect(functions.numberToValue(num5)).to.eqls("A");
            expect(functions.numberToValue(num6)).to.eqls(9);
        });
    });

    describe("Detect  first pair in hand", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let hand1 = [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand2 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            let hand3 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 7, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.firstPairInHand(hand1)).to.deep.equals({
                "pair": true,
                "beginning": 0
            });
            expect(functions.firstPairInHand(hand2)).to.deep.equals({
                "pair": true,
                "beginning": 2
            });
            expect(functions.firstPairInHand(hand3)).to.deep.equals({
                "pair": false
            });
        });
    });

    describe("Pair tie", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 13, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "H"}]
            }
            let game5 = {
                "Black": [{value: 1, suit: "H"}, {value: 3, suit: "D"}, {value: 3, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "H"}]
            }
            let game6 = {
                "Black": [{value: 1, suit: "H"}, {value: 2, suit: "D"}, {value: 3, suit: "S"}, {value: 13, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 3, suit: "C"}, {value: 4, suit: "H"}, {value: 5, suit: "S"}, {value: 13, suit: "C"}, {value: 13, suit: "H"}]
            }
            expect(functions.pairTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 8});
            expect(functions.pairTie(game2)).to.deep.equals({"isWinner":true, "winner": "White", high: 14});
            expect(functions.pairTie(game3)).to.deep.equals({"isWinner":true, "winner": "Black", high: 9});
            expect(functions.pairTie(game4)).to.deep.equals({"isWinner": false});
            expect(functions.pairTie(game5)).to.deep.equals({"isWinner":true, "winner": "White", high: 2});
            expect(functions.pairTie(game6)).to.deep.equals({"isWinner":true, "winner": "White", high: 5});
        });

        describe("Print tie", () => {
            //TODO: abnormal input
            it("Normal input", () => {
                let game1 = {
                    "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
                }
                let game2 = {
                    "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
                }
                let game3 = {
                    "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 13, suit: "H"}]
                }
                let game4 = {
                    "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "H"}]
                }
                let game5 = {
                    "Black": [{value: 1, suit: "H"}, {value: 3, suit: "D"}, {value: 3, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "H"}]
                }
                let game6 = {
                    "Black": [{value: 1, suit: "H"}, {value: 2, suit: "D"}, {value: 3, suit: "S"}, {value: 13, suit: "C"}, {value: 13, suit: "D"}],
                    "White": [{value: 3, suit: "C"}, {value: 4, suit: "H"}, {value: 5, suit: "S"}, {value: 13, suit: "C"}, {value: 13, suit: "H"}]
                }
                expect(functions.genericPrint(game1, functions.pairTie, "pair")).eqls("White wins. - with pair: 8");
                expect(functions.genericPrint(game2, functions.pairTie, "pair")).eqls("White wins. - with pair: A");
                expect(functions.genericPrint(game3, functions.pairTie, "pair")).eqls("Black wins. - with pair: 9");
                expect(functions.genericPrint(game4, functions.pairTie, "pair")).eqls("Tie.");
                expect(functions.genericPrint(game5, functions.pairTie, "pair")).eqls("White wins. - with pair: 2");
                expect(functions.genericPrint(game6, functions.pairTie, "pair")).eqls("White wins. - with pair: 5");
            });
        });


        describe("Detect double pair in hand", () => {
            //TODO: abnormal input
            // It is not a problem to get only first pair because if there was another 
            it("Normal input", () => {
                let hand1 = [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}];
                let hand2 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}];
                let hand3 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 7, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}];
                let hand4 = [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 7, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}];
                expect(functions.doublePairInHand(hand1)).to.deep.equals({
                    "doublePair": true,
                    "beginningLowest": 0,
                    "beginningHighest": 2
                });
                expect(functions.doublePairInHand(hand2)).to.deep.equals({
                    "doublePair": true,
                    "beginningLowest": 1,
                    "beginningHighest": 3
                });
                expect(functions.doublePairInHand(hand3)).to.deep.equals({
                    "doublePair": false
                });
                expect(functions.doublePairInHand(hand4)).to.deep.equals({
                    "doublePair": true,
                    "beginningLowest": 0,
                    "beginningHighest": 3
                });
            });
        });
    });

    describe("Double pair tie", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 5, suit: "D"}, {value: 5, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "H"}]
            }
            expect(functions.doublePairTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 8});
            expect(functions.doublePairTie(game2)).to.deep.equals({"isWinner":true, "winner": "Black", high: 5});
            expect(functions.doublePairTie(game3)).to.deep.equals({"isWinner":true, "winner": "Black", high: 2});
            expect(functions.doublePairTie(game4)).to.deep.equals({"isWinner": false});
        });
    });

    describe("Print double pair", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 5, suit: "D"}, {value: 5, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "H"}]
            }
            expect(functions.genericPrint(game1, functions.doublePairTie, "double pair")).to.equals("White wins. - with double pair: 8");
            expect(functions.genericPrint(game2, functions.doublePairTie, "double pair")).to.equals("Black wins. - with double pair: 5");
            expect(functions.genericPrint(game3, functions.doublePairTie, "double pair")).to.equals("Black wins. - with double pair: 2");
            expect(functions.genericPrint(game4, functions.doublePairTie, "double pair")).to.equals("Tie.");
        });
    });

    describe("Detect three of a kind", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let hand1 = [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand2 = [{value: 2, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            let hand3 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 7, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.threeInHand(hand1)).to.deep.equals({
                "three": true,
                "beginning": 0
            });
            expect(functions.threeInHand(hand2)).to.deep.equals({
                "three": true,
                "beginning": 1
            });
            expect(functions.threeInHand(hand3)).to.deep.equals({
                "three": false
            });
        });
    });

    describe("Three tie", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 9, suit: "D"}, {value: 9, suit: "S"}, {value: 9, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 2, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "H"}]
            }
            expect(functions.threeTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 8});
            expect(functions.threeTie(game2)).to.deep.equals({"isWinner":true, "winner": "Black", high: 9});
            expect(functions.threeTie(game3)).to.deep.equals({"isWinner":true, "winner": "Black", high: 2});
            expect(functions.threeTie(game4)).to.deep.equals({"isWinner": false});
        });
    });

    describe("Print three", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 9, suit: "D"}, {value: 9, suit: "S"}, {value: 9, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 2, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "H"}]
            }
            expect(functions.genericPrint(game1, functions.threeTie, "three of a kind")).to.equals("White wins. - with three of a kind: 8");
            expect(functions.genericPrint(game2, functions.threeTie, "three of a kind")).to.equals("Black wins. - with three of a kind: 9");
            expect(functions.genericPrint(game3, functions.threeTie, "three of a kind")).to.equals("Black wins. - with three of a kind: 2");
            expect(functions.genericPrint(game4, functions.threeTie, "three of a kind")).to.equals("Tie.");
        });
    });

    describe("Detect straight", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let hand1 = [{value: 1, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand2 = [{value: 1, suit: "C"}, {value: 2, suit: "H"}, {value: 3, suit: "S"}, {value: 4, suit: "C"}, {value: 5, suit: "H"}];
            let hand3 = [{value: 10, suit: "C"}, {value: 11, suit: "H"}, {value: 12, suit: "S"}, {value: 13, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.straightInHand(hand1)).to.equals(false);
            expect(functions.straightInHand(hand2)).to.equals(true);
            expect(functions.straightInHand(hand3)).to.equals(true);
        });
    });

    describe("Straight tie", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 1, suit: "H"}, {value: 2, suit: "D"}, {value: 3, suit: "S"}, {value: 4, suit: "C"}, {value: 5, suit: "D"}],
                "White": [{value: 4, suit: "C"}, {value: 5, suit: "H"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 1, suit: "H"}, {value: 2, suit: "D"}, {value: 3, suit: "S"}, {value: 4, suit: "C"}, {value: 5, suit: "D"}],
                "White": [{value: 10, suit: "C"}, {value: 11, suit: "H"}, {value: 12, suit: "S"}, {value: 13, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 4, suit: "H"}, {value: 5, suit: "D"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 5, suit: "C"}, {value: 6, suit: "H"}, {value: 7, suit: "S"}, {value: 8, suit: "C"}, {value: 9, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 4, suit: "H"}, {value: 5, suit: "D"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 4, suit: "H"}, {value: 5, suit: "D"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "D"}]
            }
            expect(functions.straightAndFlushTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 8});
            expect(functions.straightAndFlushTie(game2)).to.deep.equals({"isWinner":true, "winner": "White", high: 14});
            expect(functions.straightAndFlushTie(game3)).to.deep.equals({"isWinner":true, "winner": "White", high: 9});
            expect(functions.straightAndFlushTie(game4)).to.deep.equals({"isWinner":false});
        });
    });

    describe("Print straight", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 1, suit: "H"}, {value: 2, suit: "D"}, {value: 3, suit: "S"}, {value: 4, suit: "C"}, {value: 5, suit: "D"}],
                "White": [{value: 4, suit: "C"}, {value: 5, suit: "H"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 1, suit: "H"}, {value: 2, suit: "D"}, {value: 3, suit: "S"}, {value: 4, suit: "C"}, {value: 5, suit: "D"}],
                "White": [{value: 10, suit: "C"}, {value: 11, suit: "H"}, {value: 12, suit: "S"}, {value: 13, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 4, suit: "H"}, {value: 5, suit: "D"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 5, suit: "C"}, {value: 6, suit: "H"}, {value: 7, suit: "S"}, {value: 8, suit: "C"}, {value: 9, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 4, suit: "H"}, {value: 5, suit: "D"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 4, suit: "H"}, {value: 5, suit: "D"}, {value: 6, suit: "S"}, {value: 7, suit: "C"}, {value: 8, suit: "D"}]
            }
            expect(functions.genericPrint(game1, functions.straightAndFlushTie, "straight")).to.equals("White wins. - with straight: 8");
            expect(functions.genericPrint(game2, functions.straightAndFlushTie, "straight")).to.equals("White wins. - with straight: A");
            expect(functions.genericPrint(game3, functions.straightAndFlushTie, "straight")).to.equals("White wins. - with straight: 9");
            expect(functions.genericPrint(game4, functions.straightAndFlushTie, "straight")).to.equals("Tie.");

        });
    });

    describe("Detect flush", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let hand1 = [{value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 13, suit: "H"}];
            let hand2 = [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}];
            let hand3 = [{value: 10, suit: "C"}, {value: 11, suit: "H"}, {value: 12, suit: "S"}, {value: 13, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.flushInHand(hand1)).to.equals(true);
            expect(functions.flushInHand(hand2)).to.equals(true);
            expect(functions.flushInHand(hand3)).to.equals(false);
        });
    });

    describe("Flush tie", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 2, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}, {value: 7, suit: "S"}, {value: 8, suit: "S"}]
            }
            let game2 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 2, suit: "D"}, {value: 4, suit: "D"}, {value: 11, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}, {value: 7, suit: "S"}, {value: 8, suit: "S"}]
            }
            let game3 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 1, suit: "S"}, {value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}]
            }
            expect(functions.straightAndFlushTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 8});
            expect(functions.straightAndFlushTie(game2)).to.deep.equals({"isWinner":true, "winner": "Black", high: 11});
            expect(functions.straightAndFlushTie(game3)).to.deep.equals({"isWinner":false});
        });
    });

    describe("Print flush", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 2, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}, {value: 7, suit: "S"}, {value: 8, suit: "S"}]
            }
            let game2 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 2, suit: "D"}, {value: 4, suit: "D"}, {value: 11, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}, {value: 7, suit: "S"}, {value: 8, suit: "S"}]
            }
            let game3 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 1, suit: "S"}, {value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}]
            }
            expect(functions.genericPrint(game1, functions.straightAndFlushTie, "flush")).to.equals("White wins. - with flush: 8");
            expect(functions.genericPrint(game2, functions.straightAndFlushTie, "flush")).to.equals("Black wins. - with flush: J");
            expect(functions.genericPrint(game3, functions.straightAndFlushTie, "flush")).to.equals("Tie.");

        });
    });

    describe("Detect full house", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let hand1 = [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}];
            let hand2 = [{value: 1, suit: "H"}, {value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}];
            let hand3 = [{value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 3, suit: "H"}];
            let hand4 = [{value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 3, suit: "S"}, {value: 4, suit: "H"}, {value: 7, suit: "H"}];

            expect(functions.fullInHand(hand1)).to.deep.equals({
                "full": true,
                "threeBeginning": 0,
                "pairBeginning": 3
            });
            expect(functions.fullInHand(hand2)).to.deep.equals({
                "full": true,
                "threeBeginning": 2,
                "pairBeginning": 0
            });
            expect(functions.fullInHand(hand3)).to.deep.equals({
                "full": false
            });
            expect(functions.fullInHand(hand4)).to.deep.equals({
                "full": false
            });
        });
    });

    describe("Full house tie", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}],
                "White": [{value: 1, suit: "H"}, {value: 1, suit: "H"}, {value: 3, suit: "H"}, {value: 3, suit: "H"}, {value: 3, suit: "H"}]
            };
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}],
                "White": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 3, suit: "H"}, {value: 3, suit: "H"}]
            };
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}],
                "White": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}]
            };
            expect(functions.fullTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 3});
            expect(functions.fullTie(game2)).to.deep.equals({"isWinner":true, "winner": "Black", high: 9});
            expect(functions.fullTie(game3)).to.deep.equals({"isWinner":false});
        });
    });

    describe("Print full", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}],
                "White": [{value: 1, suit: "H"}, {value: 1, suit: "H"}, {value: 3, suit: "H"}, {value: 3, suit: "H"}, {value: 3, suit: "H"}]
            };
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}],
                "White": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 3, suit: "H"}, {value: 3, suit: "H"}]
            };
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}],
                "White": [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}]
            };
            expect(functions.genericPrint(game1, functions.fullTie, "full house")).to.deep.equals("White wins. - with full house: 3");
            expect(functions.genericPrint(game2, functions.fullTie, "full house")).to.deep.equals("Black wins. - with full house: 9");
            expect(functions.genericPrint(game3, functions.fullTie, "full house")).to.deep.equals("Tie.");

        });
    });

    describe("Detect four of a kind", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let hand1 = [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 2, suit: "C"}, {value: 13, suit: "D"}];
            let hand2 = [{value: 2, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}];
            let hand3 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 7, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.fourInHand(hand1)).to.deep.equals({
                "four": true,
                "beginning": 0
            });
            expect(functions.fourInHand(hand2)).to.deep.equals({
                "four": true,
                "beginning": 1
            });
            expect(functions.fourInHand(hand3)).to.deep.equals({
                "four": false
            });
        });
    });

    describe("Four tie", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 2, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 9, suit: "D"}, {value: 9, suit: "S"}, {value: 9, suit: "C"}, {value: 9, suit: "D"}],
                "White": [{value: 8, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 8, suit: "D"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 2, suit: "C"}, {value: 2, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 2, suit: "S"}, {value: 2, suit: "C"}, {value: 2, suit: "H"}]
            }
            expect(functions.fourTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 8});
            expect(functions.fourTie(game2)).to.deep.equals({"isWinner":true, "winner": "Black", high: 9});
            expect(functions.fourTie(game3)).to.deep.equals({"isWinner":true, "winner": "Black", high: 2});
            expect(functions.fourTie(game4)).to.deep.equals({"isWinner": false});
        });
    });

    describe("Print four", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 2, suit: "C"}, {value: 13, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game2 = {
                "Black": [{value: 2, suit: "H"}, {value: 9, suit: "D"}, {value: 9, suit: "S"}, {value: 9, suit: "C"}, {value: 9, suit: "D"}],
                "White": [{value: 8, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}]
            }
            let game3 = {
                "Black": [{value: 2, suit: "H"}, {value: 8, suit: "D"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "D"}],
                "White": [{value: 1, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}]
            }
            let game4 = {
                "Black": [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 2, suit: "C"}, {value: 2, suit: "D"}],
                "White": [{value: 2, suit: "C"}, {value: 2, suit: "H"}, {value: 2, suit: "S"}, {value: 2, suit: "C"}, {value: 2, suit: "H"}]
            }
            expect(functions.genericPrint(game1, functions.fourTie, "four of a kind")).to.equals("White wins. - with four of a kind: 8");
            expect(functions.genericPrint(game2, functions.fourTie, "four of a kind")).to.equals("Black wins. - with four of a kind: 9");
            expect(functions.genericPrint(game3, functions.fourTie, "four of a kind")).to.equals("Black wins. - with four of a kind: 2");
            expect(functions.genericPrint(game4, functions.fourTie, "four of a kind")).to.equals("Tie.");
        });
    });

    describe("Detect straight flush", () => {
        //TODO: abnormal input
        // It is not a problem to get only first pair because if there was another 
        it("Normal input", () => {
            let hand1 = [{value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 3, suit: "H"}, {value: 4, suit: "H"}, {value: 5, suit: "H"}];
            let hand2 = [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}];
            let hand3 = [{value: 10, suit: "C"}, {value: 11, suit: "C"}, {value: 12, suit: "C"}, {value: 13, suit: "C"}, {value: 14, suit: "H"}];
            let hand4 = [{value: 10, suit: "C"}, {value: 11, suit: "C"}, {value: 4, suit: "C"}, {value: 13, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.straightFlushInHand(hand1)).to.equals(true);
            expect(functions.straightFlushInHand(hand2)).to.equals(true);
            expect(functions.straightFlushInHand(hand3)).to.equals(false);
            expect(functions.straightFlushInHand(hand4)).to.equals(false);
        });
    });

    describe("Straight Flush tie", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}]
            }
            let game2 = {
                "Black": [{value: 7, suit: "D"}, {value: 8, suit: "D"}, {value: 9, suit: "D"}, {value: 10, suit: "D"}, {value: 11, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}]
            }
            let game3 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 1, suit: "S"}, {value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}]
            }
            expect(functions.straightAndFlushTie(game1)).to.deep.equals({"isWinner":true, "winner": "White", high: 6});
            expect(functions.straightAndFlushTie(game2)).to.deep.equals({"isWinner":true, "winner": "Black", high: 11});
            expect(functions.straightAndFlushTie(game3)).to.deep.equals({"isWinner":false});
        });
    });

    describe("Print straight flush", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}]
            }
            let game2 = {
                "Black": [{value: 7, suit: "D"}, {value: 8, suit: "D"}, {value: 9, suit: "D"}, {value: 10, suit: "D"}, {value: 11, suit: "D"}],
                "White": [{value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}, {value: 6, suit: "S"}]
            }
            let game3 = {
                "Black": [{value: 1, suit: "D"}, {value: 2, suit: "D"}, {value: 3, suit: "D"}, {value: 4, suit: "D"}, {value: 5, suit: "D"}],
                "White": [{value: 1, suit: "S"}, {value: 2, suit: "S"}, {value: 3, suit: "S"}, {value: 4, suit: "S"}, {value: 5, suit: "S"}]
            }
            expect(functions.genericPrint(game1, functions.straightAndFlushTie, "flush")).to.equals("White wins. - with flush: 6");
            expect(functions.genericPrint(game2, functions.straightAndFlushTie, "flush")).to.equals("Black wins. - with flush: J");
            expect(functions.genericPrint(game3, functions.straightAndFlushTie, "flush")).to.equals("Tie.");

        });
    });

    describe("Rank hand", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let hand1 = [{value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 3, suit: "H"}, {value: 4, suit: "H"}, {value: 5, suit: "H"}];

            let hand2 = [{value: 1, suit: "H"}, {value: 1, suit: "H"}, {value: 1, suit: "H"}, {value: 1, suit: "H"}, {value: 2, suit: "H"}];
            
            let hand3 = [{value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 9, suit: "H"}];
            let hand4 = [{value: 1, suit: "H"}, {value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}];

            let hand5 = [{value: 1, suit: "H"}, {value: 2, suit: "H"}, {value: 2, suit: "H"}, {value: 9, suit: "H"}, {value: 13, suit: "H"}];

            let hand6 = [{value: 1, suit: "C"}, {value: 2, suit: "H"}, {value: 3, suit: "S"}, {value: 4, suit: "C"}, {value: 5, suit: "H"}];
            let hand7 = [{value: 10, suit: "C"}, {value: 11, suit: "H"}, {value: 12, suit: "S"}, {value: 13, suit: "C"}, {value: 14, suit: "H"}];

            let hand8 = [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 2, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand9 = [{value: 2, suit: "C"}, {value: 8, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];

            let hand10 = [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 5, suit: "C"}, {value: 13, suit: "D"}];
            let hand11= [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 3, suit: "S"}, {value: 8, suit: "C"}, {value: 8, suit: "H"}];

            let hand12 = [{value: 2, suit: "H"}, {value: 2, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand13 = [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 8, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];

            let hand14 = [{value: 2, suit: "H"}, {value: 3, suit: "D"}, {value: 5, suit: "S"}, {value: 9, suit: "C"}, {value: 13, suit: "D"}];
            let hand15= [{value: 2, suit: "C"}, {value: 3, suit: "H"}, {value: 4, suit: "S"}, {value: 8, suit: "C"}, {value: 14, suit: "H"}];
            expect(functions.rankHand(hand1)).to.equals(8);

            expect(functions.rankHand(hand2)).to.equals(7);

            expect(functions.rankHand(hand3)).to.equals(6);
            expect(functions.rankHand(hand4)).to.equals(6);

            expect(functions.rankHand(hand5)).to.equals(5);

            expect(functions.rankHand(hand6)).to.equals(4);
            expect(functions.rankHand(hand7)).to.equals(4);

            expect(functions.rankHand(hand8)).to.equals(3);
            expect(functions.rankHand(hand9)).to.equals(3);
                
            expect(functions.rankHand(hand10)).to.equals(2);
            expect(functions.rankHand(hand11)).to.equals(2);

            expect(functions.rankHand(hand12)).to.equals(1);
            expect(functions.rankHand(hand13)).to.equals(1);

            expect(functions.rankHand(hand14)).to.equals(0);
            expect(functions.rankHand(hand15)).to.equals(0);

        });
    });

    describe("Set winner", () => {
        //TODO: abnormal input
        it("Normal input", () => {
            let game1 = "Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C AH";
            let game2 = "Black: 2H 4S 4C 2D 4H  White: 2S 8S AS QS 3S";
            let game3 = "Black: 2H 3D 5S 9C KD  White: 2C 3H 4S 8C KH";
            let game4 = "Black: 2H 3D 5S 9C KD  White: 2D 3H 5C 9S KH";
            let game5 = "Black: 2H 2D 2S 2C 3D  White: 1A 2A 3A 4A 5A";

            expect(functions.setWinner(functions.sortByValue(functions.getGame(game1)))).to.equals("White wins. - with high card: A");
            expect(functions.setWinner(functions.sortByValue(functions.getGame(game2)))).to.equals("Black wins. - with full house: 4 over 2");
            expect(functions.setWinner(functions.sortByValue(functions.getGame(game3)))).to.equals("Black wins. - with high card: 9");
            expect(functions.setWinner(functions.sortByValue(functions.getGame(game4)))).to.equals("Tie.");
            expect(functions.setWinner(functions.sortByValue(functions.getGame(game5)))).to.equals("White wins. - with straight flush");
        });
    });

    

});
