import { Trans } from '@lingui/react/macro';
import { Button } from '../../../components/Button';

export const ListPane = ({
  filter,
  page,
  isLoading,
  searchQuery,
  messages,
  totalPages,
  pageSize,
  selectedMessage,
  setSearchQuery,
  setPage,
  setFilter,
  setSelectedMessageId,
  setPageSize,
}) => {
  const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  return (
    <aside className="messages-workspace__list-pane">
      <div className="messages-workspace__search-container">
        <div className="messages-workspace__search-wrapper">
          <span className="material-symbols-outlined messages-workspace__search-icon">search</span>
          <input
            type="text"
            className="messages-workspace__search-input"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      <div className="messages-workspace__filters">
        <button
          className={`messages-workspace__filter-btn ${filter === 'all' ? 'messages-workspace__filter-btn--active' : ''}`}
          onClick={() => {
            setFilter('all');
            setPage(1);
            setSelectedMessageId(null);
          }}
        >
          <Trans>All</Trans>
        </button>
        <button
          className={`messages-workspace__filter-btn ${filter === 'unread' ? 'messages-workspace__filter-btn--active' : ''}`}
          onClick={() => {
            setFilter('unread');
            setPage(1);
            setSelectedMessageId(null);
          }}
        >
          <Trans>Unread</Trans>
        </button>
        <button
          className={`messages-workspace__filter-btn ${filter === 'read' ? 'messages-workspace__filter-btn--active' : ''}`}
          onClick={() => {
            setFilter('read');
            setPage(1);
            setSelectedMessageId(null);
          }}
        >
          <Trans>Read</Trans>
        </button>
      </div>

      <div className="messages-workspace__list">
        {isLoading && page === 1 ? (
          <div className="messages-workspace__loading-placeholder">
            <Trans>Loading...</Trans>
          </div>
        ) : messages.length === 0 ? (
          <div className="messages-workspace__empty">
            <span className="material-symbols-outlined messages-workspace__empty-icon">mail_outline</span>
            <p>
              <Trans>No messages found</Trans>
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message-item${selectedMessage?.id === message.id ? ' message-item--selected' : ''}${message.isRead ? '' : ' message-item--unread'}`}
              onClick={() => setSelectedMessageId(message.id)}
            >
              {!message.isRead && <div className="message-item__unread-dot" />}
              <div className="message-item__header">
                <span className="message-item__name">{message.fullName}</span>
                <span className="message-item__date">{formatTime(message.createdAt)}</span>
              </div>
              <h3 className="message-item__subject">{message.serviceType.label}</h3>
              <p className="message-item__snippet">{message.projectBrief}</p>
            </div>
          ))
        )}
      </div>

      {/* Pagination Footer */}
      <footer className="messages-workspace__pagination">
        <select
          className="messages-workspace__page-size"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>

        <div className="messages-workspace__page-controls">
          <Button
            className="messages-workspace__page-btn"
            disabled={page <= 1}
            onClick={() => setPage((p: number) => p - 1)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </Button>
          <span>
            {page} / {totalPages || 1}
          </span>
          <Button
            className="messages-workspace__page-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p: number) => p + 1)}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </Button>
        </div>
      </footer>
    </aside>
  );
};
