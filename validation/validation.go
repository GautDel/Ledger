package validation

import (
	"fmt"
	"log"
	"reflect"
	"strings"
)

func required(value any, fieldName string) error {
	v := reflect.ValueOf(value)
	switch v.Kind() {
		case reflect.Ptr, reflect.Interface:
		if v.IsNil() {
			return fmt.Errorf("%s is required", fieldName) 
		}
		case reflect.String:
		if v.Len() == 0 {
			return fmt.Errorf("%s is required", fieldName) 
		}
		case reflect.Map, reflect.Slice:
		if v.Len() == 0 {
			return fmt.Errorf("%s is required", fieldName) 
		}
	}
	return nil 
}


func ValidateStruct(s  any) []error {
	sValue := reflect.ValueOf(s)
	if sValue.Kind() == reflect.Ptr {
		sValue = sValue.Elem()
	}

	sType := sValue.Type() 
	sNumFields := sValue.NumField()
	errors := []error{}

	if sValue.Kind() != reflect.Struct {
		log.Println("ValidateStruct: expected struct or pointer to struct")
		return []error{fmt.Errorf("ValidateStruct: expected struct or pointer to struct")}
	}

	for i := 0; i < sNumFields; i++ {
		fieldType := sType.Field(i)
		fieldValue := sValue.Field(i)
		tagVal, val := fieldType.Tag.Lookup("validate")
		tagValues := strings.Split(tagVal, ",")

		if val {
			for _, tag := range tagValues {
				if(tag == "required") {
					err := required(fieldValue.Interface(), fieldType.Name)
					if err != nil {
						errors = append(errors, err)	 
					}
				}
			}
		}
	}

	return errors
}
