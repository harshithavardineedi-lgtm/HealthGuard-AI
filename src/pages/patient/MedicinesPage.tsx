import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Header } from '../../components/layout/Header';
import { BottomNav } from '../../components/layout/BottomNav';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { MedicineIcon } from '../../components/common/Icons';
import type { Medicine } from '../../types';

export const MedicinesPage: React.FC = () => {
  const {
    medicines,
    addMedicine,
    editMedicine,
    deleteMedicine,
  } = useHealth();

  const { t, language } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState<Medicine | null>(null);

  // =====================================================
  // FORM STATE
  // =====================================================

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');

  const [frequency, setFrequency] = useState<
    'daily' | 'twice_daily' | 'thrice_daily' | 'weekly' | 'as_needed'
  >('daily');

  const [time, setTime] = useState('10:00 AM');

  const [timingPref, setTimingPref] = useState<
    'before_food' | 'after_food' | 'with_food' | 'anytime'
  >('after_food');

  const [notes, setNotes] = useState('');

  // =====================================================
  // MEDICINE NAME TRANSLATIONS
  // =====================================================

  const medicineTranslations: Record<
    string,
    Record<string, string>
  > = {
    amlodipine: {
      en: 'Amlodipine',
      te: 'అమ్లోడిపైన్',
      hi: 'एम्लोडिपिन',
    },

    metformin: {
      en: 'Metformin',
      te: 'మెట్‌ఫార్మిన్',
      hi: 'मेटफॉर्मिन',
    },

    'vitamin d3': {
      en: 'Vitamin D3',
      te: 'విటమిన్ D3',
      hi: 'विटामिन D3',
    },

    paracetamol: {
      en: 'Paracetamol',
      te: 'పారాసెటమాల్',
      hi: 'पैरासिटामोल',
    },

    acetaminophen: {
      en: 'Acetaminophen',
      te: 'అసిటామినోఫెన్',
      hi: 'एसिटामिनोफेन',
    },

    aspirin: {
      en: 'Aspirin',
      te: 'ఆస్పిరిన్',
      hi: 'एस्पिरिन',
    },

    atorvastatin: {
      en: 'Atorvastatin',
      te: 'అటోర్వాస్టాటిన్',
      hi: 'एटोरवास्टेटिन',
    },

    losartan: {
      en: 'Losartan',
      te: 'లోసార్టాన్',
      hi: 'लोसार्टान',
    },

    telmisartan: {
      en: 'Telmisartan',
      te: 'టెల్మిసార్టాన్',
      hi: 'टेल्मिसार्टन',
    },

    omeprazole: {
      en: 'Omeprazole',
      te: 'ఒమెప్రజోల్',
      hi: 'ओमेप्राज़ोल',
    },

    pantoprazole: {
      en: 'Pantoprazole',
      te: 'పాంటోప్రజోల్',
      hi: 'पैंटोप्राज़ोल',
    },

    levothyroxine: {
      en: 'Levothyroxine',
      te: 'లెవోథైరాక్సిన్',
      hi: 'लेवोथायरोक्सिन',
    },

    insulin: {
      en: 'Insulin',
      te: 'ఇన్సులిన్',
      hi: 'इंसुलिन',
    },
  };

  const translateMedicineName = (
    medicineName: string
  ): string => {
    const key = medicineName.trim().toLowerCase();

    const translated =
      medicineTranslations[key];

    if (!translated) {
      return medicineName;
    }

    return (
      translated[language] ||
      translated.en ||
      medicineName
    );
  };

  // =====================================================
  // TIMING TRANSLATIONS
  // =====================================================

  const translateTiming = (
    timing: string
  ): string => {
    const key = timing
      .toLowerCase()
      .trim();

    const timingTranslations: Record<
      string,
      Record<string, string>
    > = {
      after_food: {
        en: 'After Food',
        te: 'భోజనం తర్వాత',
        hi: 'भोजन के बाद',
      },

      before_food: {
        en: 'Before Food',
        te: 'భోజనానికి ముందు',
        hi: 'भोजन से पहले',
      },

      with_food: {
        en: 'With Food',
        te: 'భోజనంతో',
        hi: 'भोजन के साथ',
      },

      anytime: {
        en: 'Anytime',
        te: 'ఎప్పుడైనా',
        hi: 'कभी भी',
      },
    };

    return (
      timingTranslations[key]?.[language] ||
      timingTranslations[key]?.en ||
      timing
    );
  };

  // =====================================================
  // FREQUENCY TRANSLATIONS
  // =====================================================

  const frequencyTranslations: Record<
    string,
    Record<string, string>
  > = {
    daily: {
      en: 'Once Daily',
      te: 'రోజుకు ఒకసారి',
      hi: 'दिन में एक बार',
    },

    twice_daily: {
      en: 'Twice Daily',
      te: 'రోజుకు రెండుసార్లు',
      hi: 'दिन में दो बार',
    },

    thrice_daily: {
      en: 'Thrice Daily',
      te: 'రోజుకు మూడుసార్లు',
      hi: 'दिन में तीन बार',
    },

    weekly: {
      en: 'Weekly',
      te: 'వారానికి ఒకసారి',
      hi: 'साप्ताहिक',
    },

    as_needed: {
      en: 'As Needed',
      te: 'అవసరమైనప్పుడు',
      hi: 'आवश्यकतानुसार',
    },
  };

  const translateFrequency = (
    frequencyValue: string
  ): string => {
    return (
      frequencyTranslations[frequencyValue]?.[
        language
      ] ||
      frequencyTranslations[frequencyValue]?.en ||
      frequencyValue
    );
  };

  // =====================================================
  // OPEN ADD MEDICINE MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingMed(null);

    setName('');
    setDosage('');
    setFrequency('daily');
    setTime('10:00 AM');
    setTimingPref('after_food');
    setNotes('');

    setIsModalOpen(true);
  };

  // =====================================================
  // OPEN EDIT MEDICINE MODAL
  // =====================================================

  const openEditModal = (
    med: Medicine
  ) => {
    setEditingMed(med);

    // Keep original English medicine name
    // in the input so saved data remains consistent.
    setName(med.name);

    setDosage(med.dosage);
    setFrequency(med.frequency);
    setTime(med.time);
    setTimingPref(
      med.timingPreference
    );
    setNotes(med.notes || '');

    setIsModalOpen(true);
  };

  // =====================================================
  // SAVE MEDICINE
  // =====================================================

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim() || !dosage.trim()) {
      return;
    }

    if (editingMed) {
      editMedicine(
        editingMed.id,
        {
          name: name.trim(),
          dosage: dosage.trim(),
          frequency,
          time: time.trim(),
          timingPreference: timingPref,
          notes: notes.trim(),
        }
      );
    } else {
      addMedicine({
        name: name.trim(),
        dosage: dosage.trim(),
        frequency,
        time: time.trim(),
        startDate:
          new Date()
            .toISOString()
            .split('T')[0],
        timingPreference: timingPref,
        notes: notes.trim(),
        active: true,
      });
    }

    setIsModalOpen(false);
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-canvas text-primary pb-28 lg:pb-12">

      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-3xl font-heading font-bold text-primary">
              {t('medicineManagement')}
            </h2>

            <p className="text-secondary text-sm mt-1">
              {t(
                'medicineManagementDescription'
              )}
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={openAddModal}
            className="bg-accent-secondary"
          >
            + {t('addMedicine')}
          </Button>

        </div>

        {/* =================================================
            MEDICINE CARDS
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {medicines.map((med) => (

            <div
              key={med.id}
              className="bg-surface border border-hairline rounded-[24px] p-5 flex flex-col justify-between"
            >

              <div>

                {/* Medicine Header */}

                <div className="flex items-start justify-between mb-3">

                  <div className="flex items-center gap-3">

                    {/* Icon */}

                    <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">

                      <MedicineIcon
                        size={26}
                      />

                    </div>

                    {/* Medicine Information */}

                    <div>

                      <h3 className="text-xl font-heading font-bold text-primary">

                        {translateMedicineName(
                          med.name
                        )}

                      </h3>

                      <span className="text-xs font-semibold text-accent-secondary uppercase tracking-wider">

                        {med.dosage}

                        {' • '}

                        {translateTiming(
                          med.timingPreference
                        )}

                      </span>

                    </div>

                  </div>

                  {/* Time */}

                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-sunken text-primary border border-hairline whitespace-nowrap">

                    ⏰ {med.time}

                  </span>

                </div>

                {/* Doctor Notes */}

                {med.notes && (

                  <p className="text-xs text-secondary bg-sunken p-2.5 rounded-xl border border-hairline mb-4">

                    📝 {med.notes}

                  </p>

                )}

              </div>

              {/* Edit / Delete */}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-hairline">

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    openEditModal(med)
                  }
                >
                  ✏️ {t('edit')}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    deleteMedicine(med.id)
                  }
                  className="text-status-danger"
                >
                  🗑️ {t('delete')}
                </Button>

              </div>

            </div>

          ))}

        </div>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {medicines.length === 0 && (

          <div className="bg-surface border border-hairline rounded-[24px] p-8 text-center my-6">

            <MedicineIcon
              size={48}
              className="mx-auto mb-3 text-muted"
            />

            <h3 className="text-xl font-heading font-bold text-primary mb-1">

              {t(
                'noMedicinesAdded'
              )}

            </h3>

            <p className="text-secondary text-sm mb-4">

              {t(
                'addDailyPrescriptions'
              )}

            </p>

            <Button
              variant="primary"
              size="md"
              onClick={openAddModal}
              className="bg-accent-secondary"
            >
              + {t('addFirstMedicine')}
            </Button>

          </div>

        )}

      </main>

      {/* =================================================
          ADD / EDIT MEDICINE MODAL
      ================================================= */}

      <Modal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        title={
          editingMed
            ? t('editPrescription')
            : t('addNewMedicine')
        }
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* =================================================
              MEDICINE NAME
          ================================================= */}

          <div>

            <label className="block text-xs font-semibold uppercase text-secondary mb-1">

              {t('medicineName')}

            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder={t(
                'medicinePlaceholder'
              )}
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            />

          </div>

          {/* =================================================
              DOSAGE + TIME
          ================================================= */}

          <div className="grid grid-cols-2 gap-3">

            {/* Dosage */}

            <div>

              <label className="block text-xs font-semibold uppercase text-secondary mb-1">

                {t('dosage')}

              </label>

              <input
                type="text"
                required
                value={dosage}
                onChange={(e) =>
                  setDosage(
                    e.target.value
                  )
                }
                placeholder={t(
                  'dosagePlaceholder'
                )}
                className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
              />

            </div>

            {/* Scheduled Time */}

            <div>

              <label className="block text-xs font-semibold uppercase text-secondary mb-1">

                {t(
                  'scheduledTime'
                )}

              </label>

              <input
                type="text"
                required
                value={time}
                onChange={(e) =>
                  setTime(
                    e.target.value
                  )
                }
                placeholder={t(
                  'scheduledTimePlaceholder'
                )}
                className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
              />

            </div>

          </div>

          {/* =================================================
              FREQUENCY
          ================================================= */}

          <div>

            <label className="block text-xs font-semibold uppercase text-secondary mb-1">

              {t('frequency')}

            </label>

            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(
                  e.target.value as
                    | 'daily'
                    | 'twice_daily'
                    | 'thrice_daily'
                    | 'weekly'
                    | 'as_needed'
                )
              }
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            >

              <option value="daily">
                {translateFrequency(
                  'daily'
                )}
              </option>

              <option value="twice_daily">
                {translateFrequency(
                  'twice_daily'
                )}
              </option>

              <option value="thrice_daily">
                {translateFrequency(
                  'thrice_daily'
                )}
              </option>

              <option value="weekly">
                {translateFrequency(
                  'weekly'
                )}
              </option>

              <option value="as_needed">
                {translateFrequency(
                  'as_needed'
                )}
              </option>

            </select>

          </div>

          {/* =================================================
              TIMING PREFERENCE
          ================================================= */}

          <div>

            <label className="block text-xs font-semibold uppercase text-secondary mb-1">

              {t(
                'timingPreference'
              )}

            </label>

            <select
              value={timingPref}
              onChange={(e) =>
                setTimingPref(
                  e.target.value as
                    | 'before_food'
                    | 'after_food'
                    | 'with_food'
                    | 'anytime'
                )
              }
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            >

              <option value="after_food">
                {translateTiming(
                  'after_food'
                )}
              </option>

              <option value="before_food">
                {translateTiming(
                  'before_food'
                )}
              </option>

              <option value="with_food">
                {translateTiming(
                  'with_food'
                )}
              </option>

              <option value="anytime">
                {translateTiming(
                  'anytime'
                )}
              </option>

            </select>

          </div>

          {/* =================================================
              DOCTOR NOTES
          ================================================= */}

          <div>

            <label className="block text-xs font-semibold uppercase text-secondary mb-1">

              {t(
                'doctorNotesReason'
              )}

            </label>

            <textarea
              rows={2}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              placeholder={t(
                'doctorNotesPlaceholder'
              )}
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            />

          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="flex items-center gap-3 pt-2">

            <Button
              variant="primary"
              size="md"
              fullWidth
              type="submit"
              className="bg-accent-secondary"
            >
              {t('saveMedicine')}
            </Button>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              type="button"
              onClick={() =>
                setIsModalOpen(false)
              }
            >
              {t('cancel')}
            </Button>

          </div>

        </form>

      </Modal>

      <BottomNav />

    </div>
  );
};