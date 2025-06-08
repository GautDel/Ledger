import { Client, Info, Service } from "../components/form/types"

type Errors = {
    errors: string[]
    isValid: boolean
}

export const validateInvoice = (
    client: Client | null, 
    services: Service[] | null, 
    info: Info | null, 
    total: number, 
    date: string
): Errors => {

    let errors: Errors = {errors: [], isValid: false}
    console.log(services)
    
    if(!client) errors.errors.push("A client must be selected") 
    if(!services || services.length === 0) errors.errors.push("Services must be added") 
    if(!info) errors.errors.push("Contractor info must be available") 
    if(!Number.isFinite(total) || total <= 0) errors.errors.push("A valid total is required") 
    if(!date.trim()) errors.errors.push("A valid date is required") 

    errors.isValid = errors.errors.length === 0

    return errors
}

