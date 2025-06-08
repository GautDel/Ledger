import {Service} from "../components/form/types"
export const validateService = (service: Service): 
    {isValid: boolean, errors: string[]} => {

    const errors: string[] = []

    if(!service.name?.trim()) errors.push("Name is required")
    if(!service.french_name?.trim()) errors.push("French name is required")
    if(!service.description?.trim()) errors.push("Description is required")
    if(!service.french_description?.trim()) errors.push("French description is required")

    if (!Number.isFinite(service.price) || service.price <= 0) {
        errors.push("Either price or hourly price must be provided.");
    }

    if (!Number.isFinite(service.quantity) || service.quantity <= 0) {
        errors.push("Quantity must be greater than zero.");
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}
