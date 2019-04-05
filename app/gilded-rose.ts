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

    public constructor (items = [] as Item[]) {
        this.items = items
    }

    public static updateSellIn (sellIn: number): number {
        return sellIn - 1
    }

    public static getValidQuality (quality: number): number {
        let validQuality = quality

        if (validQuality < 0) {
            validQuality = 0
        }

        if (validQuality > 50) {
            validQuality = 50
        }

        return validQuality
    }

    public static updateGenericQuality (sellIn: number, quality: number): number {
        const delta = sellIn >= 0 ? -1 : -2
        const updatedQuality = quality + delta

        return GildedRose.getValidQuality(updatedQuality)
    }
    }

    public static updateQualityForItem (item: Item): Item {
        let { sellIn, quality } = item

        if (!item.name.includes('Sulfuras')) {
            sellIn = GildedRose.updateSellIn(sellIn)
            quality = GildedRose.updateGenericQuality(sellIn, quality)
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
