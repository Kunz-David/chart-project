export type ChartData = {
  category: string;
  progress: number;
  complexity: number;
  issues: GitHubIssue[];
}

export type IssueStatus = "open" | "closed" | "in-progress";

export type GitHubIssue = {
  id: number;
  title: string;
  status: IssueStatus;
  creator: string;
  assignee: string;
  labels: string[];
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

export type Margin = { top: number, bottom: number, left: number, right: number }