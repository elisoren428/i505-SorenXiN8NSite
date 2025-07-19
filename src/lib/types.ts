export interface N8NNode {
  parameters: Record<string, any>;
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  credentials?: Record<string, any>;
}

export interface N8NWorkflow {
  name: string;
  nodes: N8NNode[];
  connections: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  id: string;
  active: boolean;
  settings: Record<string, any>;
  tags: any[];
}


export interface GithubContent {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    type: "file" | "dir";
    _links: {
      self: string;
      git: string;
      html: string;
    };
  }
