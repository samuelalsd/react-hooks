import { useMemo, useState } from 'react'
import { arr2map, obj2map } from '../libs/utils'

const defaultParams = {
    match_type: 'exact',
    case_sensitive: false,
    weight: 1
}

/**
 * Search through the properties of a given collection of items.
 * The function returns the items where matches were found, ordered by number of hits.
 * 
 * @param {Array|Object|Map} searchable 
 * @param {Array|Object} collection 
 * @returns 
 */
export function useSearch(searchableFields, collection) {
    const [expression, search] = useState('')
    const [fields, setFields] = useState(searchableFields)
    const searchable = useMemo(formatSearchable, [fields])
    const { matches, scores } = findMatches()

    function formatSearchable() {
        return formatFields(fieldsToMap(fields))
    }

    function formatFields(fields) {
        fields.forEach((params, field) => {
            fields.set(field, { ...defaultParams, ...params })
        })

        return fields
    }

    function fieldsToMap(fields) {
        if (fields instanceof Map) return fields
        if (Array.isArray(fields)) return arr2map(fields)
        if (typeof fields === 'object') return obj2map(fields)
        throw Error(`Searchable fields must an Array, Object or Map, received ${typeof fields}`)
    }

    function scoreItem(expression, obj, rules = searchable) {
        let matches = {}
        let hits = 0

        for (const [field, params] of rules.entries()) {
            const { match_type, case_sensitive, weight } = params
            let words = expression.trim()

            switch (match_type) {
                case 'exact': break
                case 'partial':
                    if (words.indexOf(' ') !== -1) {
                        words = words.split(' ').join('|')
                    }
                    break
                default:
                    throw new Error(`Match type is incorrect (${match_type})`)
            }

            field
                .split('.')
                .reduce((prev, prop) => {
                    const isCollection = prop.match(/\w+\[\]/gm)?.shift()
                    const propName = isCollection ? isCollection.match(/\w+/gm)?.shift() : prop

                    if (prev instanceof Array) {
                        matches[field] = prev.reduce((acc, nestedItem) => {
                            const rules = fieldsToMap({ [propName]: params })
                            const nestedItemScore = scoreItem(expression, nestedItem, rules)

                            acc.push(nestedItemScore)
                            hits += nestedItemScore.hits

                            return acc
                        }, [])
                    } else {
                        const patterns = new RegExp(`${words}`, `g${(case_sensitive ? '' : 'i')}`)

                        matches[field] = obj[field]?.match(patterns)
                        hits += matches[field] ? matches[field].length * weight : 0
                    }

                    return prev?.[propName] || prev
                }, obj)
        }

        return { matches, hits }
    }

    function findMatches() {
        let matches = []
        let scores = new Map()

        if (!expression) {
            return {
                matches: Array.from(collection),
                scores
            }
        }

        /* Compute scores and add items with matches to the result */
        scores = Array
            .from(collection)
            .reduce((prev, item) => {
                const itemScore = scoreItem(expression, item)
                if (itemScore.hits) {
                    prev.set(item, itemScore)
                    matches.push(item)
                }
                return prev
            }, scores)

        /* Put most relevant matches first (most hits) */
        matches.sort((a, b) => {
            const hits_a = scores.get(a)?.hits
            const hits_b = scores.get(b)?.hits

            if (hits_a === hits_b) return 0
            return hits_a < hits_b ? 1 : -1
        })

        return { matches, scores }
    }

    function setFieldParams(field, newParams) {
        setFields(prevFields => ({
            ...prevFields,
            [field]: {
                ...prevFields[field],
                ...newParams
            }
        }))
    }

    function setFieldMatchType(field, matchType) {
        setFieldParams(field, { match_type: matchType })
    }

    function setFieldCaseSensivity(field, sensitivity) {
        setFieldParams(field, { case_sensitive: sensitivity })
    }

    function setFieldWeight(field, weight) {
        setFieldParams(field, { weight: parseInt(weight) })
    }

    const memoizedResult = useMemo(() => ({
        searchable: Object.entries(
            Object.fromEntries(searchable)
        ),

        matches,
        scores,

        expression,
        search: keywords => (
            search(keywords.trim())
        ),

        setFields,
        setFieldParams,
        setFieldMatchType,
        setFieldCaseSensivity,
        setFieldWeight,

        getHits: item => (
            scores.get(item) ?? {
                hits: 0,
                matches: []
            }
        ),
    }), [matches, scores, fields])

    return memoizedResult
}