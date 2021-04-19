import { useEffect, useRef } from 'react'

export default function useDocumentTitle(title, { retainOnMount = false } = {}) {
    const defaultTitle = useRef(document.title)

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        return () => {
            if (!retainOnMount) {
                document.title = defaultTitle.current
            }
        }
    }, [])
}