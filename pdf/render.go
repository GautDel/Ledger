package pdf

import (
	"ledger2/models"
	"ledger2/utils"
	"strconv"
	"strings"
)


func checkY(prev, curr float64) float64 {
	if curr > prev {
		return curr
	}

	return prev
}

func renderPageHeader(
	ctx *PDFContext,
	x, y, prevY float64,
	val string,
	size float64,
	color rgb,
) float64 {

	ctx.Page.SetTextColor(color.red, color.green, color.blue)
	ctx.Page.SetXY(x, y)

	titleLen := ctx.Page.GetStringWidth(val)
	h := size / 2

	tr := ctx.Page.UnicodeTranslatorFromDescriptor("")
	ctx.Page.CellFormat(
		titleLen,
		h,
		tr(val),
		"",
		0,
		"R",
		false,
		0,
		"",
	)

	ctx.Page.Ln(-1)
	ctx.Page.SetTextColor(defaultColor.red, defaultColor.green, defaultColor.blue)

	return checkY(prevY, ctx.Page.GetY())
}

func renderWatermark(ctx *PDFContext) {
	ctx.Page.SetTextColor(235, 235, 235) // Light gray
	ctx.Page.SetFont("Helvetica", "B", ts.xl)

	watermarkText := "ENGLISH TRANSLATION - NOT AN INVOICE"
	midX, midY := 105.0, 148.5 
	midText := midX - (ctx.Page.GetStringWidth(watermarkText) / 2)

	ctx.Page.TransformBegin()
	ctx.Page.TransformRotate(45, midX, midY) // angle, x, y (center of rotation)
	ctx.Page.Text(midText, midY, watermarkText)
	ctx.Page.TransformEnd()
}

func renderBoxHeader(ctx *PDFContext,s string, x float64, w float64) {
	ctx.Page.SetX(x)
	ctx.Page.SetFont("Helvetica", "B", 12)
	ctx.Page.SetTextColor(defaultColor.red, defaultColor.green, defaultColor.blue)
	tr := ctx.Page.UnicodeTranslatorFromDescriptor("")
	ctx.Page.MultiCell(
		w,
		(12/2)+2,
		tr(s),
		"",
		"M",
		false,
	)
}

func renderBox(
	ctx *PDFContext,
	x, y, w, prevY, size float64,
	s string,
	vals []string,
	color rgb,
) float64 {
	ctx.Page.SetXY(x, y)
	renderBoxHeader(ctx, s, x, w)
	var boxY float64

	for i, val := range vals {
		ctx.Page.SetX(x)
		ctx.Page.SetFont("Helvetica", "", size)
		ctx.Page.SetTextColor(color.red, color.green, color.blue)

		tr := ctx.Page.UnicodeTranslatorFromDescriptor("")
		ctx.Page.MultiCell(
			w,
			(size / 2),
			tr(val),
			"",
			"LT",
			false,
		)

		if i == len(vals)-1 {
			boxY = checkY(prevY, ctx.Page.GetY())
		}
	}

	return boxY
}

func renderCell(
	ctx *PDFContext,
	x, y, w, prevY, size float64,
	item string,
	color rgb,
	a string,
	nextLn bool,
) (float64, float64) {

	ctx.Page.SetXY(x, y)
	ctx.Page.SetTextColor(color.red, color.green, color.blue)
	tr := ctx.Page.UnicodeTranslatorFromDescriptor("")
	h := size / 2
	ctx.Page.CellFormat(
		w,
		h,
		tr(item),
		"",
		0,
		a,
		false,
		0,
		"",
	)

    if nextLn {
        ctx.Page.Ln(-1)
    }

	return checkY(prevY, ctx.Page.GetY()), ctx.Page.GetX()
}

func renderHeaderItem(ctx *PDFContext,w float64, s, a string, size float64) {
	h := size / 2
	tr := ctx.Page.UnicodeTranslatorFromDescriptor("")
	ctx.Page.CellFormat(
		w,
		h,
		tr(s),
		"",
		0,
		a,
		false,
		0,
		"",
	)
}

func renderItemsHeader(ctx *PDFContext, x, y, prevY float64, color rgb, items []string) float64 {

	ctx.Page.SetXY(x, y)
	ctx.Page.SetTextColor(color.red, color.green, color.blue)

	renderHeaderItem(ctx, bw.w7_12, items[0], "L", ts.md)
	renderHeaderItem(ctx, bw.w1_12, items[1], "C", ts.md)
	renderHeaderItem(ctx, bw.w1_12, items[2], "C", ts.md)
	renderHeaderItem(ctx, bw.w1_12, items[3], "C", ts.md)
	renderHeaderItem(ctx, bw.w2_12, items[4], "R", ts.md)

	ctx.Page.Ln(-1)

	return checkY(prevY, ctx.Page.GetY())
}

func renderItems(ctx *PDFContext, x, y, prevY float64, items models.Services, color rgb) float64 {

	ctx.Page.SetXY(x, y)

	for _, i := range items {
		ctx.Page.SetFont("Helvetica", "B", ts.sm)
		renderCellInline(ctx, bw.w7_12, i.Name, "L")

		ctx.Page.SetFont("Helvetica", "", ts.sm)
		renderCellInline(ctx, bw.w1_12, strconv.Itoa(i.Quantity), "C")

		if i.PriceType == "hr" {
			renderCellInline(ctx, bw.w1_12 - 1.5, "€ "+strconv.Itoa(i.Price), "R")
			renderCellInline(ctx, bw.w1_12, "", "R")
		} else {
			renderCellInline(ctx, bw.w2_12 - 1, "€ "+strconv.Itoa(i.Price), "R")
		}

		ctx.Page.SetFont("Helvetica", "B", ts.sm)
		renderCellInline(ctx, bw.w2_12 + 1.5, "€ "+strconv.FormatFloat(float64(i.Total), 'f', -1, 64), "R")
		ctx.Page.Ln(-1)

		descSlice := utils.StringSplit(i.Description, "\n")
		for _, descItem := range descSlice {
			renderCellBlock(ctx, bw.w12_12, strings.TrimSpace(descItem))
		}

		ctx.Page.Ln(-1)
		ctx.Page.Line(ax.start, ctx.Page.GetY(), ax.end, ctx.Page.GetY())
		ctx.Page.Ln(-1)
	}

	return checkY(prevY, ctx.Page.GetY())
}

func renderItemsFr(ctx *PDFContext, x, y, prevY float64, items models.Services, color rgb) float64 {

	ctx.Page.SetXY(x, y)

	for _, i := range items {
		ctx.Page.SetFont("Helvetica", "B", ts.sm)
		renderCellInline(ctx, bw.w7_12, i.FrenchName, "L")

		ctx.Page.SetFont("Helvetica", "", ts.sm)
		renderCellInline(ctx, bw.w1_12, strconv.Itoa(i.Quantity), "C")

		ctx.Page.SetFont("Helvetica", "B", ts.sm)
		if i.PriceType == "hr" {
			renderCellInline(ctx, bw.w1_12 - 1, "€ "+strconv.Itoa(i.Price), "R")
			renderCellInline(ctx, bw.w1_12, "", "R")
		} else {
			renderCellInline(ctx, bw.w2_12 - 1, "€ "+strconv.Itoa(i.Price), "R")
		}

		ctx.Page.SetFont("Helvetica", "B", ts.sm)
		renderCellInline(ctx, bw.w2_12 + 1.5, "€ "+strconv.Itoa(i.Total), "R")
		ctx.Page.Ln(-1)

		descSlice := utils.StringSplit(i.FrenchDescription, "\n")
		for _, descItem := range descSlice {
			renderCellBlock(ctx, bw.w12_12, strings.TrimSpace(descItem))
		}

		ctx.Page.Ln(-1)
		ctx.Page.Line(ax.start, ctx.Page.GetY(), ax.end, ctx.Page.GetY())
		ctx.Page.Ln(-1)
	}

	return checkY(prevY, ctx.Page.GetY())
}

func renderCellInline(ctx *PDFContext, w float64, item, a string) {

	tr := ctx.Page.UnicodeTranslatorFromDescriptor("")
	h := ts.sm / 2
	ctx.Page.CellFormat(
		w,
		h,
		tr(item),
		"",
		0,
		a,
		false,
		0,
		"",
	)
}

func renderCellBlock(ctx *PDFContext,w float64, item string) {

	ctx.Page.SetFont("Helvetica", "", ts.xs)
	tr := ctx.Page.UnicodeTranslatorFromDescriptor("")
	h := ts.xs / 2
	ctx.Page.MultiCell(
		w,
		h,
		tr(item),
		"",
		"L",
		false,
	)
}
