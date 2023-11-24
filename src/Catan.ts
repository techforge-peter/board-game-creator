export interface AxialCoordinates {
    q: number;
    r: number;
}

export type TileDefinition = {
    color: string
    count: number
}

export type Terrain = 'brick' | 'wood' | 'sheep' | 'wheat' | 'ore' | 'desert'

export const TILE_TYPES: Record<Terrain, TileDefinition> = {
    brick: {
        color: '#e07015',
        count: 3
    },
    wood: {
        color: '#009300',
        count: 4
    },
    sheep: {
        color: '#bee7be',
        count: 4
    },
    wheat: {
        color: '#ffe80d',
        count: 4
    },
    ore: {
        color: '#7a7a7a',
        count: 3
    },
    desert: {
        color: '#d5c49a',
        count: 1
    }
}

export interface Hex extends AxialCoordinates {
    terrain: Terrain
    num?: number
}

let tileTypes: Terrain[] = Object.keys(TILE_TYPES) as Terrain[];

const tileTerrains: Terrain[] = tileTypes.map((tileType: Terrain) => {
    const tileDef = TILE_TYPES[tileType]
    return Array.from({length: tileDef.count}, x => tileType)
}).flat()


const numbers = [
    2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12
];

function generateHexagonalLayout(size: number): Hex[] {
    const layout: Hex[] = [];

    const randomTiles = tileTerrains.slice()
    randomTiles.sort(() => Math.random() - 0.5)

    const randomNumbers = numbers.slice();
    randomNumbers.sort(() => Math.random() - 0.5)

    for (let q = -size; q <= size; q++) {
        const r1 = Math.max(-size, -q - size);
        const r2 = Math.min(size, -q + size);
        for (let r = r1; r <= r2; r++) {
            const terrain = randomTiles.pop();
            if (terrain) {
                layout.push({q: q, r: r, num: terrain !== 'desert' ? randomNumbers.pop() : undefined, terrain});
            }
        }
    }

    return layout;
}

type HexMap = {
    [q: number]: {
        [r: number]: Hex
    }
}

const getAboveRightNeighbour = (q: number, r: number) => {
    return {q: q + 1, r: r - 1}
}
const getRightNeighbour = (q: number, r: number) => {
    return {q: q + 1, r}
}
const getBelowRightNeighbour = (q: number, r: number) => {
    return {q: q, r: r + 1}
}

const sixesAndEights = [6, 8]
const testHexSixesAndEights = (a: Hex, b: Hex) => {
    if (!a || !b) {
        return false
    }

    return sixesAndEights.includes(a.num || -1) && sixesAndEights.includes(b.num || -1)
}

const testSameNumberNeighbour = (a: Hex, b: Hex) => {
    if (!a || !b) {
        return false
    }

    return a.num === b.num
}



const testLayout = (layout: Hex[]) => {
    const hexMap = layout.reduce((acc: HexMap, hex: Hex) => {
        const qMap = acc[hex.q] || (acc[hex.q] = {})
        qMap[hex.r] = hex
        return acc
    }, {})

    const getHex = ({q, r}: AxialCoordinates) => (hexMap[q] || {})[r]

    for (let hex of layout) {
        if (
            testHexSixesAndEights(hex, getHex(getAboveRightNeighbour(hex.q, hex.r))) ||
            testHexSixesAndEights(hex, getHex(getRightNeighbour(hex.q, hex.r))) ||
            testHexSixesAndEights(hex, getHex(getBelowRightNeighbour(hex.q, hex.r))) ||
            testSameNumberNeighbour(hex, getHex(getAboveRightNeighbour(hex.q, hex.r))) ||
            testSameNumberNeighbour(hex, getHex(getRightNeighbour(hex.q, hex.r))) ||
            testSameNumberNeighbour(hex, getHex(getBelowRightNeighbour(hex.q, hex.r)))
        ) {
            return false
        }
    }
    return true

}

export const getNewLayout = () => {
    let layout: Hex[] | undefined = undefined
    for (let i = 0; i < 500; i++) {
        layout = generateHexagonalLayout(2);
        if (testLayout(layout)) {
            console.log("Success on attempt", i + 1);
            break;
        }
    }
    return layout
}
