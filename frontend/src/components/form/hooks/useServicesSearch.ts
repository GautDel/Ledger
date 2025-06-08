import { useEffect, useState } from "react"
import { Service } from "../types"
import { useDebounce } from "./useDebounce"

export const useServicesSearch = (url: string, searchTerm: string) => {
    const [searchedServices, setSearchedServices] = useState<Service[]>([])
    const [error, setError] = useState<string | null>(null)

    const debouncedQuery = useDebounce(searchTerm, 300)
    
    useEffect(()=>{

        const searchServices = async () => {
            try {
                if(debouncedQuery === "") {
                    setSearchedServices([])
                    return
                }
                const res = await fetch(url + "?search=" + debouncedQuery) 

                if (!res.ok) {
                    throw new Error("Failed to fetch services via search")
                }

                const data = await res.json()
                setSearchedServices(data)     
            } catch(error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("An unknown error occurred")
                }
            }
        }

        searchServices()
    }, [url, debouncedQuery])


    return {searchedServices, error}
}
