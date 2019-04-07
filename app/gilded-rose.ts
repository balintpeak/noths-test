export class Item {
    public name: string
    public sellIn: number
    public quality: number

    public constructor (name: string, sellIn: number, quality: number) {
        this.name = name
        this.sellIn = sellIn
        this.quality = quality
    }
}

export class GildedRose {
    private items: Item[]

    private static GENERIC_QUALITY_DECREASE_BY = 1
    private static GENERIC_QUALITY_DECREASE_BY_EXPIRED = 2

    public constructor (items = [] as Item[]) {
        this.items = items
    }

    private static updateSellIn (sellIn: number): number {
        return sellIn - 1
    }

    private static getValidQuality (quality: number): number {
        let validQuality = quality

        if (validQuality < 0) {
            validQuality = 0
        } else if (validQuality > 50) {
            validQuality = 50
        }

        return validQuality
    }

    private static updateGenericQuality (sellIn: number, quality: number, decreaseBySellable: number = GildedRose.GENERIC_QUALITY_DECREASE_BY, decreaseByExpired: number = GildedRose.GENERIC_QUALITY_DECREASE_BY_EXPIRED): number {
        const delta = sellIn >= 0 ? -decreaseBySellable : -decreaseByExpired
        const updatedQuality = quality + delta

        return GildedRose.getValidQuality(updatedQuality)
    }

    private static updateAgedBrieQuality (quality: number): number {
        const updatedQuality = quality + 1

        return GildedRose.getValidQuality(updatedQuality)
    }

    private static updateBackstagePassQuality (sellIn: number, quality: number): number {
        let updatedQuality = quality + 1

        if (sellIn < 0) {
            updatedQuality = 0
        } else if (sellIn >= 5 && sellIn < 10) {
            updatedQuality = quality + 2
        } else if (sellIn >= 0 && sellIn < 5) {
            updatedQuality = quality + 3
        }

        return GildedRose.getValidQuality(updatedQuality)
    }

    private static updateConjuredQuality (sellIn: number, quality: number): number {
        return GildedRose.updateGenericQuality(sellIn, quality, GildedRose.GENERIC_QUALITY_DECREASE_BY * 2, GildedRose.GENERIC_QUALITY_DECREASE_BY_EXPIRED * 2)
    }

    private static updateQualityForItem (item: Item): Item {
        let { sellIn, quality } = item

        if (!item.name.includes('Sulfuras')) {
            sellIn = GildedRose.updateSellIn(sellIn)

            if (item.name.includes('Aged Brie')) {
                quality = GildedRose.updateAgedBrieQuality(quality)
            } else if (item.name.includes('Backstage pass')) {
                quality = GildedRose.updateBackstagePassQuality(sellIn, quality)
            } else if (item.name.includes('Conjured')) {
                quality = GildedRose.updateConjuredQuality(sellIn, quality)
            } else {
                quality = GildedRose.updateGenericQuality(sellIn, quality)
            }
        }

        return ({
            name: item.name,
            sellIn,
            quality,
        })
    }

    public updateQuality (): Item[] {
        this.items = this.items.map((item): Item => GildedRose.updateQualityForItem(item))

        return this.items
    }
}
