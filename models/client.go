package models

type Client struct {
	ID 		  string `json:"id"`
	FirstName string `json:"First_name"`
	LastName  string `json:"Last_name"`
	Address   string `json:"Address"`
	Email 	  string `json:"Email"`
	Phone 	  string `json:"Phone"`
}
