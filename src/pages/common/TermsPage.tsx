import React from 'react';
import { Header } from '../../components/layout/Header';
import { Link } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-primary pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary">Terms of Service & Data Use</h1>
            <p className="text-secondary text-sm mt-1">Legal Agreement & Medical Support Disclaimer</p>
          </div>
          <Link to="/settings" className="text-xs text-accent-primary font-bold hover:underline">
            ← Back to Settings
          </Link>
        </div>

        <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs space-y-4 text-sm text-secondary leading-relaxed">
          <div className="p-4 rounded-2xl bg-sunken border border-hairline text-primary font-semibold">
            🚨 <strong>Medical Disclaimer:</strong> HealthGuard AI is a healthcare support and reminder system. It does not diagnose medical conditions or replace professional medical advice. For medical emergencies, contact emergency services immediately.
          </div>

          <h3 className="font-heading font-bold text-lg text-primary">1. Acceptable Use</h3>
          <p>
            HealthGuard AI is designed to help patients and caregivers track daily prescriptions, hydration, emergency contacts, and remote health updates.
          </p>

          <h3 className="font-heading font-bold text-lg text-primary">2. User Responsibilities</h3>
          <p>
            Users are responsible for maintaining accurate medicine schedules and updating caregiver phone numbers. Automated reminders are delivered via local web APIs.
          </p>

          <h3 className="font-heading font-bold text-lg text-primary">3. Emergency SOS Service</h3>
          <p>
            The SOS panic button triggers notifications to your connected caregiver and resolves your device GPS coordinates. Users must ensure device location permissions remain enabled for emergency features.
          </p>
        </div>
      </main>
    </div>
  );
};
