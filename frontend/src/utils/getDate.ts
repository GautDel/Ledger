export const getDate = ():string => {
    const today = new Date()
    const fmtDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
    return fmtDate 
}
