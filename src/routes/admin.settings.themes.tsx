import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { ITheme, setThemeAction, ThemeType } from '../features/theme';
import { Trans } from '@lingui/react/macro';

export const Route = createFileRoute('/admin/settings/themes')({
  component: ThemesComponent,
});

function ThemesComponent() {
  const { theme: currentTheme } = Route.useRouteContext();
  const setTheme = useServerFn(setThemeAction);
  const router = useRouter();

  const handleThemeChange = async (newTheme: ThemeType) => {
    console.log(newTheme);
    if (newTheme === currentTheme) return;
    await setTheme({ data: newTheme });
    router.invalidate();
  };

  const themes: ITheme[] = [
    {
      id: 'dark' as ThemeType,
      name: 'Dark (Modern)',
      primary: '#25f4f4',
      secondary: '#102222',
    },
    {
      id: 'light' as ThemeType,
      name: 'Light (Blue)',
      primary: '#3c83f6',
      secondary: '#ffffff',
    },
    {
      id: 'nature' as ThemeType,
      name: 'Nature (Forest)',
      primary: '#006d36',
      secondary: '#f8f8f8',
    },
    {
      id: 'ocean' as ThemeType,
      name: 'Nature (Ocean)',
      primary: '#0b1326',
      secondary: '#8ed5ff',
    },
    {
      id: 'desert' as ThemeType,
      name: 'Nature (Desert)',
      primary: '#974225',
      secondary: '#fcf9f4',
    },
  ];

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>
          <Trans>Themes</Trans>
        </h1>
        <p className="admin-profiles__header-desc">
          Choisissez le thème d'interface que vous préférez. Votre sélection sera conservée.
        </p>

        <div className="theme-selector">
          {themes.map((availableTheme: ITheme) => (
            <div
              key={availableTheme.id}
              className={`theme-card ${currentTheme === availableTheme.id ? 'theme-card--active' : ''}`}
              onClick={() => handleThemeChange(availableTheme.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleThemeChange(availableTheme.id);
              }}
            >
              <div className="theme-card__preview">
                <div className="theme-card__color" style={{ backgroundColor: availableTheme.primary }}>
                  Primary
                </div>
                <div
                  className="theme-card__color"
                  style={{
                    backgroundColor: availableTheme.secondary,
                    color: availableTheme.id === 'nature' || availableTheme.id === 'light' ? '#000' : '#fff',
                  }}
                >
                  Secondary
                </div>
              </div>
              <div className="theme-card__info">
                <span className="theme-card__name">{availableTheme.name}</span>
                {currentTheme === availableTheme.id && (
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
