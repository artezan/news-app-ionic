export const FormatDate = (date: string) => {
const d = new Date(date)
return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
}