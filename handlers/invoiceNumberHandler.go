package handlers

import (
	"ledger2/utils"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func InvoiceNumberHandler(e *core.RequestEvent, pb *pocketbase.PocketBase) error {
	count, err := utils.CountInvoices("invoices", pb)
	if err != nil {
		log.Println("Error counting invoices in Database", err)
		return err
	}

	year := time.Now().Year()
	month := utils.MonthToDigit()
	fmtNum := strconv.Itoa(year) + month + utils.PadInt(count+1)

	e.JSON(http.StatusOK, fmtNum)

	return nil
}
