interface ICard {
    id: string
    name: string
    value: number
}

const Cards: ICard[] = [
    {id: 'pc05', name: '.5', value: 0.5},
    {id: 'pc1', name: '1', value: 1},
    {id: 'pc2', name: '2', value: 2},
    {id: 'pc3', name: '3', value: 3},
    {id: 'pc5', name: '5', value: 5},
    {id: 'pc8', name: '8', value: 8},
    {id: 'pc13', name: '13', value: 13},
    {id: 'pc100', name: '100', value: 100},
    {id: 'pcq', name: '?', value: 0},
    {id: 'pcinf', name: '∞', value: Infinity}
]

export default Cards