import { useState } from "react"
import { initServiceState } from "../constants"
import { useFormContext } from "../contexts/FormContext"
import { Service } from "../types"
import { Loading } from "./Loading"

type Props = {
    selectedServiceHandler: (service: Service) => void
}
export const ServiceSelectUI = (
    {selectedServiceHandler}: Props

) => {
    const {services} = useFormContext()
    const [selectedID, setSelectedID] = useState<string>("")
    if(!services) return <Loading />

    const selectServiceHandler = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedService = services.find(
            (service) => (service.id === e.target.value))
        
        if(selectedService) {
            const modifiedService = {...selectedService, quantity: 0}
            selectedServiceHandler(modifiedService)
            setSelectedID("")
        } else {
            selectedServiceHandler(initServiceState)
        }
    }




    return (
                <div className="relative inline-block w-1/2">
                    <select name="services" 
                        value={selectedID}
                        onChange={selectServiceHandler}
                        className="border bg-transparent appearance-none h-full
                        w-full p-2 rounded border-sky-7 outline-none 
                        cursor-pointer text-neutral-600" 
                        id="services">
                        <option defaultValue="" value="">Choose a service</option> 
                        {services.map((service) =>(

                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                <div className="absolute right-3 top-1/2 transform 
                     -translate-y-1/2 pointer-events-none">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down text-sky-11"
                        viewBox="0 0 16 16"
                        >
                        <path d="M1 4.5A.5.5 0 0 1 1.5 4h13a.5.5 0 0 1 .354.854l-6.5 6.5a.5.5 0 0 1-.708 0l-6.5-6.5A.5.5 0 0 1 1 4.5z"/>
                        </svg>
                </div>
            </div>
    )
}
