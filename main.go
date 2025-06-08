package main

import (
	"context"
	"embed"

	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"github.com/joho/godotenv"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"

	"ledger2/handlers"
	"ledger2/reset"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	envErr := godotenv.Load()
	if envErr != nil {
		log.Fatal("Error loading .env file")
	}

	// Pocketbase
	pb := pocketbase.New()


	pb.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// Check if records need to be reset
		msg := reset.Start(pb)
		log.Println(msg)

		se.Router.GET("/info", func(e *core.RequestEvent) error {
			return handlers.InfoHandler(e, pb) 
		})

		se.Router.GET("/clients", func(e *core.RequestEvent) error {
			return handlers.ClientHandler(e, pb)
		})

		se.Router.GET("/services", func(e *core.RequestEvent) error {
			return handlers.ServiceHandler(e, pb)
		})

		se.Router.POST("/translate", func(e *core.RequestEvent) error {
			return handlers.TranslationHandler(e, pb)
		})

		se.Router.POST("/invoices/create", func(e *core.RequestEvent) error {
			return handlers.InvoiceHandler(e, pb)
		})
		se.Router.GET("/invoicenumber", func(e *core.RequestEvent) error {
			return handlers.InvoiceNumberHandler(e, pb)
		})
		return se.Next()
	})

	go func() {
		pb.RootCmd.SetArgs([]string{"serve", "--http=127.0.0.1:8090"})
		if err := pb.Start(); err != nil {
			log.Fatal(err)
		}
	}()

	stopChan := make(chan struct{})
	reset.StartWatcher(pb, stopChan)

	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "ledger2",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		OnShutdown: func(ctx context.Context){
			log.Println("App shutting down, stopping watcher")
			close(stopChan)
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
