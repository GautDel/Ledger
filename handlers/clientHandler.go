package handlers

import (
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func ClientHandler(e *core.RequestEvent, pb *pocketbase.PocketBase) error {
	records, err := pb.FindAllRecords("clients")
	if err != nil {
		return e.NotFoundError("Could not find any clients", err)
	}

	return e.JSON(http.StatusOK, records)
}
