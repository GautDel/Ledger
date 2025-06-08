package handlers

import (
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func InfoHandler(e *core.RequestEvent, app *pocketbase.PocketBase) error {

	record, err := app.FindAllRecords("information")

	if err != nil {
		return e.NotFoundError("Could not find your information", err)
	}

	return e.JSON(http.StatusOK, record[0])
}
