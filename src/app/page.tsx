'use client';

import { generateSmartReplies } from '@/ai/flows/smart-replies';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserAvatar } from '@/components/user-avatar';
import { conversations as initialConversations, loggedInUser } from '@/lib/data';
import type { Conversation, Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check, CheckCheck, CornerDownLeft, Mic, Paperclip, SendHorizontal, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

export default function ChronoChatPage() {
  const [conversations, setConversations] = React.useState<Conversation[]>(initialConversations);
  const [selectedId, setSelectedId] = React.useState<string>(conversations[0].id);

  const selectedConversation = React.useMemo(() => {
    return conversations.find((c) => c.id === selectedId);
  }, [conversations, selectedId]);

  const handleSendMessage = (messageContent: string) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: `${Date.now()}`,
      content: messageContent,
      sender: loggedInUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <UserAvatar user={loggedInUser} className="h-10 w-10" />
              <h1 className="font-headline text-lg font-bold">{loggedInUser.name}</h1>
            </div>
            <ThemeToggle />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <ChatList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="bg-background/80 backdrop-blur-sm">
        {selectedConversation ? (
          <ChatDisplay
            key={selectedConversation.id}
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

function ChatList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {conversations.map((conv) => {
        const otherUser = conv.users.find((u) => u.id !== loggedInUser.id);
        const lastMessage = conv.messages[conv.messages.length - 1];
        if (!otherUser) return null;

        return (
          <Button
            key={conv.id}
            variant={selectedId === conv.id ? 'secondary' : 'ghost'}
            className="h-auto justify-start p-3 text-left"
            onClick={() => onSelect(conv.id)}
          >
            <UserAvatar user={otherUser} className="h-10 w-10" />
            <div className="ml-3 w-full overflow-hidden">
              <div className="flex items-baseline justify-between">
                <p className="font-semibold truncate">{otherUser.name}</p>
                <p className="text-xs text-muted-foreground">{lastMessage.timestamp}</p>
              </div>
              <p className="text-sm text-muted-foreground truncate">{lastMessage.content}</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
}

function ChatDisplay({
  conversation,
  onSendMessage,
}: {
  conversation: Conversation;
  onSendMessage: (content: string) => void;
}) {
  const otherUser = conversation.users.find((u) => u.id !== loggedInUser.id);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [conversation.messages]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/50 px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          {otherUser && <UserAvatar user={otherUser} />}
          <div>
            <p className="font-headline font-semibold">{otherUser?.name}</p>
            <p className="text-xs text-muted-foreground">{otherUser?.online ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        {/* Actions can go here */}
      </header>
      <div className="flex-1 overflow-y-auto">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 md:p-6">
            <MessageList messages={conversation.messages} />
          </div>
        </ScrollArea>
      </div>
      <footer className="shrink-0 border-t bg-background/50 p-2 md:p-4">
        <ChatBottomBar conversation={conversation} onSendMessage={onSendMessage} />
      </footer>
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {/* Typing indicator placeholder */}
      {/* <MessageBubble message={{ ... }} isTyping /> */}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isSentByMe = message.sender.id === loggedInUser.id;

  const MessageStatus = () => {
    if (message.status === 'read') {
      return <CheckCheck className="size-4 text-primary" />;
    }
    if (message.status === 'delivered') {
      return <CheckCheck className="size-4" />;
    }
    return <Check className="size-4" />;
  };

  return (
    <div className={cn('flex items-end gap-3', isSentByMe && 'flex-row-reverse')}>
      <UserAvatar user={message.sender} className="h-8 w-8" />
      <div
        className={cn(
          'max-w-xs md:max-w-md lg:max-w-2xl rounded-2xl p-3 px-4 shadow-md',
          isSentByMe
            ? 'rounded-br-none bg-primary text-primary-foreground'
            : 'rounded-bl-none bg-secondary text-secondary-foreground'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div className={cn('mt-1 flex items-center gap-2', isSentByMe ? 'justify-end' : 'justify-start')}>
          <p className="text-xs opacity-70">{message.timestamp}</p>
          {isSentByMe && <MessageStatus />}
        </div>
      </div>
    </div>
  );
}

function ChatBottomBar({
  conversation,
  onSendMessage,
}: {
  conversation: Conversation;
  onSendMessage: (content: string) => void;
}) {
  const [input, setInput] = React.useState('');
  const [loadingReplies, setLoadingReplies] = React.useState(false);
  const [smartReplies, setSmartReplies] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const lastMessage = conversation.messages[conversation.messages.length - 1];

  React.useEffect(() => {
    if (lastMessage && lastMessage.sender.id !== loggedInUser.id) {
      setLoadingReplies(true);
      setSmartReplies([]);
      generateSmartReplies({ message: lastMessage.content })
        .then((res) => setSmartReplies(res.replies))
        .catch((err) => console.error('Error fetching smart replies:', err))
        .finally(() => setLoadingReplies(false));
    } else {
      setSmartReplies([]);
    }
  }, [lastMessage]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
      setSmartReplies([]);
    }
  };

  const handleSmartReplyClick = (reply: string) => {
    onSendMessage(reply);
    setSmartReplies([]);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {(loadingReplies || smartReplies.length > 0) && (
        <div className="flex min-h-[2.5rem] w-full flex-wrap items-center gap-2">
          {loadingReplies && <p className="text-sm text-muted-foreground animate-pulse">Getting smart replies...</p>}
          {!loadingReplies &&
            smartReplies.map((reply) => (
              <Button key={reply} variant="outline" size="sm" onClick={() => handleSmartReplyClick(reply)}>
                {reply}
              </Button>
            ))}
        </div>
      )}
      <div className="relative flex w-full items-end">
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="min-h-12 w-full resize-none rounded-2xl border-2 border-transparent bg-secondary p-3 pr-24 focus:border-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Paperclip className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mic className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voice message</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <SendHorizontal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
