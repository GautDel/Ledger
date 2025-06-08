import { useEffect, useState } from "react";
import { validateInvoice } from "../../utils/validateInvoice";
import { ClientUI } from "./components/ClientUI"
import { InfoUI } from "./components/InfoUI"
import { InvoiceDetailUI } from "./components/InvoiceDetailUI";
import { ServicesUI } from "./components/ServicesUI";
import { Spinner } from "./components/Spinner";
import { TotalUI } from "./components/TotalUI";
import { useFormContext } from "./contexts/FormContext";

export const Form = () => {
  const {
    notificationHandler,
    postInvoiceHandler,
    resetFormHandler,
    client,
    info,
    selectedServices,
    date,
    total,
    invoiceStatus
  } = useFormContext();
  const [errors, setErrors] = useState<string[]>([])

  useEffect(()=> {
       if(invoiceStatus.success){
            notificationHandler({color: "bg-green-500", message: "Invoice created successfully"})
        }
        resetFormHandler()
        setErrors([])
        window.scrollTo({ top: 0, behavior: "smooth" });
  }, [invoiceStatus.success])

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
    const validation = validateInvoice(client, selectedServices, info, total, date)
    if (!validation.isValid) {
        setErrors(validation.errors)
    } else {
        postInvoiceHandler(e)
     }
  }


	return (
        <form id="pdfForm" 
        name="pdfForm" 
        className="relative mt-25 zk20 bg-white max-w-3xl mx-auto rounded p-8 
        pb-12 shadow-md flex gap-4 flex-col">

        <div className="flex justify-between">
            <InfoUI />
            <InvoiceDetailUI />
        </div>

        <hr className="border-sky-7"/>

        <ClientUI /> 
        <ServicesUI />
        <TotalUI/>            

        <hr className="border-sky-7"/>
        <div className="">
            {errors.map(error => (
                <p className="text-red-500">{error}</p>
            ))}

        </div>
       
		<button onClick={handleSubmit} className="flex items-center justify-center w-full rounded bg-sky-11 font-bold text-white py-4 text-3xl cursor-pointer hover:brightness-110 duration-100 ease-in gap-4">Generate
        {invoiceStatus.loading && <Spinner size="md"/>}
        </button>
		</form>
	)
}
