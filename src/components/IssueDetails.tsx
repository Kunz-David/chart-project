import React from 'react'
import {GitHubIssue} from "../types.ts"
import StatusBadge from "./StatusBadge.tsx"

interface IssueDetailsProps {
  issue: GitHubIssue;
}

const IssueDetails: React.FC<IssueDetailsProps> = ({issue}) => {

  return (
    <div className="p-4 m-2 bg-gray-50 shadow rounded-lg" data-testid="issue-details">
      <div className="flex justify-between items-start mb-2">
        <span className="flex-row items-end">
          <h2 className="text-xl font-bold max-w">{issue.title}</h2>
          <>&nbsp; #{issue.id}</>
        </span>
        <StatusBadge status={issue.status}/>
      </div>
      <p>Status: <span className="font-semibold">{issue.status}</span></p>
      <p>Creator: <span className="font-semibold">{issue.creator}</span></p>
      <p>Assignee: <span className="font-semibold">{issue.assignee}</span></p>
      <p>Created At: <span className="font-semibold">{issue.createdAt.toDateString()}</span></p>
      <p>Updated At: <span className="font-semibold">{issue.updatedAt.toDateString()}</span></p>
      <p>Labels: <span className="font-semibold">{issue.labels.join(', ')}</span></p>
      <p className="mt-4">Description: </p>
      <p className="text-sm">{issue.description}</p>
    </div>
  )
}

export default IssueDetails
