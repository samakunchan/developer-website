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
      category: 'Défaut',
    },
    {
      id: 'light' as ThemeType,
      name: 'Light (Blue)',
      primary: '#0660f2',
      secondary: '#ffffff',
      category: 'Défaut',
    },
    {
      id: 'forest' as ThemeType,
      name: 'Forest',
      primary: '#006d36',
      secondary: '#f8f8f8',
      category: 'Nature',
    },
    {
      id: 'ocean' as ThemeType,
      name: 'Ocean',
      primary: '#0b1326',
      secondary: '#8ed5ff',
      category: 'Nature',
    },
    {
      id: 'desert' as ThemeType,
      name: 'Desert',
      primary: '#974225',
      secondary: '#fcf9f4',
      category: 'Nature',
    },
    // {
    //   id: 'guardian' as ThemeType,
    //   name: 'Guardian',
    //   primary: '#974225',
    //   secondary: '#fcf9f4',
    //   category: 'Vaisseaux',
    // },
    // {
    //   id: 'aegis' as ThemeType,
    //   name: 'Aegis',
    //   primary: '#974225',
    //   secondary: '#fcf9f4',
    //   category: 'Vaisseaux',
    // },
  ];

  // Group themes by category
  const groupedThemes = themes.reduce(
    (acc, theme) => {
      if (!acc[theme.category]) {
        acc[theme.category] = [];
      }
      acc[theme.category].push(theme);
      return acc;
    },
    {} as Record<string, ITheme[]>,
  );

  // Sort categories (Défaut first, then alphabetical)
  const sortedCategories = Object.keys(groupedThemes).sort((a, b) => {
    if (a === 'Défaut') return -1;
    if (b === 'Défaut') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>
          <Trans>Themes</Trans>
        </h1>
        <p className="admin-profiles__header-desc">
          Choisissez le thème d'interface que vous préférez. Votre sélection sera conservée.
        </p>

        {sortedCategories.map((category) => (
          <div key={category} className="theme-category">
            <h2 className="theme-category__title">{category}</h2>
            <div className="theme-selector">
              {groupedThemes[category].map((availableTheme: ITheme) => (
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
                        color: availableTheme.id === 'forest' || availableTheme.id === 'light' ? '#000' : '#fff',
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
        ))}
      </div>
    </div>
  );
}
