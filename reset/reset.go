package reset

import (
	"log"
	"time"

	"github.com/pocketbase/pocketbase"
)


func Start(pb *pocketbase.PocketBase) string {

	// find record of last reset
	record, err := pb.FindFirstRecordByFilter("last_reset", "", nil)
	if err != nil {
		log.Println("Error retriving last reset", err)
		return "Error retrieving last reset"
	}

	lastReset := record.GetDateTime("created")
	lastResetMonth := lastReset.Time().Month()

	// check current date
	currDate := time.Now() 
	currMonth := currDate.Month()

	// if current date = new month compared to record -> wipe invoice table
	if lastResetMonth != currMonth {
		invoices, err := pb.FindAllRecords("invoices")	
		if err != nil {
			log.Println("Error retrieving invoices for removal")
		}

		for _, invoice := range invoices {
			err := pb.Delete(invoice)
			if err != nil {
				log.Println("Failed to remove invoice", invoice.Id)
				continue
			}
		}
		return "DB wiped"	
	}

	// else continue as normal	
	return "DB up to date"
}

func StartWatcher(pb *pocketbase.PocketBase, stopChan chan struct{}) {
	go func() {
		for {
			select {
				case <-stopChan:
					log.Println("stop signal received")
					return
				case <-time.After(1 * time.Minute):
					msg := Start(pb)
					log.Println(msg)
			}
		}
	}()
}
