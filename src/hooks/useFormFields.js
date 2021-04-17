import { useCallback, useState } from 'react'

/**
 * React Custom Hook to handle a form field state
 * 
 * @param {Mixed} initialValue
 * @returns A `[value, setValue]` pair based of React.useState()
 */
export const useFormField = (initialValue = "") => {
    const [value, setValue] = useState(initialValue)
    const onChange = useCallback(e => setValue(e.target.value), [])

    return [value, onChange]
}

/**
 * React Custom Hook to handle multiple form fields states
 * 
 * @param {Object} initialValues 
 * @returns An object composed of following properties
 * 1. `formFields` contains all the fields and their respective value.
 * 2. `onChangeHandler` updates a single field value and takes a field name as unique argument.
 *    It then returns a Closure containing the field name (`key`).
 *    This closure accept an event as unique argument and, When called, will update the corresponding field.
 * 3. `setFormFields` enables user to override all fields at once.
 */
export const useFormFields = (initialValues) => {
    const [formFields, setFormFields] = useState(initialValues)

    const onChangeHandler = (key, type = 'value') => e => {
        const value = type === 'file'
            ? e
            : e.target.value

        setFormFields(prevState => (
            { ...prevState, [key]: value }
        ))
    }

    return {
        formFields,
        onChangeHandler,
        setFormFields
    }
}