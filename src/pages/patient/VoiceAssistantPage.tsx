import React from 'react';
import { Header } from '../../components/layout/Header';
import { BottomNav } from '../../components/layout/BottomNav';
import { VoiceAssistantWidget } from '../../components/patient/VoiceAssistantWidget';
import { SOSButton } from '../../components/patient/SOSButton';

export const VoiceAssistantPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-primary pb-28 md:pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-heading font-bold text-primary">Voice Health Assistant</h2>
          <p className="text-secondary text-sm mt-1">
            Speak naturally in Telugu, Hindi, or English to get medicine info, log water, or call help.
          </p>
        </div>

        <VoiceAssistantWidget isCompact={false} />
      </main>

      <SOSButton isFloating={true} />
      <BottomNav />
    </div>
  );
};
