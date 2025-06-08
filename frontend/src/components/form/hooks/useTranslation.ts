import { useState } from "react"
import { Service } from "../types"

export const useTranslation = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const postSTT = async (service: Service) => {
        try {
            setLoading(true)
            const res = await fetch("http://localhost:8090/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(service)
            })

            if(!res.ok) throw new Error("Failed to get translation")

            const data = await res.json()

            return data

        } catch(error) {
            if(error instanceof Error) {
                console.log("Failed to translate", error.message)
            } else {
                console.log("Error occurred trying to translate")
            }

        } finally {
            setLoading(false)
        }
    }

    return {loading, postSTT}
}
