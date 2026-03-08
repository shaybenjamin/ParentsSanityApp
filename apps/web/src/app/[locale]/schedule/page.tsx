'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { RotateCcw, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { ScheduleItemRow } from '@/components/features/schedule/ScheduleItemRow';
import { scheduleApi } from '@/lib/api/schedule';
import type { DailySchedule, RoutineTemplate, Segment } from '@family-hub/shared';

const SEGMENT_ORDER: Segment[] = ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'];

export default function SchedulePage() {
  const t = useTranslations('schedule');
  const locale = useLocale();

  const [schedule, setSchedule] = useState<DailySchedule | null>(null);
  const [templates, setTemplates] = useState<RoutineTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeTab, setActiveTab] = useState<'today' | 'templates'>('today');

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [sched, tmpl] = await Promise.all([
        scheduleApi.getToday(),
        scheduleApi.getTemplates(),
      ]);
      setSchedule(sched);
      setTemplates(tmpl);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(id: string, isCompleted: boolean) {
    await scheduleApi.toggleItem(id, isCompleted);
    const updated = await scheduleApi.getToday();
    setSchedule(updated);
  }

  async function handleApplyTemplate(templateId: string) {
    const updated = await scheduleApi.applyTemplate(templateId);
    setSchedule(updated);
    setShowTemplates(false);
  }

  async function handleReset() {
    const updated = await scheduleApi.resetDay();
    setSchedule(updated ?? null);
  }

  if (loading) return <PageLoader />;

  const items = schedule?.items ?? [];
  const bySegment = SEGMENT_ORDER.reduce<Record<Segment, typeof items>>(
    (acc, seg) => {
      acc[seg] = items.filter((i) => i.segment === seg);
      return acc;
    },
    { MORNING: [], AFTERNOON: [], EVENING: [], NIGHT: [] },
  );

  const completed = items.filter((i) => i.isCompleted).length;

  return (
    <div className="space-y-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">{t('title')}</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw size={14} />
            {t('resetDay')}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-sand-100 rounded-xl p-1">
        {(['today', 'templates'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-sage-700 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            {tab === 'today' ? t('todayTab') : t('templatesTab')}
          </button>
        ))}
      </div>

      {activeTab === 'today' && (
        <>
          {/* Progress summary */}
          {items.length > 0 && (
            <div className="flex items-center gap-2 px-1">
              <div className="flex-1 h-1.5 bg-sand-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sage-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((completed / items.length) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {completed}/{items.length}
              </span>
            </div>
          )}

          {/* Apply template button (if no items) */}
          {items.length === 0 && templates.length > 0 && (
            <Card>
              <EmptyState
                icon="📅"
                title={t('noItems')}
                description={t('applyTemplate')}
                action={
                  <Button onClick={() => setShowTemplates(true)}>
                    {t('applyTemplate')}
                  </Button>
                }
              />
            </Card>
          )}

          {/* Template picker */}
          {(showTemplates || items.length === 0) && templates.length > 0 && items.length === 0 && (
            <div className="space-y-2">
              {templates.map((tmpl) => (
                <Card
                  key={tmpl.id}
                  padding="sm"
                  className="cursor-pointer hover:border-sage-300 transition-colors"
                  onClick={() => handleApplyTemplate(tmpl.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {locale === 'he' ? tmpl.nameHe : tmpl.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {tmpl.items.length} items
                      </p>
                    </div>
                    {tmpl.isDefault && (
                      <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full">
                        {t('defaultTemplate')}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* If there are items but user wants to switch template */}
          {items.length > 0 && (
            <div>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="text-xs text-sage-600 flex items-center gap-1 hover:underline mb-2"
              >
                {t('applyTemplate')} <ChevronDown size={12} />
              </button>
              {showTemplates && (
                <div className="space-y-2 mb-3">
                  {templates.map((tmpl) => (
                    <Card
                      key={tmpl.id}
                      padding="sm"
                      className="cursor-pointer hover:border-sage-300 transition-colors"
                      onClick={() => handleApplyTemplate(tmpl.id)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">
                          {locale === 'he' ? tmpl.nameHe : tmpl.name}
                        </p>
                        {tmpl.isDefault && (
                          <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full">
                            {t('defaultTemplate')}
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Schedule segments */}
          {SEGMENT_ORDER.map((segment) => {
            const segItems = bySegment[segment];
            if (segItems.length === 0) return null;
            return (
              <section key={segment}>
                <p className="section-title mb-1.5">
                  {t(`segments.${segment}`)}
                </p>
                <Card padding="sm">
                  <div className="divide-y divide-sand-100">
                    {segItems.map((item) => (
                      <ScheduleItemRow
                        key={item.id}
                        item={item}
                        onToggle={handleToggle}
                        locale={locale}
                      />
                    ))}
                  </div>
                </Card>
              </section>
            );
          })}
        </>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-3">
          {templates.length === 0 ? (
            <EmptyState icon="📋" title={t('noItems')} />
          ) : (
            templates.map((tmpl) => (
              <Card key={tmpl.id} padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {locale === 'he' ? tmpl.nameHe : tmpl.name}
                    </h3>
                    <p className="text-xs text-gray-400">{tmpl.items.length} items</p>
                  </div>
                  {tmpl.isDefault && (
                    <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full">
                      {t('defaultTemplate')}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {tmpl.items.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 text-center">{item.icon}</span>
                      <span>{locale === 'he' ? item.titleHe : item.title}</span>
                      <span className="ms-auto text-xs text-gray-400">{item.startTime}</span>
                    </div>
                  ))}
                  {tmpl.items.length > 5 && (
                    <p className="text-xs text-gray-400 ps-7">+{tmpl.items.length - 5} more</p>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-sand-100">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApplyTemplate(tmpl.id)}
                  >
                    {t('applyTemplate')}
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
