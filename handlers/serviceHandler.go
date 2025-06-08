package handlers

import (
	"net/http"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func ServiceHandler(e *core.RequestEvent, pb *pocketbase.PocketBase) error {

	searchTerm := e.Request.URL.Query().Get("search")

	var (
		services []*core.Record
		err error
	)

	if searchTerm == "" {
		services, err = pb.FindAllRecords("services")


		e.JSON(http.StatusOK, services)
	} else {
		services, err = pb.FindAllRecords("services",
		dbx.NewExp("name LIKE {:term}", dbx.Params{"term": "%" + searchTerm +"%"}),
	)

		e.JSON(http.StatusOK, services)
	}

	if err != nil {
		e.NotFoundError("Could not find services", err)
	}

	return err
}

