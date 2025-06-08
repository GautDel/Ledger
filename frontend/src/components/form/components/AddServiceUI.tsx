import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/formatCurrency"
import { transError } from "../../../utils/transError";
import { useFormContext } from "../contexts/FormContext";
import { useTranslation } from "../hooks/useTranslation";
import { Service } from "../types"
import { TranslateButton } from "./TranslateButton";
import { TranslatedIcon } from "./TranslatedIcon";

type Props = {
    selectedServiceHandler: (service: Service) => void
    changeHandler: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void; 
    addService: (e: React.MouseEvent<HTMLButtonElement>) => void;
    priceTypeHandler: (type: "hr" | "un") => void
    service: Service;
}

export const AddServiceUI = ({
    priceTypeHandler,
    selectedServiceHandler,
    changeHandler, 
    addService, 
    service
}:Props) => {
    const {
        editStateHandler,
        changeLangHandler, 
        lang, 
        editing, 
    } = useFormContext()
    const {loading, postSTT} = useTranslation()
    const [errorState, setErrorState] = useState<{error: boolean; msg: string}>({error: false, msg: ""})
    const {error, msg} = transError(service)
 
    const handlePriceChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const type = e.currentTarget.dataset.type;
        if(type === "hr" || type === "un"){
            priceTypeHandler(type)
        } 
    }

    const addServiceClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        addService(e)
        editStateHandler(false)
    }

    const transHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (error) {
            setErrorState({error: error, msg: msg})
            return
        }

        const translated = await postSTT(service)
        if (translated) {
            selectedServiceHandler({...translated, translated: true})
        }
        setErrorState({error: false, msg: ""})
    }

    return (
        <>
        {editing ? 
            <p className="mb-4 rounded bg-green-500 text-white w-fit 
            px-2 py-1 font-bold text-sm">Editing: {service.name}</p> 
                : null 
        }
        
        <div className="flex gap-4 relative">
        <div className="w-6/12">
        <input onChange={changeHandler} 
        name={lang ? "french_name" : "name"}
        value={lang ? service.french_name : service.name}
        className="border rounded border-sky-7 mb-4 w-full outline-none 
        px-2 placeholder-neutral-400 h-12"
        type="text" 
        placeholder="Name"/>

        <textarea className="border rounded border-sky-7 pt-2
        w-full outline-none px-2 placeholder-neutral-400"
        onChange={changeHandler}
        rows={4}
        name={lang ? "french_description" : "description"}
        value={lang ? service.french_description : service.description}
        placeholder="Description"
        ></textarea>
        {errorState.error ? <p className="text-red-600">{errorState.msg}</p> : null}
        </div>
        <div className="w-1/2 flex flex-col align-end justify-between">
        <div className="flex gap-x-4">
        {service.price_type === "hr" ? 
            <>
                <input className="border rounded border-sky-7 
                w-5/12 h-12 text-center outline-none px-2 placeholder-neutral-400"
                name="price"
                value={service.price || 0}
                onChange={changeHandler}
                type="text" 
                placeholder="price"/>
                <div className="px-2 w-5/12 h-12"></div>
            </>
        :  
            <>
                <div className="px-2 w-5/12 h-12"></div>
                <input className="border rounded border-sky-7 
                w-5/12 h-12 text-center outline-none px-2 placeholder-neutral-400"
                name="price"
                value={service.price || 0}
                onChange={changeHandler}
                type="text" 
                placeholder="price"/>
            </>

        }

            <input className="border rounded border-sky-7 
            w-3/12 h-12 text-center outline-none px-2 placeholder-neutral-400"
            name="quantity"
            value={service.quantity || 0}
            onChange={changeHandler}
            type="text" 
            placeholder="Qty"/>

            <p className="w-4/12 text-right h-12 pt-3 ">{formatCurrency(service.total)}</p>
        </div>
        <div className="flex flex-col h-full justify-between mt-4">

        <div className="flex gap-2">
        <button 
        className="rounded px-1.5 py-1 text-xs font-semibold bg-sky-11 text-white cursor-pointer"
        onClick={handlePriceChange} 
        data-type="hr">€/HR</button>
        <button 
        className="rounded px-1.5 py-1 text-xs font-semibold bg-sky-11 text-white cursor-pointer"
        onClick={handlePriceChange} 
        data-type="un">€/UNIT</button>
        </div>

        {!lang ? 
            <div className="flex gap-2">
            <TranslateButton loading={loading} transHandler={transHandler}/>
        {service.translated ?
            <div className="flex gap-1 items-center">
                <TranslatedIcon />
                <p className="font-semibold text-sm text-neutral-600">translated</p>
            </div>
            : null}

            </div>
        : <div className="text-sm py-1">&nbsp;</div>}       

         <div className="flex justify-between">
<div className="flex items-center">
    <label className="relative cursor-pointer">
      <input checked={lang} onClick={changeLangHandler} type="checkbox" className="sr-only peer" />
      <div
        className="w-[53px] h-7 flex items-center bg-gray-300 rounded-full text-[9px] peer-checked:text-sky-11 text-gray-300 font-extrabold after:flex after:items-center after:justify-center peer after:content-['EN'] peer-checked:after:content-['FR'] peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-11">
      </div>
    </label>
  </div>


            <button onClick={addServiceClickHandler} className="bg-sky-11 p-2 
            rounded cursor-pointer">
                    <svg className="text-white"width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </button>
        </div>
        </div>
        </div>                  
        </div>
    </>
    )
}
