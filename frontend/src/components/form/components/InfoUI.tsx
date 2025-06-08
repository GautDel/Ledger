import { useFormContext } from "../contexts/FormContext"
import { Loading } from "./Loading"

export const InfoUI = () => {
    const {info} = useFormContext()
    if (!info) return <Loading />

    return (
        <div className="flex flex-col text-lg gap-1 text-neutral-600">
            <div className="text-2xl font-bold pb-2">{info.first_name} {info.last_name}</div>

            <div className="text-lg">
                <span className="font-bold">N°SIREN/SIRET:</span> {info.SIREN_SIRET}
            </div>
            <div>{info.address}</div>
            <div>{info.phone}</div>
            <div>{info.email}</div>
       </div>
    )
}
