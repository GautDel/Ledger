package models

type Invoice struct {
	ID 			  string `json:"id"`
	InvoiceNumber string `json:"invoice_number"`
	Info 		  Info `json:"info" validate:"required"`
	Client 		  Client `json:"client" validate:"required"`
	Services 	  Services `json:"services" validate:"required"`
	Date 		  string `json:"date" validate:"required"`
	Total 		  int `json:"total" validate:"required"`
	TTA 		  int `json:"tta"`
}
