'use client';

import type { Recipe } from '@family-hub/shared';
import { useLocale, useTranslations } from 'next-intl';
import { X, Clock, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  const locale = useLocale();
  const t = useTranslations('kitchen');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const title = locale === 'he' ? recipe.titleHe : recipe.title;
  const description = locale === 'he' ? recipe.descriptionHe : recipe.description;
  const ingredients = locale === 'he' ? recipe.ingredientsHe : recipe.ingredients;

  function toggleStep(id: string) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
      <div className="bg-white w-full max-w-2xl mx-auto rounded-t-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-sand-100">
          <div className="flex-1 min-w-0 pe-3">
            <h2 className="font-bold text-gray-800 text-lg leading-tight">{title}</h2>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={11} /> {recipe.prepMinutes} min
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {t(`difficulty.${recipe.difficulty}`)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sand-100 transition-colors tap-target shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
          {/* Ingredients */}
          <section>
            <h3 className="section-title mb-2">{t('ingredients')}</h3>
            <ul className="space-y-1.5">
              {ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          {recipe.steps.length > 0 && (
            <section>
              <h3 className="section-title mb-2">{t('steps')}</h3>
              <div className="space-y-3">
                {recipe.steps.map((step) => {
                  const instruction =
                    locale === 'he' ? step.instructionHe : step.instruction;
                  const done = completedSteps.has(step.id);
                  return (
                    <button
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      className="w-full flex items-start gap-3 text-left"
                    >
                      <div className="shrink-0 mt-0.5">
                        {done ? (
                          <CheckCircle2 size={18} className="text-sage-500" />
                        ) : (
                          <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-200 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-gray-400">
                              {step.order}
                            </span>
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          done ? 'text-gray-300 line-through' : 'text-gray-700'
                        }`}
                      >
                        {instruction}
                        {step.durationMin && (
                          <span className="ms-1 text-gray-400 text-xs">
                            ({step.durationMin} min)
                          </span>
                        )}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
