package utils

import (
	"log"
	"os"
	"path/filepath"
)

func GetPDFSavePath () string {
	homeDir, err := os.UserHomeDir()

	if err != nil {
		log.Println("Failed to retrieve home directory", err)
	}

	path := filepath.Join(homeDir, "Desktop", "savedInvoices")

	return path
}
