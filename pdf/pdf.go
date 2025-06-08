package pdf

import (
	"ledger2/models"
	"ledger2/utils"
	"path/filepath"
 
	"codeberg.org/go-pdf/fpdf"
	"github.com/pocketbase/pocketbase/core"
)

func initParams(ctx *PDFContext) {
	ctx.Page.AddPage()
	ctx.Page.SetFont("Helvetica", "", ts.base)
	ctx.Page.SetTextColor(defaultColor.red, defaultColor.green, defaultColor.blue)

}

func New(invoice models.Invoice, bank models.Bank, e *core.RequestEvent) {
	pdf := fpdf.New("P", "mm", "A4", "")
	ctx := &PDFContext{Page: pdf}
	// Create French page
	newFr(ctx, invoice, bank)

	// Create English page
	newEn(ctx, invoice, bank)

	// Create file
	path := utils.GetPDFSavePath()
	filePath := filepath.Join(path, invoice.InvoiceNumber + ".pdf")

	err := pdf.OutputFileAndClose(filePath)
	if err != nil {
		panic(err)
	}
}
