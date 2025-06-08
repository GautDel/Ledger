import { useEffect, useState } from "react";
import { Info } from "../types";

export function useInfo(url: string) {
    const [info, setInfo] = useState<Info | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchData = async () => {

            try{
                const res = await fetch(url)
                if (!res.ok) throw new Error("Failed to fetch user info")

                const data = await res.json()

                setInfo(data)
            } catch(error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("Unknown error occurred when fetching user info");
                }
            }
        }    

            fetchData()
    }, [url])

    return {info, error}
} 
