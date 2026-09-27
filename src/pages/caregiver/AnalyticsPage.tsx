import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { SidebarNav } from '../../components/layout/SidebarNav';
import { Header } from '../../components/layout/Header';
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

  const taken = todayLogs.filter((l) => l.status === 'taken').length;
  const skipped = todayLogs.filter((l) => l.status === 'skipped').length;
  const pending = todayLogs.filter((l) => l.status === 'pending').length;

  const adherenceData = [
    { name: 'Taken', value: taken > 0 ? taken : 2, color: '#4C8C4A' },
    { name: 'Skipped', value: skipped > 0 ? skipped : 1, color: '#D98E2B' },
    { name: 'Pending', value: pending > 0 ? pending : 1, color: '#97A399' },
  ];

  const weeklyActivityData = [
    { day: 'Mon', taken: 3, skipped: 0 },
    { day: 'Tue', taken: 3, skipped: 0 },
    { day: 'Wed', taken: 2, skipped: 1 },
    { day: 'Thu', taken: 3, skipped: 0 },
    { day: 'Fri', taken: 3, skipped: 0 },
    { day: 'Sat', taken: 2, skipped: 1 },
    { day: 'Sun', taken: taken, skipped: skipped },
  ];

  const hydrationWeeklyData = [
    { day: 'Mon', glasses: 7 },
    { day: 'Tue', glasses: 8 },
    { day: 'Wed', glasses: 6 },
    { day: 'Thu', glasses: 8 },
    { day: 'Fri', glasses: 7 },
    { day: 'Sat', glasses: 8 },
    { day: 'Sun', glasses: waterLog.consumedGlasses },
  ];

  return (
    <div className="min-h-screen bg-canvas text-primary flex">
      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-6 w-full space-y-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary">Care Analytics & Trends</h2>
            <p className="text-secondary text-sm mt-1">Quantitative health adherence & hydration tracking for {patient.name}.</p>
          </div>

          {/* Full Width Chart Bento Layout (Section 3.6 & 28) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Adherence Donut Chart */}
            <div className="lg:col-span-1 bg-surface border border-hairline rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Dose Status Distribution</h3>
              <p className="text-xs text-secondary mb-4">Ratio of completed vs missed doses today.</p>

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
                  <span className="text-[10px] uppercase font-bold text-muted">Adherence</span>
                </div>
              </div>

              <div className="flex justify-around text-xs font-semibold pt-4 border-t border-hairline">
                <span className="text-status-safe">● Taken: {taken}</span>
                <span className="text-status-warn">● Skipped: {skipped}</span>
                <span className="text-muted">● Pending: {pending}</span>
              </div>
            </div>

            {/* Weekly Medicine Activity Bar Chart */}
            <div className="lg:col-span-2 bg-surface border border-hairline rounded-[24px] p-6 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-primary mb-2">Weekly Medicine Activity</h3>
              <p className="text-xs text-secondary mb-4">Daily comparison of taken vs skipped doses across 7 days.</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivityData}>
                    <XAxis dataKey="day" stroke="var(--ink-muted)" />
                    <YAxis stroke="var(--ink-muted)" />
                    <Tooltip />
                    <Bar dataKey="taken" fill="#2C7A6B" radius={[6, 6, 0, 0]} name="Taken" />
                    <Bar dataKey="skipped" fill="#D98E2B" radius={[6, 6, 0, 0]} name="Skipped" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Full Width Hydration Line Chart */}
          <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs">
            <h3 className="font-heading font-bold text-lg text-primary mb-2">7-Day Hydration Trend</h3>
            <p className="text-xs text-secondary mb-4">Daily water glasses logged against target goal (8 glasses).</p>

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
                    name="Glasses Logged"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
