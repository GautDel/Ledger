package pdf

import (
	"ledger2/models"
	"strconv"
)

func newEn(ctx *PDFContext, data models.Invoice, bank models.Bank) {
	initParams(ctx)

	var currY, currX float64
	y := &currY

	// Render watermark
	renderWatermark(ctx)

	// Render Comp Name
	ctx.Page.SetFont("Helvetica", "B", ts.lg)
	currY = renderPageHeader(ctx, pp.m, pp.m, currY, dten.h1, ts.lg, blue500)

	// Render "Facture"
	ctx.Page.SetFont("Helvetica", "B", ts.xxl)
	currY = renderPageHeader(
		ctx,
		ax.getEnd(ctx.Page.GetStringWidth(dten.h2)),
		pp.m,
		currY,
		dten.h2,
		ts.xxl,
		blue500,
	)

	ms.botMargin(y, ms.sm)

	_ = renderBox(
		ctx,
		ax.start,
		currY,
		bw.w5_12,
		currY,
		10,
		dten.companyHeader,
		[]string{
			data.Info.FirstName + " " + data.Info.LastName,
			data.Info.Address,
			data.Info.Phone,
			data.Info.Email,
		},
		neutral950,
	)



	// Render invoice header "Numero Facture:"
	invStr := dten.invoiceHeader + " " + data.InvoiceNumber
	ctx.Page.SetFont("Helvetica", "B", ts.base)
	currY, currX = renderCell(
		ctx,
		ax.getEnd(ctx.Page.GetStringWidth(invStr)),
		currY,
		ctx.Page.GetStringWidth(dten.invoiceHeader),
		currY,
		ts.base,
		dten.invoiceHeader,
		neutral950,
		"R",
		false,
	)

	// Render invoice number
	ctx.Page.SetFont("Helvetica", "", ts.base)
	currY, _ = renderCell(
		ctx,
		currX + 1,
		currY,
		ctx.Page.GetStringWidth(data.InvoiceNumber),
		currY,
		ts.base,
		data.InvoiceNumber,
		blue500,
		"R",
		true,
	)

	// Render date header
	dateStr := dten.dateHeader + data.Date
	ctx.Page.SetFont("Helvetica", "B", ts.base)
	currY, currX = renderCell(
		ctx,
		ax.getEnd(ctx.Page.GetStringWidth(dateStr)),
		currY,
		ctx.Page.GetStringWidth(dten.dateHeader),
		currY,
		ts.base,
		dten.dateHeader,
		neutral950,
		"R",
		false,
	)

	// Render date
	ctx.Page.SetFont("Helvetica", "", ts.base)
	currY, _ = renderCell(
		ctx,
		currX,
		currY + 0.75,
		ctx.Page.GetStringWidth(data.Date),
		currY,
		ts.sm,
		data.Date,
		neutral950,
		"R",
		true,
	)

	ms.botMargin(y, ms.md)
	ms.botMargin(y, ms.lg - 0.1)

	ctx.Page.SetFont("Helvetica", "B", ts.sm)
	currY, currX = renderCell(
		ctx,
		ax.start,
		currY,
		ctx.Page.GetStringWidth(dten.sirenSiretHeader),
		currY,
		ts.base,
		dten.sirenSiretHeader,
		neutral950,
		"L",
		false,
	)

	ctx.Page.SetFont("Helvetica", "", ts.sm)
	currY, _ = renderCell(
		ctx,
		currX,
		currY + 0.5,
		ctx.Page.GetStringWidth(data.Info.SIREN_SIRET),
		currY,
		ts.sm,
		data.Info.SIREN_SIRET,
		blue500,
		"R",
		true,
	)

	// Margin + line
	ms.botMargin(y, ms.sm + 0.4)
	ctx.Page.SetDrawColor(59, 130, 246)
	ctx.Page.Line(ax.start, currY, ax.end, currY)
	ms.botMargin(y, ms.sm)

	// Renders client information
	ctx.Page.SetFont("Helvetica", "", ts.base)
	currY = renderBox(
		ctx,
		ax.start,
		currY,
		bw.w4_12,
		currY,
		10,
		dten.clientHeader,
		[]string{
			data.Client.FirstName + " " + data.Client.LastName,
			data.Client.Address,
			data.Client.Phone,
			data.Client.Email,
		},
		neutral950,
	)

	ms.botMargin(y, ms.sm)

	ctx.Page.SetFont("Helvetica", "B", ts.sm)
	ctx.Page.Line(ax.start, currY, ax.end, currY)
	currY = renderItemsHeader(ctx, ax.start, currY, currY, defaultColor, dten.itemsHeader)
	ctx.Page.Line(ax.start, currY, ax.end, currY)

	ms.botMargin(y, ms.sm)

	 currY = renderItems(ctx, ax.start, currY, currY, data.Services, defaultColor)

	yReset := currY + 2
	ms.botMargin(y, ms.sm)
	// Used to align total on same line as "Payment details"

	// Render payment details header
	ctx.Page.SetFont("Helvetica", "B", ts.base)
	currY, _ = renderCell(
		ctx,
		ax.start,
		currY,
		ctx.Page.GetStringWidth("Détails De Paiement"), 
		currY,
		ts.sm,
		"Détails De Paiement",
		neutral950,
		"L",
		true,
	)

	// Renders BIC 
	ctx.Page.SetFont("Helvetica", "B", ts.sm)
	currY, currX = renderCell(
		ctx,
		ax.start,
		currY,
		ctx.Page.GetStringWidth(dten.bic), currY,
		ts.sm,
		dten.bic,
		neutral950,
		"L",
		false,
	)

	ctx.Page.SetFont("Helvetica", "", ts.sm)
	currY, _ = renderCell(
		ctx,
		currX,
		currY,
		ctx.Page.GetStringWidth(bank.BIC), currY,
		ts.sm,
		bank.BIC,
		neutral950,
		"L",
		true,
	)

	// Renders IBAN
	ctx.Page.SetFont("Helvetica", "B", ts.sm)
	currY, currX = renderCell(
		ctx,
		ax.start,
		currY,
		ctx.Page.GetStringWidth(dten.iban), currY,
		ts.sm,
		dten.iban,
		neutral950,
		"L",
		false,
	)

	ctx.Page.SetFont("Helvetica", "", ts.sm)
	currY, _ = renderCell(
		ctx,
		currX,
		currY,
		ctx.Page.GetStringWidth(bank.IBAN), currY,
		ts.sm,
		bank.IBAN,
		neutral950,
		"L",
		true,
	)
	
	// Renders bank name
	ctx.Page.SetFont("Helvetica", "B", ts.sm)
	currY, currX = renderCell(
		ctx,
		ax.start,
		currY,
		ctx.Page.GetStringWidth(dten.bank), currY,
		ts.sm,
		dten.bank,
		neutral950,
		"L",
		false,
	)

	ctx.Page.SetFont("Helvetica", "", ts.sm)
	currY, _ = renderCell(
		ctx,
		currX,
		currY,
		ctx.Page.GetStringWidth(bank.BankName), currY,
		ts.sm,
		bank.BankName,
		neutral950,
		"L",
		true,
	)

	// Renders account name
	ctx.Page.SetFont("Helvetica", "B", ts.sm)
	currY, currX = renderCell(
		ctx,
		ax.start,
		currY,
		ctx.Page.GetStringWidth(dten.accName), currY,
		ts.sm,
		dten.accName,
		neutral950,
		"L",
		false,
	)

	ctx.Page.SetFont("Helvetica", "", ts.sm)
	currY, _ = renderCell(
		ctx,
		currX,
		currY,
		ctx.Page.GetStringWidth(bank.AccountHolderName), currY,
		ts.sm,
		bank.AccountHolderName,
		neutral950,
		"L",
		true,
	)

	ctx.Page.SetFont("Helvetica", "B", ts.lg)
	totStr := dten.total + " " + strconv.Itoa(data.Total)

	currY, _ = renderCell(
		ctx,
		ax.getEnd(ctx.Page.GetStringWidth(totStr)),
		yReset,
		ctx.Page.GetStringWidth(totStr),
		currY,
		ts.lg,
		totStr,
		defaultColor,
		"R",
		true,
	)

	ctx.Page.SetFont("Helvetica", "", ts.sm)
	currY, _ = renderCell(
		ctx,
		ax.getEnd(ctx.Page.GetStringWidth(dten.tax)),
		yReset + 10,
		ctx.Page.GetStringWidth(dten.tax),
		currY,
		ts.sm,
		dten.tax,
		defaultColor,
		"R",
		true,
	)

	ms.botMargin(y, ms.xl)




	ms.botMargin(y, ms.xl)
	ctx.Page.SetFont("Helvetica", "I", ts.md)
	currY, _ = renderCell(
		ctx,
		ax.getMid(ctx.Page.GetStringWidth(dten.message)),
		currY,
		ctx.Page.GetStringWidth(dten.message),
		currY,
		ts.sm,
		dten.message,
		blue500,
		"R",
		true,
	)
}
