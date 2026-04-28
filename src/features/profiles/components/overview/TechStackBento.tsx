import React from 'react';
import { CategoryStackType } from '../../utils/schemas';

type TechStack = {
  id: number;
  name: string;
  category: CategoryStackType;
};

type TechStackBentoProps = {
  stacks: TechStack[];
};

type CategoryStack = {
  value: CategoryStackType;
  label: string;
  icon: string;
};

const DISPLAY_CATEGORIES: CategoryStack[] = [
  { value: 'frontend', label: 'Frontend', icon: 'layers' },
  { value: 'backend', label: 'Backend', icon: 'database' },
  { value: 'devops', label: 'DevOps', icon: 'terminal' },
  { value: 'cloud', label: 'Cloud', icon: 'cloud' },
];

export const TechStackBento: React.FC<TechStackBentoProps> = ({ stacks }) => {
  const getStacksByCategory = (category: CategoryStackType) => {
    return stacks.filter((s) => s.category === category);
  };

  return (
    <div className="bento-grid">
      {DISPLAY_CATEGORIES.map((cat: CategoryStack) => (
        <div key={cat.value} className="card card--light">
          <span className="material-symbols-outlined card__subtitle card__icon-lg tech-stack-manager__category-header">
            {cat.icon}
          </span>
          <span className="card__subtitle card__subtitle--primary">{cat.label}</span>
          <div className="admin-profiles__stack-list tech-stack-manager__list">
            {getStacksByCategory(cat.value).map((s) => (
              <span key={s.id} className="admin-profiles__stack-item">
                {s.name}
              </span>
            ))}
            {getStacksByCategory(cat.value).length === 0 && (
              <span className="text-xs text-slate-400 italic">Aucune compétence ajoutée</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
