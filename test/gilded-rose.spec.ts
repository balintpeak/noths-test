/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from 'chai'
import { Item, GildedRose } from '../app/gilded-rose'

describe('Gilded Rose', function (): void {
    it('should have the original tests pass (golden-master-text-test)', function (): void {
        const items = [
            new Item('+5 Dexterity Vest', 10, 20),
            new Item('Aged Brie', 2, 0),
            new Item('Elixir of the Mongoose', 5, 7),
            new Item('Sulfuras, Hand of Ragnaros', 0, 80),
            new Item('Sulfuras, Hand of Ragnaros', -1, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
        ]
        const expectedItems = [
            new Item('+5 Dexterity Vest', 9, 19),
            new Item('Aged Brie', 1, 1),
            new Item('Elixir of the Mongoose', 4, 6),
            new Item('Sulfuras, Hand of Ragnaros', 0, 80),
            new Item('Sulfuras, Hand of Ragnaros', -1, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 14, 21),
            new Item('Backstage passes to a TAFKAL80ETC concert', 9, 50),
            new Item('Backstage passes to a TAFKAL80ETC concert', 4, 50),
        ]
        const gildedRose = new GildedRose(items)
        const updatedItems = gildedRose.updateQuality()

        expect(items.length).to.equal(updatedItems.length)

        updatedItems.forEach((item, key): void => {
            const expectedItem = expectedItems[key]

            expect(item.sellIn).to.equal(expectedItem.sellIn)
            expect(item.quality).to.equal(expectedItem.quality)
        })
    })
})
