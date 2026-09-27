export type UserRole = 'patient' | 'caregiver';

export interface User {
  id: string;
  phone: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  lastUpdated: string;
  isSharing: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  bloodGroup: string;
  emergencyContact: string;
  allergies: string[];
  medicalNotes: string;
  caregiverId?: string;
  caregiverName?: string;
  caregiverPhone?: string;
  preferredLanguage: 'en' | 'te' | 'hi';
  locationSharing: boolean;
  location?: Location;
  adherencePercentage: number;
  avatarUrl: string;
}

export interface Caregiver {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  patientIds: string[];
  avatarUrl: string;
}

export interface Medicine {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: 'daily' | 'twice_daily' | 'thrice_daily' | 'weekly' | 'as_needed';
  time: string; // e.g. "10:00 AM" or "10:00"
  startDate: string;
  endDate?: string;
  timingPreference: 'before_food' | 'after_food' | 'with_food' | 'anytime';
  notes?: string;
  active: boolean;
}

export interface MedicineLog {
  id: string;
  medicineId: string;
  medicineName: string;
  dosage: string;
  patientId: string;
  scheduledTime: string;
  date: string; // YYYY-MM-DD
  status: 'taken' | 'skipped' | 'pending';
  timestamp?: string;
  notes?: string;
}

export interface WaterLog {
  id: string;
  patientId: string;
  date: string; // YYYY-MM-DD
  consumedGlasses: number;
  targetGlasses: number;
  intervalMinutes: number;
  enabled: boolean;
  lastLogTimestamp?: string;
}

export interface EmergencyAlert {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  timestamp: string;
  status: 'active' | 'resolved';
  location?: Location;
  triggerType: 'sos_button' | 'fall_detection' | 'voice_trigger';
  resolvedAt?: string;
  notes?: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  type: 'medicine_reminder' | 'missed_medicine' | 'emergency_sos' | 'caregiver_connect' | 'voice_message' | 'water_reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface VoiceMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  audioUrl?: string;
  transcription: string;
  durationSeconds: number;
  timestamp: string;
  read: boolean;
}

export interface ConnectionRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  caregiverPhone: string;
  relationship: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reduceAnimation: boolean;
}

export interface PermissionSettings {
  location: boolean;
  voice: boolean;
  notifications: boolean;
  analyticsData: boolean;
}
