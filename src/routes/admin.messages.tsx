import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { getMessagesAction, toggleMessageReadAction, PaginatedMessages } from '../features/messages';
import { useServerFn } from '@tanstack/react-start';
import { ListPane } from '../features/messages/components/ListPane';
import { DetailPane } from '../features/messages/components/DetailPane';

export const Route = createFileRoute('/admin/messages')({
  component: MessagesListComponent,
});

function MessagesListComponent() {
  const queryClient = useQueryClient();
  const getMessages = useServerFn(getMessagesAction);
  const toggleMessageRead = useServerFn(toggleMessageReadAction);

  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');

  const { data, isLoading, isFetching } = useQuery<PaginatedMessages>({
    queryKey: ['messages', page, pageSize, filter, searchQuery],
    queryFn: () => getMessages({ data: { page, pageSize, filter, search: searchQuery || undefined } }),
  });

  const messages = data?.messages || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 0;

  const selectedMessage = useMemo(() => {
    // If we have an explicit selection, try to find it in current messages
    if (selectedMessageId !== null) {
      const found = messages.find((m) => m.id === selectedMessageId);
      if (found) return found;
    }
    // Fallback: show first message but don't consider it an "explicit selection" for the auto-read effect
    return messages[0] || null;
  }, [selectedMessageId, messages]);

  const selectedIndex = useMemo(() => {
    if (!selectedMessage) return -1;
    return messages.findIndex((m) => m.id === selectedMessage.id);
  }, [selectedMessage, messages]);

  // Mark as read ONLY if it was an explicit selection by the user
  useEffect(() => {
    if (
      selectedMessageId !== null &&
      selectedMessage &&
      selectedMessage.id === selectedMessageId &&
      !selectedMessage.isRead
    ) {
      toggleMessageRead({ data: { id: selectedMessage.id, isRead: true } }).then(() => {
        // Refetch messages list and unread count
        queryClient.invalidateQueries({ queryKey: ['messages'] });
        queryClient.invalidateQueries({ queryKey: ['unread-messages-count'] });
      });
    }
  }, [selectedMessage, selectedMessageId, toggleMessageRead, queryClient]);

  const formatFullDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedMessageId(messages[selectedIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (selectedIndex < messages.length - 1) {
      setSelectedMessageId(messages[selectedIndex + 1].id);
    }
  };

  return (
    <div className={`messages-workspace ${isFetching ? 'messages-workspace--fetching' : ''}`}>
      {/* List Pane */}
      <ListPane
        messages={messages}
        selectedMessage={selectedMessage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
        setFilter={setFilter}
        setSelectedMessageId={setSelectedMessageId}
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        filter={filter}
        isLoading={isLoading}
      />

      {/* Detail Pane */}
      <DetailPane
        messages={messages}
        selectedMessage={selectedMessage}
        selectedIndex={selectedIndex}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePrev={handlePrev}
        formatFullDate={formatFullDate}
        formatTime={formatTime}
        isLoading={isLoading}
      />
    </div>
  );
}
