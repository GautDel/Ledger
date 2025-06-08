export type Info = {
	first_name:  string;
	last_name:   string;
	address:     string;
	email:       string;
	phone:       string;
	SIREN_SIRET: string;
}

export type Client = {
	id:         string;
	first_name: string;
	last_name:  string;
	address:    string;
	email:      string;
	phone:      string;
}

export type Service = {
    [key: string]:      any;
    id:                 string;
    name:               string;
    french_name:        string;
    description:        string;
    french_description: string;
    price:              number;
    price_type:         string;
    quantity:           number;
    total:              number;
    translated:         boolean;
}

export type Invoice = {
    info:     Info 
    client:   Client
    services: Service[]
    date:     string
    total:    number
    tta:      number
}

export type Notification = {
    color: string
    message: string
}
