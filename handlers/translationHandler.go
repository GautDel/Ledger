package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"ledger2/models"
	"log"
	"net/http"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

type data struct {
	Text []string `json:"text"`
	TargetLang string `json:"target_lang"`
}

type deeplRes struct {
	Tranlations []struct {
		Text string `json:"text"`
	} `json:"translations"`
}

type finalRes struct {
	ID 			string `json:"id"`
	Name 		string `json:"name"`
	Description string `json:"description"`
}

func TranslationHandler(e *core.RequestEvent, pb *pocketbase.PocketBase) error {
	APIKey := os.Getenv("DEEPL_API_KEY") 
	lang := "FR"

	var stt models.Service 

	err := e.BindBody(&stt)
	if err != nil {
		log.Println("error occurred binding body", err)
	}

	reqData := data{
		Text: []string{stt.Name, stt.Description},
		TargetLang: lang,
	}

	jsonData, err := json.Marshal(reqData)
	if err != nil {
		log.Println("Failed to marshal data", err)
	}

	req, err := http.NewRequest(
		"POST",  
		"https://api-free.deepl.com/v2/translate",
		bytes.NewBuffer(jsonData),
	)

	if err != nil {
		log.Println("Failed to create new request", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "DeepL-Auth-Key " + APIKey)

	client := &http.Client{}
	res, err := client.Do(req)
	if (err != nil) {
		log.Println("Issue with response from DeepL", err)
	}

	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if (err != nil) {
		log.Println("Error reading body", err)
	}

	var deepl deeplRes

	err = json.Unmarshal(body, &deepl) 
	if err != nil {
		log.Println("Unable to unmarshal JSON")
	}


	stt.FrenchName = deepl.Tranlations[0].Text	
	stt.FrenchDescription = deepl.Tranlations[1].Text	
	stt.Translated = true
	log.Println(stt)

 	e.JSON(http.StatusOK, stt) 

	return err
}
