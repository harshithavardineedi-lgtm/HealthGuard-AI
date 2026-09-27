import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { SidebarNav } from '../../components/layout/SidebarNav';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/common/Button';
import {
  SafeStatusIcon,
  WarnStatusIcon,
  MedicineIcon,
  WaterIcon,
  LocationIcon,
  PhoneIcon,
  SOSIcon,
} from '../../components/common/Icons';

export const CaregiverDashboard: React.FC = () => {
  const {
    patient,
    emergencyAlerts,
    todayLogs,
    waterLog,
    resolveEmergency,
    sendCaregiverTextReply,
  } = useHealth();

  const activeEmergencies = emergencyAlerts.filter((a) => a.status === 'active');
  const missedLogs = todayLogs.filter((l) => l.status === 'skipped');
  const takenCount = todayLogs.filter((l) => l.status === 'taken').length;

  const handleSendReminder = (medName: string) => {
    sendCaregiverTextReply(`Please remember to take your ${medName} dose.`);
    alert(`Reminder notification sent to ${patient.name}`);
  };

  return (
    <div className="min-h-screen bg-canvas text-primary flex">
      {/* Caregiver Sidebar Desktop Nav */}
      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-6 w-full space-y-6">
          {/* Active Emergency Alert Banner (Section 19 & 3.5) */}
          {activeEmergencies.length > 0 && (
            <div className="p-5 rounded-[24px] bg-status-danger/10 border-2 border-status-danger emergency-flash text-primary">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-status-danger text-white flex items-center justify-center font-bold">
                    <SOSIcon size={28} />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-status-danger text-white text-[10px] font-bold uppercase tracking-wider">
                      CRITICAL EMERGENCY ALERT
                    </span>
                    <h3 className="text-xl font-heading font-bold text-primary mt-1">
                      {patient.name} activated SOS alert!
                    </h3>
                    <p className="text-xs text-secondary">
                      Trigger: {activeEmergencies[0].triggerType.replace('_', ' ')} • Location:{' '}
                      {patient.location?.address || 'GPS Coordinates Acquired'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://maps.google.com/?q=${patient.location?.latitude},${patient.location?.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-status-danger text-white font-bold text-xs hover:opacity-90 flex items-center gap-1"
                  >
                    <LocationIcon size={16} /> Open Maps
                  </a>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => resolveEmergency(activeEmergencies[0].id)}
                  >
                    Mark Resolved
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Section Heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary">Patient Overview Console</h2>
              <p className="text-xs text-secondary">Live monitoring stream for linked dependents.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-sunken border border-hairline text-xs font-semibold text-primary">
              🟢 Live Sync Connected
            </span>
          </div>

          {/* Bento Asymmetric Grid (Section 3.6) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Prominent Wide Patient Status Card (Spans 2 cols) */}
            <div className="lg:col-span-2 bg-surface border border-hairline rounded-[24px] p-6 shadow-xs">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={patient.avatarUrl}
                    alt={patient.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-hairline"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-heading font-bold text-primary">{patient.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-status-safe/10 text-status-safe font-semibold text-xs border border-status-safe/30 flex items-center gap-1">
                        <SafeStatusIcon size={12} /> Stable
                      </span>
                    </div>
                    <p className="text-xs text-secondary mt-0.5">
                      Age: {patient.age} • Blood Group: {patient.bloodGroup} • Phone: {patient.phone}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${patient.phone}`}
                  className="px-4 py-2 rounded-2xl bg-accent-secondary text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:opacity-95"
                >
                  <PhoneIcon size={16} /> Call Patient
                </a>
              </div>

              {/* Progress & Quick Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-sunken border border-hairline text-center text-xs">
                <div>
                  <span className="text-muted block mb-0.5">Adherence Rate</span>
                  <span className="text-xl font-bold font-heading text-accent-primary">
                    {patient.adherencePercentage}%
                  </span>
                </div>
                <div>
                  <span className="text-muted block mb-0.5">Hydration Goal</span>
                  <span className="text-xl font-bold font-heading text-primary">
                    {waterLog.consumedGlasses}/{waterLog.targetGlasses}
                  </span>
                </div>
                <div>
                  <span className="text-muted block mb-0.5">Last Activity</span>
                  <span className="text-sm font-semibold text-primary">5 mins ago</span>
                </div>
              </div>
            </div>

            {/* Tight 2x2 Bento Stat Grid (Section 3.6) */}
            <div className="lg:col-span-1 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">
                <MedicineIcon size={22} className="text-accent-secondary mb-2" />
                <div>
                  <span className="text-[11px] text-secondary block font-medium">Doses Taken</span>
                  <span className="text-2xl font-heading font-bold text-primary">{takenCount}/{todayLogs.length}</span>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">
                <WaterIcon size={22} className="text-accent-primary mb-2" />
                <div>
                  <span className="text-[11px] text-secondary block font-medium">Water Log</span>
                  <span className="text-2xl font-heading font-bold text-primary">{waterLog.consumedGlasses} glass</span>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">
                <WarnStatusIcon size={22} className="text-status-warn mb-2" />
                <div>
                  <span className="text-[11px] text-secondary block font-medium">Missed Doses</span>
                  <span className="text-2xl font-heading font-bold text-status-warn">{missedLogs.length}</span>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-surface border border-hairline flex flex-col justify-between">
                <SOSIcon size={22} className="text-status-danger mb-2" />
                <div>
                  <span className="text-[11px] text-secondary block font-medium">SOS Alerts</span>
                  <span className="text-2xl font-heading font-bold text-primary">{activeEmergencies.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Missed Medicine Alerts & Location Sharing Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Missed Dose Alerts (Section 18) */}
            <div className="bg-surface border border-hairline rounded-[24px] p-5">
              <h3 className="font-heading font-bold text-lg text-primary mb-3 flex items-center gap-2">
                <WarnStatusIcon size={20} /> Missed & Skipped Dose Alerts
              </h3>

              {missedLogs.length === 0 ? (
                <div className="p-6 text-center text-xs text-secondary bg-sunken rounded-2xl border border-hairline">
                  ✓ No skipped doses reported today.
                </div>
              ) : (
                missedLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-2xl bg-status-warn/10 border border-status-warn/30 mb-2 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-primary text-sm">{log.medicineName} ({log.dosage})</h4>
                      <p className="text-secondary">Scheduled: {log.scheduledTime} • Reason: {log.notes || 'User skipped'}</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => handleSendReminder(log.medicineName)}>
                      Send Reminder
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Patient Live Location Box (Section 20) */}
            <div className="bg-surface border border-hairline rounded-[24px] p-5">
              <h3 className="font-heading font-bold text-lg text-primary mb-3 flex items-center gap-2">
                <LocationIcon size={20} className="text-accent-secondary" /> Patient Geolocation
              </h3>

              <div className="p-4 rounded-2xl bg-sunken border border-hairline space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-secondary">Sharing Status:</span>
                  <span className="font-bold text-status-safe">🟢 Active Sharing</span>
                </div>
                <p className="text-sm font-semibold text-primary">{patient.location?.address}</p>
                <p className="text-[11px] text-muted">Last updated: {patient.location?.lastUpdated}</p>

                <a
                  href={`https://maps.google.com/?q=${patient.location?.latitude},${patient.location?.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-4 py-2 rounded-xl bg-accent-primary text-white font-semibold text-xs hover:opacity-90"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
