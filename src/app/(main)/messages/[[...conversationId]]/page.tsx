import { getCurrentUser, users, conversations, getMessages } from '@/lib/data';
import { ChatClient } from './chat-client';
import type { User, Conversation } from '@/lib/types';
import { notFound } from 'next/navigation';

export default function MessagesPage({ params }: { params: { conversationId?: string[] } }) {
  const currentUser = getCurrentUser();
  const conversationIdStr = params.conversationId?.[0];
  let selectedConversation: Conversation | undefined;
  let messages = [];

  if (conversationIdStr) {
    const conversationId = parseInt(conversationIdStr, 10);
    selectedConversation = conversations.find(c => c.id === conversationId);
    
    if (!selectedConversation || !selectedConversation.participantIds.includes(currentUser.id)) {
      notFound();
    }
    messages = getMessages(conversationId);
  }

  const userConversations = conversations
    .filter(c => c.participantIds.includes(currentUser.id))
    .sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());

  return (
    <ChatClient
      currentUser={currentUser}
      conversations={userConversations}
      selectedConversation={selectedConversation}
      messages={messages}
      users={users}
    />
  );
}
