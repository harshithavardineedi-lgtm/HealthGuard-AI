import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WaterIcon } from '../common/Icons';
import { Button } from '../common/Button';
import { useHealth } from '../../context/HealthContext';
import { useLanguage } from '../../context/LanguageContext';

export const WaterTrackerCard: React.FC = () => {
  const {
    waterLog,
    addWaterGlass,
    updateWaterSettings,
  } = useHealth();

  const { t, language } = useLanguage();

  const [showSettings, setShowSettings] = useState(false);

  const percentage = Math.min(
    100,
    Math.round(
      (waterLog.consumedGlasses / waterLog.targetGlasses) * 100
    )
  );

  const radius = 36;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  // =====================================================
  // RELATIVE TIME TRANSLATION
  // =====================================================
  const translateRelativeTime = (
    value: string | null | undefined
  ): string => {
    if (!value) {
      return t('earlier');
    }

    const text = value.trim().toLowerCase();

    // English examples:
    // "1 hour ago"
    // "2 hours ago"
    // "1 minute ago"
    // "5 minutes ago"
    // "just now"

    if (
      text === 'just now' ||
      text === 'now'
    ) {
      return t('justNow');
    }

    const hourMatch = text.match(
      /^(\d+)\s*hour[s]?\s*ago$/
    );

    if (hourMatch) {
      const count = Number(hourMatch[1]);

      if (count === 1) {
        return t('hourAgo');
      }

      if (language === 'te') {
        return `${count} గంటల క్రితం`;
      }

      if (language === 'hi') {
        return `${count} घंटे पहले`;
      }

      return `${count} hours ago`;
    }

    const minuteMatch = text.match(
      /^(\d+)\s*minute[s]?\s*ago$/
    );

    if (minuteMatch) {
      const count = Number(minuteMatch[1]);

      if (count === 1) {
        return t('minuteAgo');
      }

      if (language === 'te') {
        return `${count} నిమిషాల క్రితం`;
      }

      if (language === 'hi') {
        return `${count} मिनट पहले`;
      }

      return `${count} minutes ago`;
    }

    // Already translated/common fallback values
    if (
      text === 'earlier' ||
      text === 'క్రితం' ||
      text === 'पहले'
    ) {
      return t('earlier');
    }

    return value;
  };

  const lastLoggedText = translateRelativeTime(
    waterLog.lastLogTimestamp
  );

  return (
    <div className="bg-surface border border-hairline rounded-[24px] p-5 flex flex-col justify-between h-full">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">

          <WaterIcon
            size={24}
            className="text-accent-primary"
          />

          <h3 className="font-heading font-semibold text-lg text-primary">
            {t('water')}
          </h3>

        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-xs text-secondary hover:text-primary transition-colors underline"
        >
          {showSettings
            ? t('close')
            : t('settings')}
        </button>

      </div>

      {!showSettings ? (

        <div className="flex items-center gap-5 my-2">

          {/* =================================================
              WATER PROGRESS RING
          ================================================= */}
          <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">

            <svg
              className="w-24 h-24 transform -rotate-90"
              viewBox="0 0 96 96"
            >

              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="var(--bg-sunken)"
                strokeWidth={strokeWidth}
                fill="none"
              />

              <motion.circle
                cx="48"
                cy="48"
                r={radius}
                stroke="var(--accent-primary)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                initial={{
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                style={{
                  strokeDasharray: circumference,
                }}
              />

            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">

              <span className="text-xl font-bold font-heading text-primary">
                {waterLog.consumedGlasses}/
                {waterLog.targetGlasses}
              </span>

              <span className="text-[10px] text-muted uppercase tracking-wider">
                {t('glasses')}
              </span>

            </div>

          </div>

          {/* =================================================
              WATER INFORMATION
          ================================================= */}
          <div className="flex-1 flex flex-col justify-center">

            <p className="text-xs text-secondary mb-2">

              {t('goal')}: {waterLog.targetGlasses}{' '}
              {t('glasses')} {t('daily')}.{' '}

              {t('lastLogged')}: {lastLoggedText}.

            </p>

            <Button
              variant="primary"
              size="sm"
              onClick={addWaterGlass}
              disabled={
                waterLog.consumedGlasses >=
                waterLog.targetGlasses
              }
              className="bg-accent-primary hover:bg-accent-primary/90 text-white font-medium self-start"
            >
              + {t('addGlass')}
            </Button>

          </div>

        </div>

      ) : (

        /* =====================================================
           WATER SETTINGS PANEL
        ===================================================== */
        <div className="p-3 bg-sunken rounded-2xl border border-hairline text-xs space-y-3">

          {/* Water Reminders */}
          <div className="flex items-center justify-between">

            <span className="font-semibold text-primary">
              {t('waterReminders')}
            </span>

            <input
              type="checkbox"
              checked={waterLog.enabled}
              onChange={(e) =>
                updateWaterSettings({
                  enabled: e.target.checked,
                })
              }
              className="w-4 h-4 accent-accent-primary cursor-pointer"
            />

          </div>

          {/* Reminder Interval */}
          <div>

            <label className="block text-secondary mb-1">
              {t('reminderInterval')}
            </label>

            <select
              value={waterLog.intervalMinutes}
              onChange={(e) =>
                updateWaterSettings({
                  intervalMinutes: Number(
                    e.target.value
                  ),
                })
              }
              className="w-full p-2 rounded-xl bg-surface border border-hairline text-primary focus:outline-none"
            >

              <option value={30}>
                {t('every30Minutes')}
              </option>

              <option value={60}>
                {t('every1Hour')}
              </option>

              <option value={120}>
                {t('every2Hours')}
              </option>

            </select>

          </div>

          {/* Daily Target */}
          <div>

            <label className="block text-secondary mb-1">
              {t('dailyTargetGlasses')}
            </label>

            <input
              type="number"
              min={4}
              max={16}
              value={waterLog.targetGlasses}
              onChange={(e) =>
                updateWaterSettings({
                  targetGlasses: Number(
                    e.target.value
                  ),
                })
              }
              className="w-full p-2 rounded-xl bg-surface border border-hairline text-primary focus:outline-none"
            />

          </div>

        </div>

      )}

    </div>
  );
};