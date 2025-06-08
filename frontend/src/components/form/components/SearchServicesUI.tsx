import React, { useEffect, useState } from "react"
import { useFormContext } from "../contexts/FormContext"
import { Service } from "../types"

type Props = {
    selectedServiceHandler: (service: Service) => void
}
export const SearchServicesUI = ({
    selectedServiceHandler,
}: Props) => {
    const {searchTermHandler, searchedServices} = useFormContext()

    const [query, setQuery] = useState<string>("")
    const hasResults = searchedServices.length > 0;


    const serviceClickHandler = (service: Service) => {
        setQuery("")
        const modifiedService = {...service, quantity: 0}
        selectedServiceHandler(modifiedService)
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            searchTermHandler(e)
            setQuery(e.target.value)
    }

    return (
        <div className="border rounded border-sky-7 h-full 
        w-1/2 z-50">

        <input 
        type="text" 
        className="w-full h-full  placeholder-neutral-400 outline-none px-2"
        onChange={changeHandler}
        value={query}
        name="not-a-search-field"
        spellCheck={false}
        placeholder="Search services..."/>

        {hasResults && (
        <ul className="bg-white border border-sky-7 rounded mt-2 w-full">
            {searchedServices.map((service, i)=> (
                <li 
                className="p-2 border-b border-b-neutral-200 
                last-of-type:border-none cursor-pointer hover:bg-sky-4" 
                onClick={() => serviceClickHandler(service)}
                key={service.id}>{service.name}</li>
            ))}
        </ul>)}

        </div>
    )
}
