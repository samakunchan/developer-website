import { Trans } from '@lingui/react/macro';
import { MessageOutput } from '../utils/schemas';
import { Button } from '../../../components/Button';

interface DetailPaneProps {
  messages: MessageOutput[];
  selectedMessage: MessageOutput | null;
  selectedIndex: number;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  handleNext: () => void;
  handlePrev: () => void;
  formatFullDate: (dateString: string) => string;
  formatTime: (dateString: string) => string;
  isLoading: boolean;
}

export const DetailPane = ({
  messages,
  selectedMessage,
  selectedIndex,
  page,
  pageSize,
  total,
  handleNext,
  handlePrev,
  formatFullDate,
  formatTime,
  isLoading,
}: DetailPaneProps) => {
  return (
    <aside className="messages-workspace__detail-pane">
      <main className="messages-workspace__detail-pane">
        {selectedMessage ? (
          <div className="message-detail">
            <header className="message-detail__header">
              <div className="message-detail__title-row">
                <div>
                  <span className="admin-profiles__header-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                    <Trans>Deployment Inquiry</Trans>
                  </span>
                  <h1 className="message-detail__title">{selectedMessage.serviceType.label} Pipeline</h1>
                </div>
                <div className="message-detail__counter">
                  <span className="text-xs text-slate-400 font-medium mr-4">
                    {selectedIndex + 1 + (page - 1) * pageSize} of {total}
                  </span>
                  <Button
                    className="p-2 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-30"
                    onClick={handlePrev}
                    disabled={selectedIndex <= 0}
                  >
                    <span className="material-symbols-outlined text-slate-500">keyboard_arrow_left</span>
                  </Button>
                  <Button
                    className="p-2 hover:bg-slate-100 rounded-lg transition-all disabled:opacity-30"
                    onClick={handleNext}
                    disabled={selectedIndex >= messages.length - 1}
                  >
                    <span className="material-symbols-outlined text-slate-500">keyboard_arrow_right</span>
                  </Button>
                </div>
              </div>

              <div className="message-detail__meta">
                <div className="message-detail__sender-avatar">
                  {selectedMessage.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div className="message-detail__sender-info">
                  <h4>{selectedMessage.fullName}</h4>
                  <p>{selectedMessage.email}</p>
                </div>
                <div className="message-detail__timestamp">
                  <p>{formatFullDate(selectedMessage.createdAt)}</p>
                  <p>{formatTime(selectedMessage.createdAt)}</p>
                </div>
              </div>
            </header>

            <div className="message-detail__content">
              <div className="message-detail__content-inner">
                <div className="message-detail__tags">
                  <div className="message-detail__tag">
                    <span className="material-symbols-outlined">settings</span>
                    {selectedMessage.serviceType.label}
                  </div>
                  <div className="message-detail__tag">
                    <span className="material-symbols-outlined">payments</span>
                    {selectedMessage.priceRangeType.label} {selectedMessage.priceRangeType.currency}
                  </div>
                </div>

                <article className="message-detail__body">{selectedMessage.projectBrief}</article>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="messages-workspace__empty">
            <Trans>Loading details...</Trans>
          </div>
        ) : (
          <div className="messages-workspace__empty">
            <span className="material-symbols-outlined messages-workspace__empty-icon">drafts</span>
            <h3>
              <Trans>Select a message to view details</Trans>
            </h3>
          </div>
        )}
      </main>
    </aside>
  );
};
