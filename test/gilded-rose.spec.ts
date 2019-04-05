/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from 'chai'
import { Item, GildedRose } from '../app/gilded-rose'

describe('Gilded Rose', function (): void {
    it('should degrade quality twice as fast, once the sell by date has passed', function (): void {
        const gildedRose = new GildedRose([new Item('generic item', 0, 20)])
        const updatedItems = gildedRose.updateQuality()

        expect(updatedItems[0].quality).to.equal(18)
    })

    it('should never have an item with negative quality', function (): void {
        const gildedRose = new GildedRose([new Item('generic item', 10, 0)])
        const updatedItems = gildedRose.updateQuality()

        expect(updatedItems[0].quality).to.equal(0)
    })

    it('should increase quality of "Aged Brie"', function (): void {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)])
        const updatedItems = gildedRose.updateQuality()

        expect(updatedItems[0].quality).to.equal(21)
    })

    it('should never increase quality above 50', function (): void {
        const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)])
        const updatedItems = gildedRose.updateQuality()

        expect(updatedItems[0].quality).to.equal(50)
    })

    describe('Sulfuras', function (): void {
        it('should not change quality when sellin is positive', function (): void {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(20)
        })

        it('should not change quality when sellin is zero', function (): void {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(20)
        })

        it('should not change quality when sellin is negative', function (): void {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(20)
        })
    })

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
