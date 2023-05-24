function percentageToPayFor(bookSet){
  const percentages = {
    1: 1,
    2: 0.95,
    3: 0.9,
    4: 0.8,
    5: 0.75,
  };
  return percentages[bookSet.length];
}

function priceFor(bookSet){
  return 8 * bookSet.length * percentageToPayFor(bookSet);
}

function bookSetsWithMinimumPrice(shoppingBasket){
  return shoppingBasket.reduce((booksSets, book) => insertNewBook(booksSets, book), []);
}

function insertNewBook(booksSets, book){
  const newBooksSets = [...booksSets];

  const setsWithoutTheBook = newBooksSets.filter(booksSet => !booksSet.includes(book));

  if(isEmpty(setsWithoutTheBook)){
    newBooksSets.push([book]);
  }else{
    const optimalSet = getOptimalSetForBook(setsWithoutTheBook, book);
    optimalSet.push(book);
  }

  return newBooksSets;
}

function isEmpty(array){
  return array.length === 0;
}

function getOptimalSetForBook(booksSets, book){
  const currentBooksSetsPrice = priceFor(booksSets);
  return booksSets.reduce((optimal, current) => setThatGivesMinimumPrice(optimal, current, book, currentBooksSetsPrice));
}

function setThatGivesMinimumPrice(set1, set2, book, currentBooksSetsPrice){
  const s  = [
    { 'set': set1, 'price': priceWithBookInSet(set1, book, currentBooksSetsPrice) }, 
    { 'set': set2, 'price': priceWithBookInSet(set2, book, currentBooksSetsPrice) }
  ];
  s.sort((a,b) => a.price - b.price );
  return s[0].set;
}

function priceWithBookInSet(set, book, currentBooksSetsPrice){
  return currentBooksSetsPrice - priceFor(set) + priceFor(set.concat(book))
}

function totalPriceShoppingBasket(shoppingBasket){
  const optimalBooksSets = bookSetsWithMinimumPrice(shoppingBasket);
  return optimalBooksSets.reduce((total, bookSet) => total + priceFor(bookSet), 0);
}

module.exports = {
  totalPriceShoppingBasket,
  bookSetsWithMinimumPrice
}
