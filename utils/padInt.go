package utils

import "fmt"

func PadInt(i int) string {
	fmtInt := fmt.Sprintf("%02d", i)
	return fmtInt
}
