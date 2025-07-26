export type User = {
  id: string;
  name: string;
  avatar: string;
  dataAiHint?: string;
  online: boolean;
};

export type Message = {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
};

export type Conversation = {
  id: string;
  users: User[];
  messages: Message[];
};
