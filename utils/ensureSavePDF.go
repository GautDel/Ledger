package utils

import (
	"log"
	"os"
)

func EnsureSavePDF() {
	path := GetPDFSavePath()

	_, err := os.Stat(path)
	if err != nil {
		if os.IsNotExist(err) {
			err := os.Mkdir(path, os.ModePerm)
			if err != nil {
				log.Println("Failed to create directory", err)
			}
		}

	}
}
