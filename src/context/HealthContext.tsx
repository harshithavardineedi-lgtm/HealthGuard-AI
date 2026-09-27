import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Patient,
  Caregiver,
  Medicine,
  MedicineLog,
  WaterLog,
  EmergencyAlert,
  Notification,
  VoiceMessage,
  ConnectionRequest,
  AccessibilitySettings,
  PermissionSettings,
} from '../types';
import {
  mockPatient,
  mockCaregiver,
  mockMedicines,
  mockTodayLogs,
  mockWaterLog,
  mockNotifications,
  mockVoiceMessages,
  mockEmergencyAlerts,
  mockConnectionRequests,
} from '../data/mockData';
import { useLanguage } from './LanguageContext';

interface HealthContextType {
  patient: Patient;
  caregiver: Caregiver;
  medicines: Medicine[];
  todayLogs: MedicineLog[];
  waterLog: WaterLog;
  emergencyAlerts: EmergencyAlert[];
  notifications: Notification[];
  voiceMessages: VoiceMessage[];
  connectionRequests: ConnectionRequest[];
  accessibility: AccessibilitySettings;
  permissions: PermissionSettings;
  isOffline: boolean;
  pendingOfflineActionsCount: number;
  activeReminder: MedicineLog | null;

  // Actions
  updatePatientProfile: (updated: Partial<Patient>) => void;
  markMedicineTaken: (logId: string) => void;
  skipMedicineDose: (logId: string, reason?: string) => void;
  addMedicine: (medicine: Omit<Medicine, 'id' | 'patientId'>) => void;
  editMedicine: (id: string, updated: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  addWaterGlass: () => void;
  updateWaterSettings: (settings: Partial<WaterLog>) => void;
  triggerSOS: (type?: 'sos_button' | 'fall_detection' | 'voice_trigger') => void;
  resolveEmergency: (alertId: string) => void;
  sendCaregiverConnectionRequest: (name: string, phone: string, relationship: string) => void;
  handleConnectionRequest: (requestId: string, status: 'accepted' | 'rejected') => void;
  sendVoiceMessage: (text: string, durationSeconds?: number) => void;
  sendCaregiverTextReply: (text: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  toggleAccessibility: (key: keyof AccessibilitySettings) => void;
  togglePermission: (key: keyof PermissionSettings) => void;
  setActiveReminder: (log: MedicineLog | null) => void;
  toggleOfflineState: () => void;
  resetDemoData: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();

  // Load from localStorage or mock defaults
  const [patient, setPatient] = useState<Patient>(() => {
    const saved = localStorage.getItem('hg_patient_data');
    return saved ? JSON.parse(saved) : mockPatient;
  });

  const [caregiver] = useState<Caregiver>(mockCaregiver);

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('hg_medicines');
    return saved ? JSON.parse(saved) : mockMedicines;
  });

  const [todayLogs, setTodayLogs] = useState<MedicineLog[]>(() => {
    const saved = localStorage.getItem('hg_today_logs');
    return saved ? JSON.parse(saved) : mockTodayLogs;
  });

  const [waterLog, setWaterLog] = useState<WaterLog>(() => {
    const saved = localStorage.getItem('hg_water_log');
    return saved ? JSON.parse(saved) : mockWaterLog;
  });

  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>(() => {
    const saved = localStorage.getItem('hg_emergency_alerts');
    return saved ? JSON.parse(saved) : mockEmergencyAlerts;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('hg_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  const [voiceMessages, setVoiceMessages] = useState<VoiceMessage[]>(() => {
    const saved = localStorage.getItem('hg_voice_messages');
    return saved ? JSON.parse(saved) : mockVoiceMessages;
  });

  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>(() => {
    const saved = localStorage.getItem('hg_connection_requests');
    return saved ? JSON.parse(saved) : mockConnectionRequests;
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('hg_accessibility');
    return saved ? JSON.parse(saved) : { largeText: false, highContrast: false, reduceAnimation: false };
  });

  const [permissions, setPermissions] = useState<PermissionSettings>(() => {
    const saved = localStorage.getItem('hg_permissions');
    return saved ? JSON.parse(saved) : { location: true, voice: true, notifications: true, analyticsData: true };
  });

  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState<string[]>([]);
  const [activeReminder, setActiveReminder] = useState<MedicineLog | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('hg_patient_data', JSON.stringify(patient));
  }, [patient]);

  useEffect(() => {
    localStorage.setItem('hg_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('hg_today_logs', JSON.stringify(todayLogs));
  }, [todayLogs]);

  useEffect(() => {
    localStorage.setItem('hg_water_log', JSON.stringify(waterLog));
  }, [waterLog]);

  useEffect(() => {
    localStorage.setItem('hg_emergency_alerts', JSON.stringify(emergencyAlerts));
  }, [emergencyAlerts]);

  useEffect(() => {
    localStorage.setItem('hg_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('hg_voice_messages', JSON.stringify(voiceMessages));
  }, [voiceMessages]);

  useEffect(() => {
    localStorage.setItem('hg_connection_requests', JSON.stringify(connectionRequests));
  }, [connectionRequests]);

  useEffect(() => {
    localStorage.setItem('hg_accessibility', JSON.stringify(accessibility));
    const root = document.documentElement;
    if (accessibility.largeText || accessibility.highContrast) {
      root.classList.add('accessibility-mode');
    } else {
      root.classList.remove('accessibility-mode');
    }
  }, [accessibility]);

  useEffect(() => {
    localStorage.setItem('hg_permissions', JSON.stringify(permissions));
  }, [permissions]);

  // Online/Offline listener
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setOfflineQueue([]);
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Recalculate adherence
  const updateAdherence = (logs: MedicineLog[]) => {
    const completed = logs.filter((l) => l.status === 'taken').length;
    const total = logs.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 100;
    setPatient((prev) => ({ ...prev, adherencePercentage: pct }));
  };

  const updatePatientProfile = (updated: Partial<Patient>) => {
    setPatient((prev) => ({ ...prev, ...updated }));
  };

  const markMedicineTaken = (logId: string) => {
    setTodayLogs((prev) => {
      const next = prev.map((item) =>
        item.id === logId
          ? { ...item, status: 'taken' as const, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          : item
      );
      updateAdherence(next);
      return next;
    });

    if (isOffline) {
      setOfflineQueue((prev) => [...prev, `Marked taken: ${logId}`]);
    }

    // Add notification
    const log = todayLogs.find((l) => l.id === logId);
    if (log) {
      addNotification({
        type: 'medicine_reminder',
        title: 'Medicine Taken',
        message: `${log.medicineName} ${log.dosage} marked as taken.`,
      });
    }
  };

  const skipMedicineDose = (logId: string, reason?: string) => {
    setTodayLogs((prev) => {
      const next = prev.map((item) =>
        item.id === logId
          ? { ...item, status: 'skipped' as const, notes: reason || 'User skipped dose' }
          : item
      );
      updateAdherence(next);
      return next;
    });

    const log = todayLogs.find((l) => l.id === logId);
    if (log) {
      // Generate notification and Caregiver alert
      addNotification({
        type: 'missed_medicine',
        title: 'Dose Skipped',
        message: `Skipped ${log.medicineName} ${log.dosage} at ${log.scheduledTime}.`,
      });
    }
  };

  const addMedicine = (medData: Omit<Medicine, 'id' | 'patientId'>) => {
    const newMed: Medicine = {
      ...medData,
      id: `med-${Date.now()}`,
      patientId: patient.id,
      active: true,
    };
    setMedicines((prev) => [...prev, newMed]);

    // Also add to today's logs if daily
    const newLog: MedicineLog = {
      id: `log-${Date.now()}`,
      medicineId: newMed.id,
      medicineName: newMed.name,
      dosage: newMed.dosage,
      patientId: patient.id,
      scheduledTime: newMed.time,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setTodayLogs((prev) => [...prev, newLog]);
  };

  const editMedicine = (id: string, updated: Partial<Medicine>) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  };

  const deleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
    setTodayLogs((prev) => prev.filter((l) => l.medicineId !== id));
  };

  const addWaterGlass = () => {
    setWaterLog((prev) => {
      const updatedCount = Math.min(prev.consumedGlasses + 1, prev.targetGlasses);
      return {
        ...prev,
        consumedGlasses: updatedCount,
        lastLogTimestamp: 'Just now',
      };
    });

    if (isOffline) {
      setOfflineQueue((prev) => [...prev, 'Water glass added']);
    }

    addNotification({
      type: 'water_reminder',
      title: 'Water Logged 💧',
      message: `Hydration update: ${waterLog.consumedGlasses + 1}/${waterLog.targetGlasses} glasses.`,
    });
  };

  const updateWaterSettings = (settings: Partial<WaterLog>) => {
    setWaterLog((prev) => ({ ...prev, ...settings }));
  };

  const triggerSOS = (type: 'sos_button' | 'fall_detection' | 'voice_trigger' = 'sos_button') => {
    const triggerTranslationKey = type === 'sos_button'
      ? 'sosButtonTrigger'
      : type === 'fall_detection'
      ? 'fallDetectionTrigger'
      : 'voiceTrigger';

    const newAlert: EmergencyAlert = {
      id: `sos-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'active',
      triggerType: type,
      location: patient.location,
    };

    setEmergencyAlerts((prev) => [newAlert, ...prev]);

    addNotification({
      type: 'emergency_sos',
      title: t('sosNotificationTitle'),
      message: t('sosNotificationMessage')
        .replace('{name}', patient.name)
        .replace('{trigger}', t(triggerTranslationKey)),
    });
  };

  const resolveEmergency = (alertId: string) => {
    setEmergencyAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'resolved' as const, resolvedAt: 'Just now' } : a))
    );
  };

  const sendCaregiverConnectionRequest = (name: string, phone: string, relationship: string) => {
    const req: ConnectionRequest = {
      id: `conn-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      caregiverPhone: phone,
      relationship,
      status: 'pending',
      timestamp: 'Just now',
    };
    setConnectionRequests((prev) => [req, ...prev]);
    addNotification({
      type: 'caregiver_connect',
      title: 'Connection Request Sent',
      message: `Sent caregiver request to ${name} (${phone}).`,
    });
  };

  const handleConnectionRequest = (requestId: string, status: 'accepted' | 'rejected') => {
    setConnectionRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
    if (status === 'accepted') {
      setPatient((prev) => ({
        ...prev,
        caregiverId: caregiver.id,
        caregiverName: caregiver.name,
        caregiverPhone: caregiver.phone,
      }));
      addNotification({
        type: 'caregiver_connect',
        title: 'Caregiver Connected! 🎉',
        message: `${caregiver.name} is now monitoring your health.`,
      });
    }
  };

  const sendVoiceMessage = (text: string, durationSeconds = 5) => {
    const newMsg: VoiceMessage = {
      id: `vmsg-${Date.now()}`,
      senderId: patient.id,
      senderName: patient.name,
      senderRole: 'patient',
      receiverId: caregiver.id,
      transcription: text,
      durationSeconds,
      timestamp: 'Just now',
      read: false,
    };
    setVoiceMessages((prev) => [newMsg, ...prev]);
    addNotification({
      type: 'voice_message',
      title: 'Voice Note Sent',
      message: `Voice note delivered to ${patient.caregiverName || 'Caregiver'}.`,
    });
  };

  const sendCaregiverTextReply = (text: string) => {
    const newMsg: VoiceMessage = {
      id: `vmsg-${Date.now()}`,
      senderId: caregiver.id,
      senderName: caregiver.name,
      senderRole: 'caregiver',
      receiverId: patient.id,
      transcription: text,
      durationSeconds: 6,
      timestamp: 'Just now',
      read: false,
    };
    setVoiceMessages((prev) => [newMsg, ...prev]);
    addNotification({
      type: 'voice_message',
      title: 'Message from Caregiver',
      message: `${caregiver.name}: "${text}"`,
    });
  };

  const addNotification = (notif: Omit<Notification, 'id' | 'recipientId' | 'timestamp' | 'read'>) => {
    const item: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      recipientId: patient.id,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [item, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleAccessibility = (key: keyof AccessibilitySettings) => {
    setAccessibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePermission = (key: keyof PermissionSettings) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleOfflineState = () => {
    setIsOffline((prev) => !prev);
  };

  const resetDemoData = () => {
    setPatient(mockPatient);
    setMedicines(mockMedicines);
    setTodayLogs(mockTodayLogs);
    setWaterLog(mockWaterLog);
    setEmergencyAlerts(mockEmergencyAlerts);
    setNotifications(mockNotifications);
    setVoiceMessages(mockVoiceMessages);
    setConnectionRequests(mockConnectionRequests);
    setOfflineQueue([]);
    localStorage.clear();
  };

  return (
    <HealthContext.Provider
      value={{
        patient,
        caregiver,
        medicines,
        todayLogs,
        waterLog,
        emergencyAlerts,
        notifications,
        voiceMessages,
        connectionRequests,
        accessibility,
        permissions,
        isOffline,
        pendingOfflineActionsCount: offlineQueue.length,
        activeReminder,
        updatePatientProfile,
        markMedicineTaken,
        skipMedicineDose,
        addMedicine,
        editMedicine,
        deleteMedicine,
        addWaterGlass,
        updateWaterSettings,
        triggerSOS,
        resolveEmergency,
        sendCaregiverConnectionRequest,
        handleConnectionRequest,
        sendVoiceMessage,
        sendCaregiverTextReply,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        toggleAccessibility,
        togglePermission,
        setActiveReminder,
        toggleOfflineState,
        resetDemoData,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) throw new Error('useHealth must be used within a HealthProvider');
  return context;
};
