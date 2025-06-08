package utils

import "github.com/pocketbase/pocketbase"

func CountInvoices(collName string, pb *pocketbase.PocketBase) (int, error) {
	records, err := pb.FindAllRecords(collName)
	if err != nil {
		return 0, err
	}
	count := len(records)

	return count, nil
}
