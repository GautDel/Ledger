import { useEffect, useState } from "react";
import { Service } from "../types";

export function useServices(url: string) {
    const [services, setServices] = useState<Service[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {

            try{
                const res = await fetch(url)
                if (!res.ok) throw new Error("Failed to fetch services")

                const data = await res.json()

                setServices(data)
            } catch(error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("Unknown error occurred when fetching services");
                }
            }
        }    

            fetchData()
    }, [url])

    return {services, error}
}
