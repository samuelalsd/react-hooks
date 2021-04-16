export function arr2map(arr) {
    return arr.reduce((prev, current) => {
        prev.set(current, {})
        return prev
    }, new Map())
}

export function obj2map(obj) {
    if (!(obj instanceof Object)) throw Error(`obj2map() expects an object as argument, received ${typeof fields}`)
    return new Map(Object.entries(obj))
}

export function arr2set(arr) {
    return arr.reduce((prev, current) => {
        prev.add(current, {})
        return prev
    }, new Set())
}

export function obj2set(obj) {
    if (!(obj instanceof Object)) throw Error(`obj2set() expects an object as argument, received ${typeof fields}`)
    return new Set(Object.entries(obj))
}

export function nestedFromStringIndex(index, obj) {
    return index
        .split(".")
        .reduce((prev, current, i, arr) => {
            if (!(current in prev)) {
                arr.splice(1)
                return undefined
            }

            return prev[current]
        }, obj)
}