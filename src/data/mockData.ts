import type { Patient, Caregiver, Medicine, MedicineLog, WaterLog, EmergencyAlert, Notification, VoiceMessage, ConnectionRequest } from '../types';

export const mockPatient: Patient = {
  id: 'patient-lakshmi-01',
  name: 'Lakshmi Devi',
  age: 68,
  phone: '+91 98765 43210',
  bloodGroup: 'O+',
  emergencyContact: '+91 98765 43211',
  allergies: ['Penicillin', 'Sulfa Drugs'],
  medicalNotes: 'Hypertension & Type-2 Diabetes managed via daily medication. Mild arthritis in knees.',
  caregiverId: 'caregiver-ravi-01',
  caregiverName: 'Ravi Kumar (Son)',
  caregiverPhone: '+91 98765 43211',
  preferredLanguage: 'te',
  locationSharing: true,
  location: {
    latitude: 17.3850,
    longitude: 78.4867,
    address: 'Banjara Hills, Road No. 12, Hyderabad, Telangana',
    lastUpdated: '5 minutes ago',
    isSharing: true,
  },
  adherencePercentage: 86,
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
};

export const mockCaregiver: Caregiver = {
  id: 'caregiver-ravi-01',
  name: 'Ravi Kumar',
  phone: '+91 98765 43211',
  relationship: 'Son',
  patientIds: ['patient-lakshmi-01'],
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
};

export const mockMedicines: Medicine[] = [
  {
    id: 'med-01',
    patientId: 'patient-lakshmi-01',
    name: 'Amlodipine',
    dosage: '5mg',
    frequency: 'daily',
    time: '10:00 AM',
    startDate: '2025-01-01',
    timingPreference: 'after_food',
    notes: 'For Blood Pressure',
    active: true,
  },
  {
    id: 'med-02',
    patientId: 'patient-lakshmi-01',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'twice_daily',
    time: '01:00 PM',
    startDate: '2025-01-01',
    timingPreference: 'after_food',
    notes: 'For Blood Sugar',
    active: true,
  },
  {
    id: 'med-03',
    patientId: 'patient-lakshmi-01',
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'daily',
    time: '08:00 PM',
    startDate: '2025-01-01',
    timingPreference: 'after_food',
    notes: 'Bone & Immunity supplement',
    active: true,
  },
];

export const mockTodayLogs: MedicineLog[] = [
  {
    id: 'log-01',
    medicineId: 'med-01',
    medicineName: 'Amlodipine',
    dosage: '5mg',
    patientId: 'patient-lakshmi-01',
    scheduledTime: '10:00 AM',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  },
  {
    id: 'log-02',
    medicineId: 'med-02',
    medicineName: 'Metformin',
    dosage: '500mg',
    patientId: 'patient-lakshmi-01',
    scheduledTime: '01:00 PM',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  },
  {
    id: 'log-03',
    medicineId: 'med-03',
    medicineName: 'Vitamin D3',
    dosage: '1000 IU',
    patientId: 'patient-lakshmi-01',
    scheduledTime: '08:00 PM',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  },
];

export const mockWaterLog: WaterLog = {
  id: 'water-01',
  patientId: 'patient-lakshmi-01',
  date: new Date().toISOString().split('T')[0],
  consumedGlasses: 5,
  targetGlasses: 8,
  intervalMinutes: 60,
  enabled: true,
  lastLogTimestamp: '1 hour ago',
};

export const mockNotifications: Notification[] = [
  {
    id: 'notif-01',
    recipientId: 'patient-lakshmi-01',
    type: 'medicine_reminder',
    title: 'Medicine Reminder',
    message: 'Time to take Amlodipine 5mg (After Food)',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: 'notif-02',
    recipientId: 'caregiver-ravi-01',
    type: 'water_reminder',
    title: 'Hydration Goal Update',
    message: 'Lakshmi reached 5/8 glasses of water today.',
    timestamp: '1 hour ago',
    read: true,
  },
];

export const mockVoiceMessages: VoiceMessage[] = [
  {
    id: 'vmsg-01',
    senderId: 'caregiver-ravi-01',
    senderName: 'Ravi Kumar',
    senderRole: 'caregiver',
    receiverId: 'patient-lakshmi-01',
    transcription: 'Amma, please remember to drink water after your afternoon medicine. I will visit in the evening!',
    durationSeconds: 8,
    timestamp: '30 mins ago',
    read: false,
  },
];

export const mockEmergencyAlerts: EmergencyAlert[] = [];

export const mockConnectionRequests: ConnectionRequest[] = [];
