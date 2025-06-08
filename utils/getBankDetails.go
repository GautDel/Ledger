package utils

import (
	"encoding/json"
	"ledger2/models"
	"log"

	"github.com/pocketbase/pocketbase"
)

func GetBankDetails(pb *pocketbase.PocketBase) models.Bank {
	var bank models.Bank

	bankRecords, err := pb.FindAllRecords("bank")
	if err != nil {
		log.Println("Failed to retrieve bank details", err)
	}

	jsonData, err := json.Marshal(bankRecords[0])
	if err != nil {
		log.Println("Failed to marshall bank details", err)
	}

	err = json.Unmarshal(jsonData, &bank)
	if err != nil {
		log.Println("Failed to unmarshall bank details", err)
	}

	return bank
}
