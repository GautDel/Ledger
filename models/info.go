package models

type Info struct {
	FirstName 	string `json:"first_name"`
	LastName 	string `json:"last_name"`
	Address  	string `json:"address"`
	Email  		string `json:"email"`
	Phone  		string `json:"phone"`
	SIREN_SIRET string `json:"SIREN_SIRET"`
}
