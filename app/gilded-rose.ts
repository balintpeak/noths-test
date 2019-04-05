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
        } else if (validQuality > 50) {
            validQuality = 50
        }

        return validQuality
    }

    public static updateGenericQuality (sellIn: number, quality: number): number {
        const delta = sellIn >= 0 ? -1 : -2
        const updatedQuality = quality + delta

        return GildedRose.getValidQuality(updatedQuality)
    }

    public static updateAgedBrieQuality (quality: number): number {
        const updatedQuality = quality + 1

        return GildedRose.getValidQuality(updatedQuality)
    }

    public static updateBackstagePassQuality (sellIn: number, quality: number): number {
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

    public static updateQualityForItem (item: Item): Item {
        let { sellIn, quality } = item

        if (!item.name.includes('Sulfuras')) {
            sellIn = GildedRose.updateSellIn(sellIn)

            if (item.name.includes('Aged Brie')) {
                quality = GildedRose.updateAgedBrieQuality(quality)
            } else if (item.name.includes('Backstage pass')) {
                quality = GildedRose.updateBackstagePassQuality(sellIn, quality)
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
