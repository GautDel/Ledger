import { Service } from "../components/form/types"

export const transError = (service: Service): {error: boolean, msg: string} => {
    let msg = ""
    let error = false 

    if(service.name === "" || service.description === "") {
        msg = "* All text fields must be filled before translation"
        error = true
    }

    return {error: error, msg: msg}
}
