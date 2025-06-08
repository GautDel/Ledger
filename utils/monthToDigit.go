package utils

import (
	"fmt"
	"time"
)

func MonthToDigit() string {
	now := time.Now()
	month := now.Month()
	formattedMonth := fmt.Sprintf("%02d", int(month))

	return formattedMonth
}
