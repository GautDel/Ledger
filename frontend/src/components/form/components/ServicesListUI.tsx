import { formatCurrency } from "../../../utils/formatCurrency"
import { useFormContext } from "../contexts/FormContext"
import { Service } from "../types"

type Props = {
    removeService: (id: number) => void 
    selectedServiceHandler: (service: Service) => void
}

export const ServicesListUI = ({removeService, selectedServiceHandler}: Props) => {
    const {selectedServices, editStateHandler} = useFormContext()

    const editClickHandler = (i: number, service: Service) => {
        removeService(i)
        selectedServiceHandler(service)
        editStateHandler(true)
    }

    return (
        <ul className="flex flex-col text-neutral-600">{selectedServices.map((service, i) => (
            <li key={i} className="flex relative border-b border-sky-7 pb-4">
                <div className="flex flex-col absolute top-0 -left-7 gap-2">
                    <p className="bg-red-600 p-1 rounded"
                    onClick={() => removeService(i)}>
                        <svg className="text-white font-bold cursor-pointer" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </p>

                    <p className="bg-sky-11 p-1 rounded cursor-pointer" 
                    onClick={() => editClickHandler(i, service)}>
                    
                        <svg className="text-white font-bold"width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </p>       
                </div>

                <div className="w-7/12 break-words">
                    <p className="font-bold text-lg">{service.name}</p>
                    <p>{service.description}</p>
                    <hr className="border-t border-sky-7 my-4"/>
                    <p className="font-bold text-lg">{service.french_name}</p>
                    <p>{service.french_description}</p>
                </div>
                    {service.price_type === "hr" ?
                        <>
                            <p className="w-2/12 text-center">
                                {formatCurrency(service.price)}
                            </p>
                            <p className="w-2/12">&nbsp;</p>
                        </>
                        : 
                        <>
                            <p className="w-2/12">&nbsp;</p>
                            <p className="w-2/12 text-center">
                                {formatCurrency(service.price)}
                            </p>
                        </>
                    }
                    <p className="w-1/12 text-center">{service.quantity}</p>
                    <p className="w-2/12 text-right">
                    {formatCurrency(service.total)}</p>
            </li> 
             ))}
        </ul>
    )
}
