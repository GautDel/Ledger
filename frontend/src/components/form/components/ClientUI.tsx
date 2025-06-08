import { useFormContext } from "../contexts/FormContext"
import { Loading } from "./Loading"

export const ClientUI = () => {
  const { clients, clientHandler, client } = useFormContext();

  if (!clients) return <Loading />;

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const found = clients.find((client) => client.id === value) || null;
    clientHandler(found);
  }


    return (
        <>
            <div className="flex justify-between pb-4">
                <p className="uppercase font-bold text-sm 
                    text-neutral-600">Adresse de facturation</p>
                <div className="relative inline-block w-1/2">
                    <select name="clients" 
                        value={client?.id ?? ""}
                        className="border bg-transparent appearance-none 
                        w-full px-2 py-2 rounded border-sky-7 outline-none 
                        cursor-pointer text-neutral-600" 
                        id="clients" 
                        onChange={changeHandler}>
                        <option value="">Choose a client</option>
                    {clients.map((client, i) => (

                        <option key={i} 
                                value={client.id}>{client.first_name} {client.last_name}</option>
                    ))}
                    </select>
                <div className="absolute right-3 top-1/2 transform 
                     -translate-y-1/2 pointer-events-none">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-down text-sky-11"
                        viewBox="0 0 16 16"
                        >
                        <path d="M1 4.5A.5.5 0 0 1 1.5 4h13a.5.5 0 0 1 .354.854l-6.5 6.5a.5.5 0 0 1-.708 0l-6.5-6.5A.5.5 0 0 1 1 4.5z"/>
                        </svg>
                </div>
        </div>

    </div>
    {client ?
    <div className="flex flex-col gap-1">
        <p className="text-xl font-bold 
        pb-2 capitalize">{client?.first_name} {client?.last_name}</p>
        <p>{client?.address}</p>
        <p>{client?.email}</p>
        <p>{client?.phone}</p>
    </div>
    : 
    <div className="flex flex-col gap-1 text-neutral-400">
        <p className="text-xl font-bold 
        pb-2 capitalize">Jane Doe</p>
        <p>Somewhere Over The Rainbow, 00000, World</p>
        <p>jane.doe@email.com</p>
        <p>00 11 22 33 44</p>
    </div>
    }
</>)
}
