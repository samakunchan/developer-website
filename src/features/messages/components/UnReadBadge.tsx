import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getUnreadMessagesCountAction } from '../utils/messages-actions.functions';

export const UnReadBadge = () => {
  const getUnreadCount = useServerFn(getUnreadMessagesCountAction);

  const { data: count } = useQuery({
    queryKey: ['unread-messages-count'],
    queryFn: () => getUnreadCount(),
    refetchInterval: 30000,
  });

  if (count === undefined || count <= 0) return null;

  return <span className="admin-sidebar__badge">{count > 99 ? '99+' : count}</span>;
};
