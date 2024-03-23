import { useCallback, useRef } from "react"

export const useThrothling = (fn: (...args: unknown[]) => void, delay: number = 300) => {
    const isAllowed = useRef<boolean>(true)

    const cb = useCallback((...args: unknown[]) => {
        if (isAllowed.current) {
            fn(args)
            isAllowed.current = false
            setTimeout(() => {
                isAllowed.current = true
            }, delay)
        }
    }, [delay, fn])

    return cb
}