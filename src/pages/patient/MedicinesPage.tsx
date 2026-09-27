import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { Header } from '../../components/layout/Header';
import { BottomNav } from '../../components/layout/BottomNav';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { MedicineIcon } from '../../components/common/Icons';
import type { Medicine } from '../../types';

export const MedicinesPage: React.FC = () => {
  const { medicines, addMedicine, editMedicine, deleteMedicine } = useHealth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState<Medicine | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'twice_daily' | 'thrice_daily' | 'weekly' | 'as_needed'>('daily');
  const [time, setTime] = useState('10:00 AM');
  const [timingPref, setTimingPref] = useState<'before_food' | 'after_food' | 'with_food' | 'anytime'>('after_food');
  const [notes, setNotes] = useState('');

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

  const openEditModal = (med: Medicine) => {
    setEditingMed(med);
    setName(med.name);
    setDosage(med.dosage);
    setFrequency(med.frequency);
    setTime(med.time);
    setTimingPref(med.timingPreference);
    setNotes(med.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) return;

    if (editingMed) {
      editMedicine(editingMed.id, {
        name,
        dosage,
        frequency,
        time,
        timingPreference: timingPref,
        notes,
      });
    } else {
      addMedicine({
        name,
        dosage,
        frequency,
        time,
        startDate: new Date().toISOString().split('T')[0],
        timingPreference: timingPref,
        notes,
        active: true,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-canvas text-primary pb-28 md:pb-12">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary">Medicine Management</h2>
            <p className="text-secondary text-sm mt-1">Manage daily prescriptions, dosages, and timings.</p>
          </div>
          <Button variant="primary" size="md" onClick={openAddModal} className="bg-accent-secondary">
            + Add Medicine
          </Button>
        </div>

        {/* Medicine Cards List (Section 8 & 3.7) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicines.map((med) => (
            <div
              key={med.id}
              className="bg-surface border border-hairline rounded-[24px] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                      <MedicineIcon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-primary">{med.name}</h3>
                      <span className="text-xs font-semibold text-accent-secondary uppercase tracking-wider">
                        {med.dosage} • {med.timingPreference.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-sunken text-primary border border-hairline">
                    ⏰ {med.time}
                  </span>
                </div>

                {med.notes && (
                  <p className="text-xs text-secondary bg-sunken p-2.5 rounded-xl border border-hairline mb-4">
                    📝 {med.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-hairline">
                <Button variant="ghost" size="sm" onClick={() => openEditModal(med)}>
                  ✏️ Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteMedicine(med.id)} className="text-status-danger">
                  🗑️ Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {medicines.length === 0 && (
          <div className="bg-surface border border-hairline rounded-[24px] p-8 text-center my-6">
            <MedicineIcon size={48} className="mx-auto mb-3 text-muted" />
            <h3 className="text-xl font-heading font-bold text-primary mb-1">No Medicines Added Yet</h3>
            <p className="text-secondary text-sm mb-4">Add your daily prescriptions to start receiving automated reminders.</p>
            <Button variant="primary" size="md" onClick={openAddModal} className="bg-accent-secondary">
              + Add First Medicine
            </Button>
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMed ? 'Edit Prescription' : 'Add New Medicine'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-secondary mb-1">Medicine Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amlodipine"
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-secondary mb-1">Dosage</label>
              <input
                type="text"
                required
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 5mg"
                className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-secondary mb-1">Scheduled Time</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-secondary mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            >
              <option value="daily">Once Daily</option>
              <option value="twice_daily">Twice Daily</option>
              <option value="thrice_daily">Thrice Daily</option>
              <option value="weekly">Weekly</option>
              <option value="as_needed">As Needed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-secondary mb-1">Timing Preference</label>
            <select
              value={timingPref}
              onChange={(e) => setTimingPref(e.target.value as any)}
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            >
              <option value="after_food">After Food</option>
              <option value="before_food">Before Food</option>
              <option value="with_food">With Food</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-secondary mb-1">Doctor Notes / Reason</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. For blood pressure control"
              className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" size="md" fullWidth type="submit" className="bg-accent-secondary">
              Save Medicine
            </Button>
            <Button variant="secondary" size="md" fullWidth type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <BottomNav />
    </div>
  );
};
