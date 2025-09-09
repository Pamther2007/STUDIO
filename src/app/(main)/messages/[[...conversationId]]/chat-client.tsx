'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { User, Conversation, Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, ArrowLeft } from 'lucide-react';
import { format, formatDistanceToNowStrict } from 'date-fns';

function ConversationList({
  conversations,
  currentUser,
  users,
  selectedConversationId,
}: {
  conversations: Conversation[];
  currentUser: User;
  users: User[];
  selectedConversationId?: number;
}) {
  const router = useRouter();

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-2">
        {conversations.map((convo) => {
          const partnerId = convo.participantIds.find((id) => id !== currentUser.id);
          const partner = users.find((u) => u.id === partnerId);
          if (!partner) return null;

          const isSelected = convo.id === selectedConversationId;
          const isUnread = !convo.lastMessage.read && convo.lastMessage.senderId !== currentUser.id;

          return (
            <button
              key={convo.id}
              onClick={() => router.push(`/messages/${convo.id}`)}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg text-left transition-colors w-full',
                isSelected ? 'bg-secondary' : 'hover:bg-secondary/50',
                isUnread && 'font-bold'
              )}
            >
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={partner.avatar} />
                <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="flex justify-between items-center">
                  <p className="truncate">{partner.name}</p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNowStrict(new Date(convo.lastMessage.timestamp))}
                  </p>
                </div>
                <p className={cn(
                  'text-sm text-muted-foreground truncate',
                  isUnread && 'text-foreground'
                )}>
                  {convo.lastMessage.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}

function MessageBubble({ message, isCurrentUser }: { message: Message; isCurrentUser: boolean }) {
  return (
    <div className={cn('flex items-end gap-2', isCurrentUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl',
          isCurrentUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-secondary rounded-bl-none'
        )}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
}

function ChatView({
  conversation,
  messages,
  currentUser,
  users,
}: {
  conversation: Conversation;
  messages: Message[];
  currentUser: User;
  users: User[];
}) {
  const router = useRouter();
  const partner = users.find(u => u.id === conversation.participantIds.find(id => id !== currentUser.id));
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    console.log('Sending message:', newMessage);
    // In a real app, you would call an API to send the message
    setNewMessage('');
  };

  if (!partner) return null;

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center gap-4 p-4 border-b">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push('/messages')}>
            <ArrowLeft />
        </Button>
        <Avatar>
          <AvatarImage src={partner.avatar} />
          <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{partner.name}</p>
          <p className="text-xs text-muted-foreground">
            Last seen {formatDistanceToNowStrict(new Date())} ago
          </p>
        </div>
      </header>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isCurrentUser={msg.senderId === currentUser.id}
            />
          ))}
        </div>
      </ScrollArea>
      <footer className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizonal />
          </Button>
        </form>
      </footer>
    </div>
  );
}

function EmptyChatView() {
    return (
        <div className="hidden md:flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-secondary/50">
            <MessageSquare size={64} className="mb-4" />
            <h3 className="text-xl font-semibold">Select a conversation</h3>
            <p className="max-w-xs">
                Choose one of your existing conversations on the left to start chatting.
            </p>
        </div>
    )
}

export function ChatClient({
  currentUser,
  conversations,
  selectedConversation,
  messages,
  users,
}: {
  currentUser: User;
  conversations: Conversation[];
  selectedConversation?: Conversation;
  messages: Message[];
  users: User[];
}) {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr] h-[calc(100vh-4rem)]">
      <aside className={cn(
        "border-r flex-col h-full",
        selectedConversation ? "hidden md:flex" : "flex"
      )}>
        <header className="p-4 border-b">
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
        </header>
        <ConversationList
          conversations={conversations}
          currentUser={currentUser}
          users={users}
          selectedConversationId={selectedConversation?.id}
        />
      </aside>
      <main className={cn(
        "h-full",
        selectedConversation ? "flex" : "hidden md:flex"
      )}>
        {selectedConversation ? (
          <ChatView
            conversation={selectedConversation}
            messages={messages}
            currentUser={currentUser}
            users={users}
          />
        ) : (
          <EmptyChatView />
        )}
      </main>
    </div>
  );
}
