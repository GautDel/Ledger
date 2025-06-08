import React, { createContext, useCallback, useContext, useState, ReactNode } from "react"
import { getDate } from "../../../utils/getDate"
import { useClients } from "../hooks/useClients"
import { useInfo } from "../hooks/useInfo"
import { useInvoice } from "../hooks/useInvoice"
import { useInvoiceNumber } from "../hooks/useInvoiceNumber"
import { useServices } from "../hooks/useServices"
import { useServicesSearch } from "../hooks/useServicesSearch"
import {Client, Info, Service, Invoice, Notification} from "../types"

type FormState = {
    notifications: Notification[]
    invoiceNumber: string
    editing: boolean
    date: string
    lang: boolean
    total: number
    searchTerm: string
    info: Info | null
    clients: Client[] | null
    client: Client | null
    services: Service[] | null
    selectedServices: Service[]
    searchedServices: Service[]
    invoice: Invoice | undefined
    invoiceStatus: {loading: boolean, success: boolean}
    notificationHandler: (notification: Notification) => void
    removeNotificationHandler: (id: number) => void
    changeDateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    changeLangHandler: () => void
    resetLangHandler: () => void
    resetFormHandler: () => void
    searchTermHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    updateTotalHandler: (total: number) => void
    selectedServicesHandler: (updater: (prev: Service[]) => Service[]) => void
    editStateHandler: (edt: boolean) => void
    clientHandler: (client: Client | null) => void
    postInvoiceHandler: (e: React.MouseEvent<HTMLButtonElement>)=> void
    refetchInvoiceNumber: () => Promise<void>
}

type FormProviderProps = {
    children: ReactNode;
}

const FormContext = createContext<FormState | undefined>(undefined);

export const useFormContext = () => {
    const ctx = useContext(FormContext)
    if(!ctx) {
        throw new Error("Issue with FormContext")
    }

    return ctx
}

export const FormProvider = ({ children }:FormProviderProps) => {
    // State
    const [lang, setLang] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0.00);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [date, setDate] = useState<string>(getDate)
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [editing, setEditing] = useState<boolean>(false)
    const [client, setClient] = useState<Client | null>(null)
    const [notifications, setNotifications] = useState<Notification[]>([])

    // Hooks
    const {invoiceNum: invoiceNumber, refetchInvoiceNumber} = useInvoiceNumber("http://localhost:8090/invoicenumber")
	const {info} = useInfo("http://localhost:8090/info")
    const {clients} = useClients("http://localhost:8090/clients")
	const {services} = useServices("http://localhost:8090/services")
    const {searchedServices} = useServicesSearch(
        "http://localhost:8090/services", searchTerm)
    const {invoice, status: invoiceStatus, postInvoice} = useInvoice("http://localhost:8090/invoices/create")
    
    // Handlers
    const notificationHandler = useCallback((notification: Notification)=> {
        setNotifications((prev)=> ([...prev, notification]))
    }, [])

    const removeNotificationHandler = useCallback((id: number)=> {
        setNotifications((prev)=> (prev.filter((_, i) => i !== id))) 
    },[])

    const clientHandler = useCallback((client: Client | null)=> {
        setClient(client)
    },[])

    const postInvoiceHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        postInvoice(info,client,selectedServices,date,total,total, refetchInvoiceNumber)
    },[info, client, selectedServices, date, total])

    const editStateHandler = useCallback((edt: boolean) => {
        setEditing(edt)
    },[])
    const selectedServicesHandler = useCallback((updater: (prev: Service[]) => Service[])=> {
        setSelectedServices(updater)
    }, [])
    const changeDateHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value) 
    }, [])

    const changeLangHandler = useCallback(() => {
        setLang(!lang)
    },[lang])

    const resetLangHandler = useCallback(() => {
        setLang(false)
    }, [])

    const resetFormHandler = useCallback(() => {
        setClient(null)
        setSearchTerm("")
        setSelectedServices([])
        setTotal(0)
        setEditing(false)
        setLang(false)
    },[])



    const searchTermHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.trim())
    },[])

    const updateTotalHandler = useCallback((total: number) => {
        setTotal(total)
    },[total])

    return (
        <FormContext.Provider
            value={{
                notifications,
                invoiceNumber,
                editing,
                date,
                lang,
                total,
                searchTerm,
                info,
                clients,
                client,
                services,
                invoice,
                invoiceStatus,
                selectedServices,
                searchedServices,
                notificationHandler,
                removeNotificationHandler,
                changeDateHandler,
                changeLangHandler,
                resetLangHandler,
                resetFormHandler,
                searchTermHandler,
                updateTotalHandler,
                selectedServicesHandler,
                editStateHandler,
                clientHandler,
                postInvoiceHandler,
                refetchInvoiceNumber,
            }}>
            {children}
        </FormContext.Provider>
    );
};
