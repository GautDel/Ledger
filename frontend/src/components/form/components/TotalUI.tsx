import { formatCurrency } from "../../../utils/formatCurrency"
import { useFormContext } from "../contexts/FormContext"

export const TotalUI = () => {
    const {total} = useFormContext()

    return (
        <>
        <div className="flex flex-col w-full items-end gap-y-1 text-neutral-600">
            <div className="flex text-lg gap-4 font-bold">
                <p className="text-right">SOUS TOTAL:</p>
                <p className="text-left">{formatCurrency(total)}</p>
            </div>
            <p>TVA non applicable, art. 293 B du CGI</p>
        </div>
            <div className="w-full flex justify-end text-sky-11 text-2xl 
            font-black gap-x-4 my-">
                <p className="text-right">TOTAL:</p>
                <p className="text-2xl font-black text-left">{formatCurrency(total)}</p>
            </div>
        </>
    )
}
