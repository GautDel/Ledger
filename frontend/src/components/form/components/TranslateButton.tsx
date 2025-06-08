import React from "react"
import { Spinner } from "./Spinner"

type Props  = {
    transHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
    loading: boolean
}
export const TranslateButton = ({transHandler, loading}: Props) => {
    return (
        <>
            {loading ? 
                <div className="flex gap-2 text-neutral-600 font-semibold">
                <Spinner size="sm"/> Translating </div>
                    :
            <button className="bg-sky-11 text-white w-fit px-2 py-1 text-sm
                    font-semibold rounded cursor-pointer"
            onClick={transHandler}>Translate</button>
            }
        </>
    )
}
