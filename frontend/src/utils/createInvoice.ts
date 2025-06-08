import { Client, Info, Invoice, Service } from "../components/form/types";

export const createInvoice = (
    info:Info | null, 
    client: Client | null, 
    services: Service[] | null, 
    date: string, 
    total: number, 
    tta: number
): Invoice => {
    if((info === null) || (client === null) || (services === null)) {
        throw new Error("missing invoice data")
    }

    return {info, client, services, date, total, tta}
}
