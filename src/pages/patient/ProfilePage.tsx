import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { Header } from '../../components/layout/Header';
import { BottomNav } from '../../components/layout/BottomNav';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { patient, updatePatientProfile } = useHealth();
  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age.toString());
  const [phone, setPhone] = useState(patient.phone);
  const [bloodGroup, setBloodGroup] = useState(patient.bloodGroup);
  const [emergencyContact, setEmergencyContact] = useState(patient.emergencyContact);
  const [allergiesStr, setAllergiesStr] = useState(patient.allergies.join(', '));
  const [medicalNotes, setMedicalNotes] = useState(patient.medicalNotes);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatientProfile({
      name,
      age: Number(age) || patient.age,
      phone,
      bloodGroup,
      emergencyContact,
      allergies: allergiesStr.split(',').map((s) => s.trim()).filter(Boolean),
      medicalNotes,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-primary pb-28 md:pb-12">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary">Patient Profile</h2>
            <p className="text-secondary text-sm mt-1">Manage personal & medical profile details.</p>
          </div>
          <Link
            to="/patient/emergency-info"
            className="px-4 py-2 rounded-2xl bg-status-danger text-white font-bold text-xs shadow-xs hover:opacity-95"
          >
            📄 Emergency Card
          </Link>
        </div>

        <div className="bg-surface border border-hairline rounded-[24px] p-6 shadow-xs">
          {isSaved && (
            <div className="p-3 mb-4 rounded-xl bg-status-safe/10 border border-status-safe/30 text-status-safe text-xs font-semibold text-center">
              ✓ Profile details updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-secondary mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-secondary mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-secondary mb-1">Blood Group</label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-secondary mb-1">Emergency Phone Contact</label>
              <input
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-secondary mb-1">Known Allergies (comma separated)</label>
              <input
                type="text"
                value={allergiesStr}
                onChange={(e) => setAllergiesStr(e.target.value)}
                className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-secondary mb-1">Medical Conditions & Notes</label>
              <textarea
                rows={3}
                value={medicalNotes}
                onChange={(e) => setMedicalNotes(e.target.value)}
                className="w-full p-3 rounded-2xl bg-sunken border border-hairline text-primary focus:outline-none"
              />
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit" className="bg-accent-secondary">
              Save Profile Changes
            </Button>
          </form>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
