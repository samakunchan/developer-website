import React, { useState } from 'react';
import { CategoryStackType } from '../../utils/schemas';

export type TechStackItem = {
  id: number;
  name: string;
  category: CategoryStackType;
};

type TechStackManagerProps = {
  stacks: TechStackItem[];
  onAdd: (name: string, category: CategoryStackType) => void;
  onRemove: (id: number) => void;
  isAdding?: boolean;
  removingId?: number | null;
};

const CATEGORIES: { value: CategoryStackType; label: string; icon: string }[] = [
  { value: 'frontend', label: 'Frontend', icon: 'layers' },
  { value: 'backend', label: 'Backend', icon: 'database' },
  { value: 'devops', label: 'DevOps & Infrastructure', icon: 'terminal' },
  { value: 'cloud', label: 'Cloud Services', icon: 'cloud' },
  { value: 'testing', label: 'QA & Testing', icon: 'biotech' },
  { value: 'mobile', label: 'Mobile Development', icon: 'smartphone' },
];

export const TechStackManager: React.FC<TechStackManagerProps> = ({
  stacks,
  onAdd,
  onRemove,
  isAdding = false,
  removingId = null,
}) => {
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryStackType>('frontend');

  const getStacksByCategory = (category: CategoryStackType) => {
    return stacks.filter((s) => s.category === category);
  };

  const handleAdd = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim(), newCategory);
      setNewName('');
    }
  };

  return (
    <div className="admin-profiles__v-stack">
      {/* Add New Tech Form */}
      <section className="card card--light">
        <div className="card__header tech-stack-manager__header">
          <h3 className="card__title">Ajouter une nouvelle technologie</h3>
        </div>

        <form onSubmit={handleAdd} className="admin-profiles__form-grid admin-profiles__card-item-spacing">
          <div className="admin-profiles__form-group">
            <label className="admin-profiles__form-label">Nom de la technologie</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. React, PostgreSQL"
              className="admin-profiles__form-input"
              autoFocus
            />
          </div>
          <div className="admin-profiles__form-group">
            <label className="admin-profiles__form-label">Catégorie</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as CategoryStackType)}
              className="admin-profiles__form-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-profiles__form-grid-full admin-profiles__form-actions">
            <button type="submit" className="btn btn--primary" disabled={!newName.trim() || isAdding}>
              {isAdding ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </section>

      {/* Categories Grid */}
      <div className="bento-grid">
        {CATEGORIES.map((cat) => (
          <div key={cat.value} className="card card--light">
            <div className="card__header">
              <span className="material-symbols-outlined card__subtitle card__icon-lg tech-stack-manager__category-header">
                {cat.icon}
              </span>
              <span className="card__subtitle card__subtitle--primary">{cat.label}</span>
            </div>
            <div className="admin-profiles__stack-list tech-stack-manager__list">
              {getStacksByCategory(cat.value).map((tech: TechStackItem) => (
                <span key={tech.id} className="admin-profiles__stack-item">
                  {tech.name}
                  <span
                    className={`material-symbols-outlined admin-profiles__stack-remove ${
                      removingId === tech.id ? 'admin-profiles__stack-remove--removing' : ''
                    }`}
                    onClick={() => !removingId && onRemove(tech.id)}
                    title="Supprimer"
                  >
                    {removingId === tech.id ? 'sync' : 'close'}
                  </span>
                </span>
              ))}
              {getStacksByCategory(cat.value).length === 0 && (
                <span className="text-xs text-slate-400 italic">Aucun item</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
