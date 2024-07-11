export class ArrayFunctions {

    static nestedFilter = (arr: any, filter: any) => {
        let fE = Object.entries(filter);  
        return arr.filter((f: any) => fE.every(([k,v]) => !v || (f[k].toString() === v && f[k].toString().includes(v))));
    }

    static insertItemAtIndex = (arr: any, index: number, newItem: any) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
    ]
}  