import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, timeout: number): T => {
    const [state, setState] = useState<T>(value)

    useEffect(()=> {
        const debouncer = setTimeout(()=>{
            setState(value)
        },timeout)

        return () => clearTimeout(debouncer)
    }, [value, timeout]) 

    return state
}
