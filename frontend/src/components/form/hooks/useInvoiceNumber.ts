import { useEffect, useState } from "react"

export const useInvoiceNumber = (url: string):{ 
    invoiceNum: string;
    refetchInvoiceNumber: () => Promise<void>
} => {
    const [invoiceNum, setInvoiceNum] = useState<string>("")

    useEffect(()=>{
        const getinvoiceNumber = async () => {
            try {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error("Failed to fetch invoice number")
                }

                const data = await res.json()
                setInvoiceNum(data)
            } catch(error) {
                if(error instanceof Error) {
                    console.log(error)
                } else {
                    console.log("Unexpected error occurred")
                }
            }
        }

        getinvoiceNumber()
    },[])

    const refetchInvoiceNumber = async () => {
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error("Failed to fetch invoice number")
            }

            const data = await res.json()
            setInvoiceNum(data)
        } catch(error) {
            if(error instanceof Error) {
                console.log(error)
            } else {
                console.log("Unexpected error occurred")
            }
        }
    }

    useEffect(() => {refetchInvoiceNumber()},[])
    
    return {invoiceNum, refetchInvoiceNumber}
}
