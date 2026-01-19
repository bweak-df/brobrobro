export interface Story {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Supports basic HTML or Markdown-like text
  type: 'story' | 'poem';
}

export interface AdminState {
  isAuthenticated: boolean;
  draftTitle: string;
  draftDate: string;
  draftContent: string;
  draftType: 'story' | 'poem';
  draftExcerpt: string;
}