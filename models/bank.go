package models

type Bank struct {
	AccountHolderName string `json:"account_holder_name"`
	BIC 			  string `json:"BIC"`
	IBAN 			  string `json:"IBAN"`
	BankName 		  string `json:"bank_name"`
}
