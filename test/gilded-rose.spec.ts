/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from 'chai'
import { Item, GildedRose } from '../app/gilded-rose'

describe('Gilded Rose', function (): void {
    describe('Generic item', function (): void {
        it('should decrease sellin by one', function (): void {
            const gildedRose = new GildedRose([
                new Item('generic item', 1, 20),
                new Item('generic item', 0, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].sellIn).to.equal(0)
            expect(updatedItems[1].sellIn).to.equal(-1)
        })

        it('should decrease quality by one, when the sell by date has not yet passed', function (): void {
            const gildedRose = new GildedRose([new Item('generic item', 2, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(19)
        })

        it('should decrease quality twice as fast, once the sell by date has passed', function (): void {
            const gildedRose = new GildedRose([
                new Item('generic item', 0, 20),
                new Item('generic item', -1, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(18)
            expect(updatedItems[1].quality).to.equal(18)
        })

        it('should never have an item with negative quality', function (): void {
            const gildedRose = new GildedRose([new Item('generic item', 10, 0)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(0)
        })
    })

    describe('Aged Brie', function (): void {
        it('should increase quality', function (): void {
            const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(21)
        })

        it('should not have quality above 50', function (): void {
            const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(50)
        })
    })

    describe('Sulfuras', function (): void {
        it('should not change quality when sellin is positive', function (): void {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(80)
        })

        it('should not change quality when sellin is zero', function (): void {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(80)
        })

        it('should not change quality when sellin is negative', function (): void {
            const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 80)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(80)
        })
    })

    describe('Backstage passes', function (): void {
        it('should increase quality by 1 when sellin is bigger than 10', function (): void {
            const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(21)
        })

        it('should increase quality by 2 when 10 >= sellin > 5', function (): void {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
                new Item('Backstage passes to a TAFKAL80ETC concert', 6, 20),
                new Item('Backstage passes to a TAFKAL80ETC concert', 6, 50),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(22)
            expect(updatedItems[1].quality).to.equal(22)
            expect(updatedItems[2].quality).to.equal(50)
        })

        it('should increase quality by 3 when 0 < sellin <= 5', function (): void {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
                new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20),
                new Item('Backstage passes to a TAFKAL80ETC concert', 1, 50),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(23)
            expect(updatedItems[1].quality).to.equal(23)
            expect(updatedItems[2].quality).to.equal(50)
        })

        it('should set quality to 0 when sellin <= 0', function (): void {
            const gildedRose = new GildedRose([
                new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20),
                new Item('Backstage passes to a TAFKAL80ETC concert', -1, 20),
            ])
            const updatedItems = gildedRose.updateQuality()

            expect(updatedItems[0].quality).to.equal(0)
            expect(updatedItems[1].quality).to.equal(0)
        })
    })
})
