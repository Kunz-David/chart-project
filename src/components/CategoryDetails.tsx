import IssueDetails from "./IssueDetails.tsx"
import {ChartData} from "../types.ts"


export interface CategoryDetailsProps {
  datum: ChartData
}

export function CategoryDetails({datum}: CategoryDetailsProps) {

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-2">{datum.category}</h2>
      <p>Importance: <span className="font-semibold">{datum.importance}</span></p>
      <p>Progress: <span className="font-semibold">{datum.progress}%</span></p>
      <div className="overflow-y-scroll flex-grow">
        {datum.issues.map((issue) => (
          <IssueDetails key={issue.id} issue={issue}/>
        ))}
      </div>
    </div>
  )
}
