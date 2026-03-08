'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { settingsApi } from '@/lib/api/settings';
import type { Settings } from '@family-hub/shared';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Local form state
  const [language, setLanguage] = useState<'en' | 'he'>(locale as 'en' | 'he');
  const [childName, setChildName] = useState('');
  const [childAgeMonths, setChildAgeMonths] = useState(19);
  const [householdName, setHouseholdName] = useState('');

  useEffect(() => {
    settingsApi.get().then((s) => {
      setSettings(s);
      setLanguage(s.language as 'en' | 'he');
      setChildName(s.childName);
      setChildAgeMonths(s.childAgeMonths);
      setHouseholdName(s.householdName);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await settingsApi.update({
        language,
        childName,
        childAgeMonths,
        householdName,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

      // If language changed, navigate to new locale
      if (language !== locale) {
        router.push(`/${language}/settings`);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5 py-4">
      <h1 className="text-xl font-bold text-gray-800">{t('title')}</h1>

      {/* Language */}
      <section>
        <p className="section-title mb-2">{t('language')}</p>
        <Card padding="sm">
          <div className="flex gap-2">
            {(['en', 'he'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  language === lang
                    ? 'bg-sage-500 text-white'
                    : 'bg-sand-100 text-gray-600 hover:bg-sand-200'
                }`}
              >
                {t(`languages.${lang}`)}
              </button>
            ))}
          </div>
        </Card>
      </section>

      {/* Child info */}
      <section>
        <p className="section-title mb-2">{t('childName')}</p>
        <Card padding="sm">
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm text-gray-700 focus:outline-none focus:border-sage-400 bg-transparent"
            placeholder={t('childName')}
          />
        </Card>
      </section>

      <section>
        <p className="section-title mb-2">
          {t('childAge')} — {t('childAgeMonths', { months: childAgeMonths })}
        </p>
        <Card padding="sm">
          <input
            type="range"
            min={0}
            max={60}
            value={childAgeMonths}
            onChange={(e) => setChildAgeMonths(parseInt(e.target.value))}
            className="w-full accent-sage-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0m</span>
            <span>1y</span>
            <span>2y</span>
            <span>3y</span>
            <span>4y</span>
            <span>5y</span>
          </div>
        </Card>
      </section>

      {/* Household */}
      <section>
        <p className="section-title mb-2">{t('householdName')}</p>
        <Card padding="sm">
          <input
            type="text"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm text-gray-700 focus:outline-none focus:border-sage-400 bg-transparent"
            placeholder={t('householdName')}
          />
        </Card>
      </section>

      {/* Save */}
      <Button
        fullWidth
        onClick={handleSave}
        disabled={saving}
        className="mt-2"
      >
        {saved ? (
          <>
            <Check size={16} />
            {t('saved')}
          </>
        ) : saving ? (
          '...'
        ) : (
          tCommon('save')
        )}
      </Button>
    </div>
  );
}
