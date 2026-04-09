import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { setThemeAction } from '../features/theme/utils/theme-actions.functions';
import { ThemeType } from '../features/theme/utils/theme.types';

export const Route = createFileRoute('/admin/settings/themes')({
  component: ThemesComponent,
});

function ThemesComponent() {
  const { theme } = Route.useRouteContext();
  const setTheme = useServerFn(setThemeAction);
  const router = useRouter();

  const handleThemeChange = async (newTheme: ThemeType) => {
    if (newTheme === theme) return;
    await setTheme({ data: newTheme });
    router.invalidate();
  };

  const themes = [
    {
      id: 'nature' as ThemeType,
      name: 'Nature (Classic)',
      primary: '#006d36',
      secondary: '#f8f8f8',
    },
    {
      id: 'dark' as ThemeType,
      name: 'Dark (Modern)',
      primary: '#25f4f4',
      secondary: '#102222',
    },
  ];

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>Theme Settings</h1>
        <p>Choose your preferred interface theme. Your selection will be persisted across sessions.</p>

        <div className="theme-selector">
          {themes.map((t) => (
            <div
              key={t.id}
              className={`theme-card ${theme === t.id ? 'theme-card--active' : ''}`}
              onClick={() => handleThemeChange(t.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleThemeChange(t.id);
              }}
            >
              <div className="theme-card__preview">
                <div className="theme-card__color" style={{ backgroundColor: t.primary }}>
                  Primary
                </div>
                <div
                  className="theme-card__color"
                  style={{ backgroundColor: t.secondary, color: t.id === 'nature' ? '#000' : '#fff' }}
                >
                  Secondary
                </div>
              </div>
              <div className="theme-card__info">
                <span className="theme-card__name">{t.name}</span>
                {theme === t.id && (
                  <span className="theme-card__status">
                    <span className="material-symbols-outlined">check_circle</span>
                    Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
