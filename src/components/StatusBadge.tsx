import {IssueStatus} from "../types.ts"


const statusStyleMap: Record<IssueStatus, string> = {
  "in-progress": "bg-yellow-100 text-yellow-800", //dark:bg-yellow-900 dark:text-yellow-300
  closed: "bg-red-100 text-red-800", //dark:bg-red-900 dark:text-red-300
  open: "bg-green-100 text-green-800" //dark:bg-green-900 dark:text-green-300
}

const statusNameMap: Record<IssueStatus, string> = {
  "in-progress": "In Progress",
  closed: "Closed",
  open: "Open"
}

export default function StatusBadge({status}: {status: IssueStatus}) {

  return (
    <span className={"text-sm font-medium px-2.5 py-0.5 pb-1 rounded-full m-1" + " " + statusStyleMap[status]}>{statusNameMap[status]}</span>
  )
}