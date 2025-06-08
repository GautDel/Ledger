import { useEffect, useState } from "react"
import { Client } from "../types"


export function useClients(url: string) {
    const [clients, setClients] = useState<Client[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchClients = async () => {
            try {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error("Could not fetch clients")
                }

                const data = await res.json()

                setClients(data) 
            } catch(error) {
                if(error instanceof Error) {
                    setError(error.message) 
                } else {
                    setError("Unknown error occurred when trying to fetch clients")
                }
            }
        }

        fetchClients()

    }, [url])

    return {clients, error}
}
