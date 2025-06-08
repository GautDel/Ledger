package utils

import (
	"encoding/json"
	"ledger2/models"
)

func StructToMap(invoice models.Invoice) (map[string]any, error){
	jsonData, err := json.Marshal(invoice)
	if err != nil {
		return nil, err
	}

	var result map[string]any

	err = json.Unmarshal(jsonData, &result)
	if err != nil {
		return nil, err
	}

	return result, nil
}
