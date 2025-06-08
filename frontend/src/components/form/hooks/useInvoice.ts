import { useState } from "react"
import { createInvoice } from "../../../utils/createInvoice"
import { Info, Client, Service, Invoice } from "../types"


export const useInvoice = (url: string) => {

    const [error, setError] = useState<boolean>(false)
    const [invoice, setInvoice] = useState<Invoice>()
    const [status, setStatus] = useState({loading: false, success: false})
 
    const postInvoice = async (    
        info: Info | null, 
        client: Client | null, 
        services: Service[] | null, 
        date: string,
        total: number,
        tta: number,
        refetchInvoiceNumber: () => Promise<void>) => {

        setStatus({loading: true, success: false})

        try{
            const builtInvoice = createInvoice(info, client, services, date, total, tta)

            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(builtInvoice)
            })

            if(!res.ok) {
                setError(true)
                throw new Error("Request to server for invoice failed")
            }

            const jsonBody = await res.json() 

            setInvoice(jsonBody)
            setStatus((prev)=> ({...prev, success: true}))
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            } else {
                console.log("An unknown error occurred when trying to create invoice")
            }
        } finally {
            setStatus((prev)=> ({...prev, loading: false}))
            refetchInvoiceNumber()
        }
    }

    return {invoice, error, status, postInvoice}
}
