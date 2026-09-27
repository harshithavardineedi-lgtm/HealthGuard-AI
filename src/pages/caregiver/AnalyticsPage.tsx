import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { SidebarNav } from '../../components/layout/SidebarNav';
import { Header } from '../../components/layout/Header';
import { useLanguage } from '../../context/LanguageContext';
import { BottomNav } from '../../components/layout/BottomNav';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { patient, todayLogs, waterLog } = useHealth();
  const { t } = useLanguage();

  const taken = todayLogs.filter((l) => l.status === 'taken').length;
  const skipped = todayLogs.filter((l) => l.status === 'skipped').length;
  const pending = todayLogs.filter((l) => l.status === 'pending').length;

  const adherenceData = [
    { name: t('taken'), value: taken > 0 ? taken : 2, color: '#4C8C4A' },
    { name: t('skipped'), value: skipped > 0 ? skipped : 1, color: '#D98E2B' },
    { name: t('pending'), value: pending > 0 ? pending : 1, color: '#97A399' },
  ];

  const weeklyActivityData = [
    { day: t('mon'), taken: 3, skipped: 0 },
    { day: t('tue'), taken: 3, skipped: 0 },
    { day: t('wed'), taken: 2, skipped: 1 },
    { day: t('thu'), taken: 3, skipped: 0 },
    { day: t('fri'), taken: 3, skipped: 0 },
    { day: t('sat'), taken: 2, skipped: 1 },
    { day: t('sun'), taken: taken, skipped: skipped },
  ];

  const hydrationWeeklyData = [
    { day: t('mon'), glasses: 7 },
    { day: t('tue'), glasses: 8 },
    { day: t('wed'), glasses: 6 },
    { day: t('thu'), glasses: 8 },
    { day: t('fri'), glasses: 7 },
    { day: t('sat'), glasses: 8 },
    { day: t('sun'), glasses: waterLog.consumedGlasses },
  ];

  return (
    <div className="min-h-screen bg-canvas text-primary flex">
      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-6 pb-28 lg:pb-8 w-full space-y-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary">{t('careAnalyticsTrends')}</h2>
            <p className="text-secondary text-sm mt-1">{t('quantitativeHealthTrackingFor')} {patient.name}.</p>
          </div>

          {/* Full Width Chart Bento Layout (Section 3.6 & 28) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Adherence Donut Chart */}
            <div className="xl:col-span-1 bg-surface border border-hairline rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
              <h3 className="font-heading font-bold text-lg text-primary mb-2">{t('doseStatusDistribution')}</h3>
              <p className="text-xs text-secondary mb-4">{t('completedVsMissedDosesToday')}</p>

              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={adherenceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {adherenceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-heading font-bold text-primary">{patient.adherencePercentage}%</span>
                  <span className="text-[10px] uppercase font-bold text-muted">{t('adherence')}</span>
                </div>
              </div>

              <div className="flex justify-around text-xs font-semibold pt-4 border-t border-hairline">
                <span className="text-status-safe">● {t('takenCountLabel')} {taken}</span>
                <span className="text-status-warn">● {t('skippedCountLabel')} {skipped}</span>
                <span className="text-muted">● {t('pendingCountLabel')} {pending}</span>
              </div>
            </div>

            {/* Weekly Medicine Activity Bar Chart */}
            <div className="xl:col-span-2 bg-surface border border-hairline rounded-[24px] p-6 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-primary mb-2">{t('weeklyMedicineActivity')}</h3>
              <p className="text-xs text-secondary mb-4">{t('dailyTakenSkippedComparison')}</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivityData}>
                    <XAxis dataKey="day" stroke="var(--ink-muted)" />
                    <YAxis stroke="var(--ink-muted)" />
                    <Tooltip />
                    <Bar dataKey="taken" fill="#2C7A6B" radius={[6, 6, 0, 0]} name={t('taken')} />
                    <Bar dataKey="skipped" fill="#D98E2B" radius={[6, 6, 0, 0]} name={t('skipped')} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Full Width Hydration Line Chart */}
          <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs">
            <h3 className="font-heading font-bold text-lg text-primary mb-2">{t('sevenDayHydrationTrend')}</h3>
            <p className="text-xs text-secondary mb-4">{t('dailyWaterAgainstTarget')}</p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hydrationWeeklyData}>
                  <XAxis dataKey="day" stroke="var(--ink-muted)" />
                  <YAxis stroke="var(--ink-muted)" domain={[0, 10]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="glasses"
                    stroke="var(--accent-primary)"
                    strokeWidth={3}
                    dot={{ r: 5, fill: 'var(--accent-primary)' }}
                    name={t('glassesLogged')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
