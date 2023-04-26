class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items){
    this.items = structuredClone(items);
  }
  updateQuality() {
    this.items = this.items.map((item) => this.calculateNewValueItem(item));
    return this.items;
  }
  calculateNewValueItem(item){
    const itemType = this.getItemType(item);

    if (itemType === 'Sulfuras') {
      return item;
    }

    item.sellIn -= 1;

    let qualityLoss = 0;
    //I thinks this is like the core functionality
    if (itemType != 'Aged Brie' && itemType != 'Backstage') {
      qualityLoss -= 1;
    } else {
      qualityLoss += 1;
      if (itemType == 'Backstage') {
        if (item.sellIn < 10) {
          qualityLoss += 1;
        }
        if (item.sellIn < 5) {
          qualityLoss += 1;
        }
      }
    }
    //New functionality
    if (itemType === 'Conjured') {
      qualityLoss -= 1;
    }
    
    if (item.sellIn <= 0) {
      qualityLoss = this.getQualityLossExpired(item, qualityLoss);
    }

    item.quality += qualityLoss;

    return this.setQualityLimits(item);
  }
  getItemType(item){
    const name = item.name.split(" ");
    if(name.slice(0,2).join(" ") === "Aged Brie"){
      return "Aged Brie";
    }
    return name[0].replace(',','');
  }
  setQualityLimits(item){
    item.quality = Math.min(item.quality, 50);
    item.quality = Math.max(item.quality, 0);
    return item;
  }
  getQualityLossExpired(item, qualityLoss){
    if(this.getItemType(item) === 'Backstage'){
      qualityLoss = -item.quality;
    } else {
      qualityLoss *= 2;
    }
    return qualityLoss;
  }
}
module.exports = {
  Item,
  Shop
}
