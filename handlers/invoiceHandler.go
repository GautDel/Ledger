package handlers

import (
	"encoding/json"
	"ledger2/models"
	"ledger2/pdf"
	"ledger2/utils"
	"ledger2/validation"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

type invoiceRecord struct {
	ID 			  string
	InvoiceNumber string
}

func createInvoiceRecord(pb *pocketbase.PocketBase) (*core.Record, error) {
	collection, err := pb.FindCollectionByNameOrId("invoices")
	if err != nil {
		return nil, err
	}

	// Needed for invoice number generation
	totalRecords, err := utils.CountInvoices("invoices", pb)
	if err != nil {
		return nil, err
	}
	
	// invoice num must follow YYYYMMNN where N is chronological order in 
	// which it was created in given month 
	year := time.Now().Year()
	month := utils.MonthToDigit()
	invNum := strconv.Itoa(year) + month + utils.PadInt(totalRecords+1)

	record := core.NewRecord(collection)
	record.Set("invoice_number", invNum)

	err = pb.Save(record)
	if err != nil {
		return nil, err
	}

	return record, nil
}

func InvoiceHandler(e *core.RequestEvent, pb *pocketbase.PocketBase) error {
	var invoice models.Invoice

	err := json.NewDecoder(e.Request.Body).Decode(&invoice)
	if err != nil {
		log.Println("error decoding body", err)
	}

	invErr := validation.ValidateStruct(invoice)
	if len(invErr) != 0 {
		log.Println("error validating invoice record", err)
	}

	// Invoice record creation for invoice numbering
	record, err := createInvoiceRecord(pb)
	if err != nil {
		log.Println("error creating invoice record", err)
	}

	// Update current invoice record
	invoice.InvoiceNumber = record.GetString("invoice_number")

	// Get bank details
	bank := utils.GetBankDetails(pb)

	// Create PDF folder in documents
	utils.EnsureSavePDF()

	// Create PDF
	pdf.New(invoice, bank, e)

	// Send response to client
	e.JSON(http.StatusOK, invoice)
	
	return err
}
