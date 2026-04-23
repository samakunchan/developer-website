import React, { useState, useEffect, useRef } from 'react';
import { t } from '@lingui/core/macro';
import { useServerFn } from '@tanstack/react-start';
import { searchGlobal } from '../features/search/utils/search-actions.functions';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const AdminSearchbar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchGlobalFn = useServerFn(searchGlobal);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: results, isLoading } = useQuery({
    queryKey: ['globalSearch', debouncedQuery],
    queryFn: () => searchGlobalFn({ data: debouncedQuery }),
    enabled: debouncedQuery.length >= 2,
  });

  return (
    <div className="admin-toolbar__search" ref={containerRef}>
      <label htmlFor="admin-toolbar__search-input" className="material-symbols-outlined admin-toolbar__search-icon">
        search
      </label>
      <input
        type="text"
        id="admin-toolbar__search-input"
        className="admin-toolbar__search-input"
        placeholder={t`Search tasks, code, or projects...`}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && debouncedQuery.length >= 2 && (
        <div className="admin-toolbar__search-results">
          {isLoading && <div style={{ padding: '0.75rem', textAlign: 'center' }}>{t`Searching...`}</div>}

          {!isLoading && results?.length === 0 && (
            <div style={{ padding: '0.75rem', textAlign: 'center', color: 'var(--text-color-secondary)' }}>
              {t`No results found`}
            </div>
          )}

          {!isLoading && results && results.length > 0 && (
            <ul>
              {results.map((result) => (
                <li
                  key={`${result.itemType}-${result.itemId}`}
                  onClick={() => {
                    if (result.itemType === 'Project') {
                      navigate({
                        to: '/admin/projects/$projectId/edit',
                        params: { projectId: result.itemId.toString() },
                      });
                    }
                    setIsOpen(false);
                  }}
                >
                  <div>
                    <span>
                      <span>{result.itemType}</span>
                      {result.category ? (
                        <>
                          {' - '}
                          <span>{result.category}</span>
                        </>
                      ) : (
                        ''
                      )}
                    </span>
                    <span>
                      {result.content.substring(0, 100)}
                      {result.content.length > 100 ? '...' : ''}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
