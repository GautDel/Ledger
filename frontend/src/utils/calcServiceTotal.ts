import {Service} from "../components/form/types"
import { strToFlt } from "./strToFlt"

export function calculateTotal(service: Partial<Service>):number {
    const price = strToFlt(service.price ?? 0)
    const qty = strToFlt(service.quantity ?? 0) 

    return price * qty
}
