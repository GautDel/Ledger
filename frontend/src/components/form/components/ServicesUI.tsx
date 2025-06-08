import React, { useEffect, useState } from "react";
import { strToFlt } from "../../../utils/strToFlt";
import { validateService } from "../../../utils/validateService"
import { useFormContext } from "../contexts/FormContext";
import { Service } from "../types";
import { AddServiceUI } from "./AddServiceUI";
import { SearchServicesUI } from "./SearchServicesUI";
import { ServiceSelectUI } from "./ServiceSelectUI";
import { ServicesListUI } from "./ServicesListUI";
import { initServiceState } from "../constants";
import { calculateTotal } from "../../../utils/calcServiceTotal";


export const ServicesUI = () => {
    const {
        updateTotalHandler,
        selectedServices,
        selectedServicesHandler,
        resetLangHandler,
    } = useFormContext()

    const [errors, setErrors] = useState<string[]>([])
    const [service, setService] = useState<Service>(initServiceState)

    useEffect(()=> {
        const totalPrice = selectedServices.reduce((acc, s) => {
            return acc + strToFlt(s.price) * strToFlt(s.quantity);
        }, 0);

        updateTotalHandler(totalPrice)

    }, [selectedServices])

    const removeService = (id: number) => {
        selectedServicesHandler((prev)=> prev.filter((_, i) => i !== id)) 
    }

    const selectedServiceHandler = (service: Service) => {
        setService(service)
    }

    const changeHandler = (
        e: React.ChangeEvent<HTMLInputElement> | 
            React.ChangeEvent<HTMLTextAreaElement>) => {
            const {name, value} = e.target
            const numericFields:(keyof Service)[] = ["price", "quantity"]
            const isNumeric = numericFields.includes(name as keyof Service)

            let nextValue: string | number
            if (isNumeric) {
                const num = parseFloat(value)
                nextValue = isNaN(num) ? 0 : num
            } else {
                nextValue = value
            }

               setService((prev) => {
                const updated = {
                    ...prev,
                    [name]: nextValue,
                    translated: 
                        name === "name" || name === "description" ? false : prev.translated
                };

                return {
                    ...updated,
                    total: calculateTotal(updated) 
                }
            });   
        }

        const addService = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()

            const validation = validateService(service)

            if (validation.isValid) {
                selectedServicesHandler((prev) => [...prev, service])
                setService(initServiceState)
                setErrors(validation.errors)
                resetLangHandler()
            } else {
                setErrors(validation.errors)
            }
        }
        const priceTypeHandler = (type: "hr" | "un" ) => {
            setService((prev) => ({
                ...prev,
                price_type: type
            }))
        }

    return (
        <div>
            <hr className="border-sky-7"/>
            <div className="uppercase flex font-bold 
            text-neutral-500 py-3">
                <p className="w-6/12 mr-7">Article</p> 
                <p className="w-1/12 text-right mr-10">€/Hr</p> 
                <p className="w-1/12 text-right mr-5">€/unit</p> 
                <p className="w-1/12 text-right mr-7">Qtté</p> 
                <p className="w-1/12 text-right">Total</p> 
            </div>
        <hr className="border-sky-7 mb-4"/>

        <div className="h-11 flex justify-between gap-4">
            <ServiceSelectUI selectedServiceHandler={selectedServiceHandler}/>
            <SearchServicesUI selectedServiceHandler={selectedServiceHandler}/>
        </div>

        <hr className="border-sky-7 my-4"/>

        <AddServiceUI 
        priceTypeHandler={priceTypeHandler}
        selectedServiceHandler={selectedServiceHandler}
        changeHandler={changeHandler} 
        addService={addService}
        service={service}/>

        {errors.map((error, i) => (
            <p key={i} className="text-red-600 mt-2">{error}</p>
        ))}
        <hr className="border-sky-7 my-4"/>

        <ServicesListUI 
        removeService={removeService}
        selectedServiceHandler={selectedServiceHandler}/>
        </div>
    )
}
