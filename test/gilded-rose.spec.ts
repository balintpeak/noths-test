/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from 'chai'
import { Item, GildedRose } from '../app/gilded-rose'

describe('Gilded Rose', function (): void {
    it('should work with no arguments', function (): void {
        const gildedRose = new GildedRose()
        const updatedItems = gildedRose.updateQuality()

        expect(updatedItems.length).to.equal(0)
    })

    describe('Generic item', function (): void {
        const itemName = 'generic item'

        it('should decrease sellin by one', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 1, 20),
                new Item(itemName, 0, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].sellIn).to.equal(0)
            expect(updatedItems[1].sellIn).to.equal(-1)
        })

        it('should decrease quality by one, when the sell by date has not yet passed', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 2, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(19)
        })

        it('should decrease quality twice as fast, once the sell by date has passed', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 0, 20),
                new Item(itemName, -1, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(18)
            expect(updatedItems[1].quality).to.equal(18)
        })

        it('should never have an item with negative quality', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 10, 0)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(0)
        })
    })

    describe('Aged Brie', function (): void {
        const itemName = 'Aged Brie'

        it('should decrease sellin by one', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 1, 20),
                new Item(itemName, 0, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].sellIn).to.equal(0)
            expect(updatedItems[1].sellIn).to.equal(-1)
        })

        it('should increase quality', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 10, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(21)
        })

        it('should not have quality above 50', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 10, 50)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(50)
        })
    })

    describe('Sulfuras', function (): void {
        const itemName = 'Sulfuras, Hand of Ragnaros'

        it('should not change sellin', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 10, 80)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].sellIn).to.equal(10)
        })

        it('should not change quality when sellin is positive', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 10, 80)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(80)
        })

        it('should not change quality when sellin is zero', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 0, 80)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(80)
        })

        it('should not change quality when sellin is negative', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, -1, 80)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(80)
        })
    })

    describe('Backstage passes', function (): void {
        const itemName = 'Backstage passes to a TAFKAL80ETC concert'

        it('should decrease sellin by one', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 1, 20),
                new Item(itemName, 0, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].sellIn).to.equal(0)
            expect(updatedItems[1].sellIn).to.equal(-1)
        })

        it('should increase quality by 1 when sellin is bigger than 10', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 11, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(21)
        })

        it('should increase quality by 2 when 10 >= sellin > 5', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 10, 20),
                new Item(itemName, 6, 20),
                new Item(itemName, 6, 50),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(22)
            expect(updatedItems[1].quality).to.equal(22)
            expect(updatedItems[2].quality).to.equal(50)
        })

        it('should increase quality by 3 when 0 < sellin <= 5', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 5, 20),
                new Item(itemName, 1, 20),
                new Item(itemName, 1, 50),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(23)
            expect(updatedItems[1].quality).to.equal(23)
            expect(updatedItems[2].quality).to.equal(50)
        })

        it('should set quality to 0 when sellin <= 0', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 0, 20),
                new Item(itemName, -1, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(0)
            expect(updatedItems[1].quality).to.equal(0)
        })
    })

    describe('Conjured items', function (): void {
        const itemName = 'Conjured Mana Cake'

        it('should decrease sellin by one', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 1, 20),
                new Item(itemName, 0, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].sellIn).to.equal(0)
            expect(updatedItems[1].sellIn).to.equal(-1)
        })

        it('should decrease in quality by 2 when sellin is positive', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 10, 20),
                new Item(itemName, 1, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(18)
            expect(updatedItems[1].quality).to.equal(18)
        })

        it('should decrease in quality by 4 when sellin is negative', function (): void {
            const gildedRose = new GildedRose([
                new Item(itemName, 0, 20),
                new Item(itemName, -1, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(16)
            expect(updatedItems[1].quality).to.equal(16)
        })

        it('should not have negative quality', function (): void {
            const gildedRose = new GildedRose([new Item(itemName, 10, 0)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(0)
        })
    })
})
