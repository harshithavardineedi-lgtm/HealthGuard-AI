import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/common/Button';
import { MedicineIcon, CaregiverIcon } from '../components/common/Icons';

export const AuthPage: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'role'>('phone');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('123456');
  const [otpError, setOtpError] = useState('');
  const { loginWithOTP, selectRole } = useAuth();
  const { t } = useLanguage();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginWithOTP(phone, otp);
    if (success) {
      setStep('role');
    } else {
      setOtpError(t('invalidOtp'));
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg bg-surface border border-hairline rounded-[28px] p-6 sm:p-8 shadow-xl">
        {/* Logo Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center mx-auto mb-3 font-bold text-3xl">
            🛡️
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary">HealthGuard AI</h1>
          <p className="text-sm text-secondary mt-1">{t('authSubtitle')}</p>
        </div>

        {step === 'phone' && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                {t('enterMobileNumber')}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-3.5 rounded-2xl bg-sunken border border-hairline text-primary text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent-primary/40"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="p-3 bg-sunken rounded-2xl border border-hairline text-xs text-secondary">
              💡 {t('demoAuthenticationNote').replace('{code}', '123456')}
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit" className="bg-accent-secondary">
              {t('sendVerificationOtp')}
            </Button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                  {t('enterSixDigitOtp')}
                </label>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-accent-primary underline cursor-pointer"
                >
                  {t('changeNumber').replace('{phone}', phone)}
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-3.5 rounded-2xl bg-sunken border border-hairline text-primary text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-accent-primary/40"
              />
              {otpError && <p className="text-xs text-status-danger mt-2 font-medium">{otpError}</p>}
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit" className="bg-accent-primary">
              {t('verifyContinue')}
            </Button>
          </form>
        )}

        {step === 'role' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-heading font-bold text-primary">{t('howUseHealthGuard')}</h2>
              <p className="text-xs text-secondary mt-1">{t('selectPrimaryRole')}</p>
            </div>

            {/* Asymmetric Role Cards (Section 3.6 & 6) */}
            <div className="grid grid-cols-1 gap-4">
              {/* Patient Card - Warmer & Illustrated */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectRole('patient')}
                className="p-5 rounded-[24px] bg-accent-primary/10 border-2 border-accent-primary/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent-primary text-white flex items-center justify-center flex-shrink-0">
                    <MedicineIcon size={32} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-primary">{t('patientSeniorRole')}</h3>
                    <p className="text-xs text-secondary leading-snug mt-1">
                      {t('patientRoleDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Caregiver Card - Data Forward */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectRole('caregiver')}
                className="p-5 rounded-[24px] bg-accent-secondary/10 border-2 border-accent-secondary/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent-secondary text-white flex items-center justify-center flex-shrink-0">
                    <CaregiverIcon size={32} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-primary">{t('caregiverFamilyRole')}</h3>
                    <p className="text-xs text-secondary leading-snug mt-1">
                      {t('caregiverRoleDescription')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
