import React, { useState, useEffect } from 'react';

const PostSurgeryCare = ({ user }) => {
  const [recoveryPlan, setRecoveryPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dailyUpdates, setDailyUpdates] = useState([]);
  const [formData, setFormData] = useState({
    surgery_type: '',
    surgery_date: '',
    expected_recovery_days: 30,
    restrictions: [],
    care_instructions: '',
    medications: [],
    follow_up_date: ''
  });

  useEffect(() => {
    loadRecoveryPlan();
  }, [user?.id]);

  const loadRecoveryPlan = () => {
    // In production, load from backend
    const stored = localStorage.getItem(`recovery_plan_${user?.id}`);
    if (stored) {
      const plan = JSON.parse(stored);
      setRecoveryPlan(plan);
      
      // Load daily updates
      const updatesKey = `recovery_updates_${user?.id}`;
      const storedUpdates = localStorage.getItem(updatesKey);
      if (storedUpdates) {
        setDailyUpdates(JSON.parse(storedUpdates));
      }
    }
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();
    const plan = {
      id: `RECOVERY-${Date.now()}`,
      ...formData,
      created_date: new Date().toISOString().split('T')[0],
      patient_id: user?.id,
      progress: 0,
      milestones: [
        { day: 1, milestone: 'Initial recovery', completed: false },
        { day: 7, milestone: 'Week 1 checkup', completed: false },
        { day: 14, milestone: 'Two weeks recovery', completed: false },
        { day: 30, milestone: 'Full recovery milestone', completed: false }
      ]
    };

    setRecoveryPlan(plan);
    localStorage.setItem(`recovery_plan_${user?.id}`, JSON.stringify(plan));
    setFormData({
      surgery_type: '',
      surgery_date: '',
      expected_recovery_days: 30,
      restrictions: [],
      care_instructions: '',
      medications: [],
      follow_up_date: ''
    });
    setShowForm(false);
  };

  const addDailyUpdate = () => {
    const update = {
      id: `UPDATE-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      pain_level: 5,
      mobility: 5,
      mood: 'good',
      notes: '',
      symptoms: []
    };

    const newUpdates = [update, ...dailyUpdates];
    setDailyUpdates(newUpdates);
    localStorage.setItem(`recovery_updates_${user?.id}`, JSON.stringify(newUpdates));
  };

  const updateDailyEntry = (updateId, field, value) => {
    const updated = dailyUpdates.map(u => 
      u.id === updateId ? { ...u, [field]: value } : u
    );
    setDailyUpdates(updated);
    localStorage.setItem(`recovery_updates_${user?.id}`, JSON.stringify(updated));
  };

  const calculateProgress = () => {
    if (!recoveryPlan) return 0;
    const surgeryDate = new Date(recoveryPlan.surgery_date);
    const today = new Date();
    const days = Math.floor((today - surgeryDate) / (1000 * 60 * 60 * 24));
    return Math.min(100, Math.round((days / recoveryPlan.expected_recovery_days) * 100));
  };

  const getDaysSinceSurgery = () => {
    if (!recoveryPlan) return 0;
    const surgeryDate = new Date(recoveryPlan.surgery_date);
    const today = new Date();
    return Math.floor((today - surgeryDate) / (1000 * 60 * 60 * 24));
  };

  const recoveryTips = [
    { day: 1, tip: 'Rest and avoid strenuous activities', icon: '🛏️' },
    { day: 3, tip: 'Start light walking if approved', icon: '🚶' },
    { day: 7, tip: 'Attend follow-up checkup', icon: '🏥' },
    { day: 14, tip: 'Gradually increase activity levels', icon: '🏃' },
    { day: 21, tip: 'Resume light work activities', icon: '💼' },
    { day: 30, tip: 'Full recovery - resume normal activities', icon: '✨' }
  ];

  if (!recoveryPlan) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-8 text-center">
          <span className="text-4xl block mb-3">🏥</span>
          <h3 className="text-xl font-semibold text-gray-900">Surgery Recovery Tracking</h3>
          <p className="text-gray-600 mt-2">Track your post-surgery recovery journey day by day</p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 px-6 py-2.5 bg-medical-600 text-white rounded-lg font-semibold hover:bg-medical-700"
          >
            {showForm ? 'Cancel' : 'Start Recovery Plan'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Recovery Plan</h3>
            <form onSubmit={handleCreatePlan} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Surgery Type *</label>
                  <input
                    type="text"
                    value={formData.surgery_type}
                    onChange={(e) => setFormData({ ...formData, surgery_type: e.target.value })}
                    placeholder="e.g., Appendectomy"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Surgery Date *</label>
                  <input
                    type="date"
                    value={formData.surgery_date}
                    onChange={(e) => setFormData({ ...formData, surgery_date: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected Recovery Days</label>
                  <input
                    type="number"
                    value={formData.expected_recovery_days}
                    onChange={(e) => setFormData({ ...formData, expected_recovery_days: Number(e.target.value) })}
                    min="7"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Follow-up Date</label>
                  <input
                    type="date"
                    value={formData.follow_up_date}
                    onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Care Instructions</label>
                <textarea
                  value={formData.care_instructions}
                  onChange={(e) => setFormData({ ...formData, care_instructions: e.target.value })}
                  placeholder="Enter care instructions provided by your doctor"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-medical-600 text-white rounded-lg font-semibold hover:bg-medical-700"
              >
                Create Plan
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  const daysSinceSurgery = getDaysSinceSurgery();
  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      {/* Recovery Overview */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{recoveryPlan.surgery_type}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>📅 {new Date(recoveryPlan.surgery_date).toLocaleDateString()}</div>
              <div>⏱️ {daysSinceSurgery} days since surgery</div>
              <div>🎯 {recoveryPlan.expected_recovery_days} day recovery plan</div>
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-3">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                <circle cx="60" cy="60" r="54" fill="none"
                  stroke={progress >= 80 ? '#10B981' : progress >= 50 ? '#F59E0B' : '#3B82F6'}
                  strokeWidth="8" strokeDasharray={`${(progress / 100) * 339.3} 339.3`}
                  strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">{progress}%</span>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">Recovery Progress</div>
              <div className="text-xs text-gray-500">
                {progress < 50 ? 'Early stage' : progress < 80 ? 'Good progress' : 'Nearly complete'}
              </div>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="flex flex-col justify-center">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Milestones</h4>
            {recoveryPlan.milestones?.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm mb-2">
                <span className={`text-lg ${m.day <= daysSinceSurgery ? 'text-green-600' : 'text-gray-400'}`}>
                  {m.day <= daysSinceSurgery ? '✓' : '○'}
                </span>
                <span className={m.day <= daysSinceSurgery ? 'text-green-600 line-through' : 'text-gray-600'}>
                  Day {m.day}: {m.milestone}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Tracking */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">📝 Daily Recovery Log</h3>
          <button
            onClick={addDailyUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            + Add Today's Update
          </button>
        </div>

        {dailyUpdates.length > 0 ? (
          <div className="space-y-4">
            {dailyUpdates.map((update, idx) => (
              <div key={update.id} className="p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-gray-900">
                    {new Date(update.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                  <span className="text-xs text-gray-500">Day {daysSinceSurgery - idx}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Pain Level */}
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-2 block">Pain Level</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => updateDailyEntry(update.id, 'pain_level', level)}
                          className={`w-8 h-8 rounded text-sm font-semibold transition-colors ${
                            update.pain_level === level
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{update.pain_level}/5</div>
                  </div>

                  {/* Mobility */}
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-2 block">Mobility</label>
                    <select
                      value={update.mobility}
                      onChange={(e) => updateDailyEntry(update.id, 'mobility', Number(e.target.value))}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-medical-500"
                    >
                      <option value={1}>Very Limited</option>
                      <option value={2}>Limited</option>
                      <option value={3}>Moderate</option>
                      <option value={4}>Good</option>
                      <option value={5}>Excellent</option>
                    </select>
                  </div>

                  {/* Mood */}
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-2 block">Mood</label>
                    <select
                      value={update.mood}
                      onChange={(e) => updateDailyEntry(update.id, 'mood', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-medical-500"
                    >
                      <option value="poor">😢 Poor</option>
                      <option value="fair">😐 Fair</option>
                      <option value="good">😊 Good</option>
                      <option value="excellent">😄 Excellent</option>
                    </select>
                  </div>
                </div>

                <textarea
                  value={update.notes}
                  onChange={(e) => updateDailyEntry(update.id, 'notes', e.target.value)}
                  placeholder="Add notes about your recovery..."
                  className="w-full mt-3 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-medical-500"
                  rows="2"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-8">No daily updates yet. Start tracking your recovery!</p>
        )}
      </div>

      {/* Recovery Tips */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Recovery Timeline & Tips</h3>
        <div className="space-y-3">
          {recoveryTips.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border-l-4 ${
              daysSinceSurgery >= item.day ? 'bg-green-50 border-green-500' :
              daysSinceSurgery + 7 >= item.day ? 'bg-yellow-50 border-yellow-500' :
              'bg-gray-50 border-gray-300'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Day {item.day}</div>
                  <p className="text-sm text-gray-700">{item.tip}</p>
                  {daysSinceSurgery >= item.day && (
                    <span className="text-xs text-green-600 font-medium mt-1">✓ Completed</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Care Instructions */}
      {recoveryPlan.care_instructions && (
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Care Instructions</h3>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">{recoveryPlan.care_instructions}</div>
        </div>
      )}
    </div>
  );
};

export default PostSurgeryCare;
