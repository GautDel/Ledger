import { strToFlt } from "./strToFlt";

export const formatCurrency = (amount: number | string) => {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(strToFlt(amount));
}; 


