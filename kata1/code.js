const suits = ["T", "J", "Q", "K", "A"];

const gamble = ["high card", "pair", "double pair", "three of a kind",  "straight", "flush", "full house", "four of a kinf", "straight flush"]
const tieFunctions = [highCardTie, pairTie, doublePairTie, threeTie, straightAndFlushTie, straightAndFlushTie, fullTie, fourTie, straightAndFlushTie]

export function getCard(cardText){
    return {value: valueAsNumber(cardText[0]), suit: cardText[1]};
}
export function getHand(handText){
    return handText.split(" ").map(getCard);
}
export function valueAsNumber(suit){
    if(isNaN(suit)){
        return suits.indexOf(suit) + 10;
    }
    return Number.parseInt(suit);
}
export function createGame(blackHand, whiteHand){
    return { "Black": blackHand, "White": whiteHand };
}
export function getGame(game){
    let hands = game.split("  ");
    let blackHand = getHand(hands[0].split(": ")[1]);
    let whiteHand = getHand(hands[1].split(": ")[1]);
    return createGame(blackHand, whiteHand);
}

export function sortByValue(game){//names??
    let blackHand = game["Black"].sort((a, b) => a.value - b.value);
    let whiteHand = game["White"].sort((a, b) => a.value - b.value);
    return createGame(blackHand, whiteHand);
}
export function numberToValue(number){
    if(9 < number && number < 15){
        return suits[number - 10];
    }
    return number;
}
export function highCardInHand(hand){
    //Assumed ordered cards
    return hand.pop().value;
}
export function highCardTie(game){
    //To functional
    let whiteHigh;
    let blackHigh;
    for (let i = game.Black.length; i > 0; i--) {
        whiteHigh = highCardInHand(game.White.slice(0, i));
        blackHigh = highCardInHand(game.Black.slice(0, i));
        if(whiteHigh != blackHigh)
            break;
        if(i == 1){
            return {"isWinner": false}
        }     
    }
    if (whiteHigh > blackHigh) {
        return {"isWinner":true, "winner": "White", high: whiteHigh};
    } 
    return {"isWinner":true, "winner": "Black", high: blackHigh};
}


export function firstPairInHand(hand){
    for (let index = 0; index < hand.length - 1; index++) {
        if(hand[index].value == hand[index + 1].value){
            return {
                "pair": true,
                "beginning": index
            };
        }
    }
    return {
        "pair": false
    };
}
export function pairTie(game){
    // Highest hand is pair assumed
    let whitePairBeginning = firstPairInHand(game.White).beginning;
    let blackPairBeginning = firstPairInHand(game.Black).beginning;
    if(game.White[whitePairBeginning].value == game.Black[blackPairBeginning].value){
        let subGame = createGame(
            game.Black.slice(0, blackPairBeginning).concat(game.Black.slice(blackPairBeginning + 2)),
            game.White.slice(0, whitePairBeginning).concat(game.White.slice(whitePairBeginning + 2))
        );
        return highCardTie(subGame);
    }
    if(game.White[whitePairBeginning].value > game.Black[blackPairBeginning].value){
        return {"isWinner": true, "winner": "White", high: game.White[whitePairBeginning].value};
    }
    return {"isWinner": true, "winner": "Black", high: game.Black[blackPairBeginning].value};
}
export function doublePairInHand(hand){
    
    const firstPair = firstPairInHand(hand);
    if (!firstPair.pair || firstPair.beginning  > 2){
        return {"doublePair": false}
    }
    const secondPair = firstPairInHand(hand.slice(firstPair.beginning + 1));
    if(secondPair.pair){
        return {
            "doublePair": true,
            "beginningLowest": firstPair.beginning,
            "beginningHighest": secondPair.beginning + firstPair.beginning + 1
        }
    }
    return {"doublePair": false}

}

export function doublePairTie(game){
    const whiteSecondPairBeginning = doublePairInHand(game.White).beginningHighest;
    const blackSecondPairBeginning = doublePairInHand(game.Black).beginningHighest;
    if(game.White[whiteSecondPairBeginning].value == game.Black[blackSecondPairBeginning].value){
        let subGame = createGame(
            game.Black.slice(0, blackSecondPairBeginning).concat(game.Black.slice(blackSecondPairBeginning + 2)),
            game.White.slice(0, whiteSecondPairBeginning).concat(game.White.slice(whiteSecondPairBeginning + 2))
        );
        return pairTie(subGame);
    }
    if(game.White[whiteSecondPairBeginning].value > game.Black[blackSecondPairBeginning].value){
        return {"isWinner": true, "winner": "White", high: game.White[whiteSecondPairBeginning].value};
    }
    return {"isWinner": true, "winner": "Black", high: game.Black[blackSecondPairBeginning].value};
}
export function genericPrint(game, tieFn, hand){
    const result = tieFn(game);
    if(result.isWinner){
        return result.winner + " wins. - with " + hand + ": " + numberToValue(result.high);
    }
    return "Tie.";
}
export function threeInHand(hand){
    for (let index = 0; index < 3; index++) {
        if(hand[index].value == hand[index + 1].value && hand[index].value == hand[index + 2].value){
            return {
                "three": true,
                "beginning": index
            };
        }
    }
    return {
        "three": false
    };
}
export function threeTie(game){
    const whiteThreeBeginning = threeInHand(game.White).beginning;
    const blackThreeBeginning = threeInHand(game.Black).beginning;

    if(game.White[whiteThreeBeginning].value == game.Black[blackThreeBeginning].value){
        let subGame = createGame(
            game.Black.slice(0, blackThreeBeginning).concat(game.Black.slice(blackThreeBeginning + 3)),
            game.White.slice(0, whiteThreeBeginning).concat(game.White.slice(whiteThreeBeginning + 3))
        );
        return highCardTie(subGame);
    }
    if(game.White[whiteThreeBeginning].value > game.Black[whiteThreeBeginning].value){
        return {"isWinner": true, "winner": "White", high: game.White[whiteThreeBeginning].value};
    }
    return {"isWinner": true, "winner": "Black", high: game.Black[blackThreeBeginning].value};
}
export function straightInHand(hand){
    // order in or matters because check if index is not the end of array
    return hand.every((current, index, array) => (index == array.length - 1 || current.value + 1 == array[index + 1].value));
}
export function straightAndFlushTie(game){
    // Assumed both tested straights or flush
    return highCardTie(game);
}
export function flushInHand(hand){
    return hand.every((current, index, array) => (current.suit == array[1].suit));

}
export function fullInHand(hand){
    const three = threeInHand(hand);
    if(three.three){
        const pair = firstPairInHand(hand.slice(0, three.beginning).concat(hand.slice(three.beginning + 3)));
        if (pair.pair){
            return {
                "full": true,
                "threeBeginning": three.beginning,
                "pairBeginning": (three.beginning + 3) % 5
            }
        }
    }
    return { "full": false }
}
export function fullTie(game){
   return threeTie(game);
}

export function fourInHand(hand){
    for (let index = 0; index < 2; index++) {
        if(hand[index].value == hand[index + 1].value && hand[index].value == hand[index + 2].value && hand[index].value == hand[index + 3].value){
            return {
                "four": true,
                "beginning": index
            };
        }
    }
    return {
        "four": false
    };
}
export function fourTie(game){
    const whiteThreeBeginning = fourInHand(game.White).beginning;
    const blackThreeBeginning = fourInHand(game.Black).beginning;

    if(game.White[whiteThreeBeginning].value == game.Black[blackThreeBeginning].value){
        let subGame = createGame([game.Black[(blackThreeBeginning + 4) % 5]],[game.White[(whiteThreeBeginning + 4) % 5]]);
        return highCardTie(subGame);
    }
    if(game.White[whiteThreeBeginning].value > game.Black[blackThreeBeginning].value){
        return {"isWinner": true, "winner": "White", high: game.White[whiteThreeBeginning].value};
    }
    return {"isWinner": true, "winner": "Black", high: game.Black[blackThreeBeginning].value};
}
export function straightFlushInHand(hand){
    return flushInHand(hand) && straightInHand(hand);
}
export function rankHand(hand){
    if(straightFlushInHand(hand)){
        return 8;
    }
    if(fourInHand(hand).four){
        return 7;
    }
    if(fullInHand(hand).full){
        return 6;
    }
    if(flushInHand(hand)){
        return 5;
    }
    if(straightInHand(hand)){
        return 4;
    }
    if(threeInHand(hand).three){
        return 3;
    }
    if(doublePairInHand(hand).doublePair){
        return 2;
    }
    if(firstPairInHand(hand).pair){
        return 1;
    }
    if(highCardInHand(hand)){
        return 0;
    }
}
export function setWinner(game){
    const blackGamble = rankHand(game.Black.slice(0));//Copy of array
    const whiteGamble = rankHand(game.White.slice(0));
    if (blackGamble == whiteGamble){
        return genericPrint(game, tieFunctions[blackGamble], gamble[blackGamble])
    } 
    if (blackGamble > whiteGamble) {
        return "Black wins. - with " + gamble[blackGamble] +  winMessage(blackGamble, game.Black);
    } else {
        return "White wins. - with " + gamble[whiteGamble] + winMessage(whiteGamble, game.White);
    }
}
export function winMessage(gamble, hand){
    let message = "";
    switch (gamble) {
        case 7:
            message = hand[fourInHand(hand).beginning].value;
            break;
        case 6:
            message = hand[fullInHand(hand).threeBeginning].value + " over " + hand[fullInHand(hand).pairBeginning].value;
            break;
        case 3:
            message = hand[threeInHand(hand).beginning].value;
            break;
        case 2:
            message = hand[doublePairInHand(hand).beginningHighest].value + " and " + hand[doublePairInHand(hand).beginningLowest].value;
            break;
        case 2:
            message = hand[firstPairInHand(hand).beginning].value;
            break;
    }
    return message == "" ? "" : ": " + message; 
}