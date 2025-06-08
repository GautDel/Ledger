import {Service} from "../components/form/types"

export const serviceError = (service: Service): boolean => {
    for(const key in service) {
        const value = service[key]

        if(value === "") {
            return true
        }

        if(key === "price" && value === 0) {
            return true
        }

        if(key === "quantity" && value === 0) {
            return true
        }
    }

    return false
}
