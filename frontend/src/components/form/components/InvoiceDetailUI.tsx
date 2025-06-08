import { useFormContext } from "../contexts/FormContext"

export const InvoiceDetailUI = () => {
    const{invoiceNumber, date, changeDateHandler} = useFormContext()

    return (
        <div className="text-right flex flex-col gap-1">
            <p className="font-bold text-6xl text-sky-11 pb-2">FACTURE</p>
            <p className="text-lg text-neutral-600">
            <span className="font-bold">N° FACTURE: </span>{invoiceNumber}</p>
            <p className="text-lg text-neutral-600">
                <span className="font-bold">DATE: </span> 
                <input className="border border-sky-11 w-28 text-center 
                rounded outline-none" 
                       type="date" 
                       onChange={changeDateHandler}
                       value={date} />
                </p>

        </div>

    )
}
