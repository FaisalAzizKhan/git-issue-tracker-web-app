interface IIssue {
    issue_id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
}

interface IIssue {
  issue_id: string;
  title: string;
  description?: string;
  status: String;
  labels?: string[];
};

interface IIssueComment {
  issue_comment_id: string;
  comment: string;
  created_at: string;
};