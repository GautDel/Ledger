package models

type Service struct {
	Name			  string `json:"name"`
	Description		  string `json:"description"`
	FrenchName		  string `json:"french_name,omitempty"`
	FrenchDescription string `json:"french_description,omitempty"`
	Price 			  int    `json:"price"`
	PriceType 		  string `json:"price_type"`
	Quantity 		  int    `json:"quantity"`
	Total 			  int    `json:"total"`
	Translated 		  bool   `json:"translated"`
}

type Services []Service
