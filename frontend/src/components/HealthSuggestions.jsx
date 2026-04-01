import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config/apiConfig';

const HealthSuggestions = ({ user, vitals = {} }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiSuggestionLoading, setAiSuggestionLoading] = useState(false);
  const [aiSuggestionError, setAiSuggestionError] = useState('');

  useEffect(() => {
    generateSuggestions();
  }, [vitals, user]);

  useEffect(() => {
    loadBottomAiSuggestion();
  }, [vitals, user]);

  const loadBottomAiSuggestion = async () => {
    try {
      setAiSuggestionLoading(true);
      setAiSuggestionError('');

      const conditions = Array.isArray(user?.conditions) && user.conditions.length > 0
        ? user.conditions.join(', ')
        : 'No known chronic conditions provided';

      const meds = Array.isArray(user?.medications) && user.medications.length > 0
        ? user.medications
          .map((m) => `${m.name || 'Medicine'}${m.dosage ? ` (${m.dosage})` : ''}`)
          .join(', ')
        : 'No current medication list provided';

      const summaryPrompt = [
        'Provide personalized health suggestions for this patient.',
        'Return concise plain text with 5 bullet points and one short safety note.',
        'Avoid diagnosis and avoid medication prescription.',
        `Patient conditions: ${conditions}.`,
        `Current medications: ${meds}.`,
        `Current vitals: heart rate ${vitals.heart_rate || 'N/A'} bpm, blood pressure ${vitals.blood_pressure || 'N/A'}, SpO2 ${vitals.spo2 || 'N/A'}%, temperature ${vitals.temperature || 'N/A'}F, blood glucose ${vitals.blood_glucose || 'N/A'} mg/dL.`
      ].join(' ');

      const response = await fetch(`${API_BASE}/chatbot/medical-suggestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: summaryPrompt,
          conversation_id: `health-tips-${user?.id || 'guest'}`,
          patient_context: {
            vitals,
            conditions: Array.isArray(user?.conditions) ? user.conditions : [],
            medications: Array.isArray(user?.medications)
              ? user.medications.map((m) => m.name || '').filter(Boolean)
              : [],
          },
        }),
      });

      const data = await response.json();
      const text = data?.response?.message || data?.message || '';

      if (response.ok && text) {
        setAiSuggestion(text);
      } else {
        setAiSuggestionError('Unable to load personalized AI suggestions right now.');
      }
    } catch {
      setAiSuggestionError('Unable to load personalized AI suggestions right now.');
    } finally {
      setAiSuggestionLoading(false);
    }
  };

  const generateSuggestions = () => {
    // AI-based suggestions based on vitals
    const tips = [];

    // Heart Rate Analysis
    if (vitals.heart_rate) {
      if (vitals.heart_rate > 100) {
        tips.push({
          icon: '❤️',
          title: 'High Heart Rate',
          message: 'Your heart rate is elevated. Try relaxation exercises or consult your doctor.',
          priority: 'high',
          action: 'Schedule Checkup'
        });
      } else if (vitals.heart_rate < 60) {
        tips.push({
          icon: '❤️',
          title: 'Low Heart Rate',
          message: 'Your resting heart rate is low. Ensure adequate rest and hydration.',
          priority: 'medium',
          action: 'Get Rest'
        });
      } else {
        tips.push({
          icon: '❤️',
          title: 'Heart Rate Normal',
          message: 'Your heart rate is in a healthy range. Keep up the good exercise routine!',
          priority: 'low',
          action: 'Continue'
        });
      }
    }

    // Blood Pressure Analysis
    if (vitals.blood_pressure) {
      const bpParts = String(vitals.blood_pressure).split('/');
      const systolic = Number(bpParts[0]) || 0;
      const diastolic = Number(bpParts[1]) || 0;

      if (systolic > 140 || diastolic > 90) {
        tips.push({
          icon: '🩸',
          title: 'High Blood Pressure',
          message: 'Consider reducing salt intake and managing stress levels.',
          priority: 'high',
          action: 'Lifestyle Changes'
        });
      } else if (systolic < 90 || diastolic < 60) {
        tips.push({
          icon: '🩸',
          title: 'Low Blood Pressure',
          message: 'Stay hydrated and avoid sudden position changes.',
          priority: 'medium',
          action: 'Stay Hydrated'
        });
      } else {
        tips.push({
          icon: '🩸',
          title: 'Blood Pressure Normalized',
          message: 'Your blood pressure is well-controlled! Maintain current routine.',
          priority: 'low',
          action: 'Maintain'
        });
      }
    }

    // SpO2 Analysis
    if (vitals.spo2) {
      if (vitals.spo2 < 95) {
        tips.push({
          icon: '🫁',
          title: 'Low Oxygen Level',
          message: 'Your oxygen saturation is low. Perform deep breathing exercises.',
          priority: 'high',
          action: 'Contact Doctor'
        });
      } else {
        tips.push({
          icon: '🫁',
          title: 'Oxygen Level Optimal',
          message: 'Your oxygen levels are healthy. Continue regular physical activity.',
          priority: 'low',
          action: 'Stay Active'
        });
      }
    }

    // Temperature Analysis
    if (vitals.temperature) {
      if (vitals.temperature > 99.5) {
        tips.push({
          icon: '🌡️',
          title: 'Elevated Temperature',
          message: 'You have a slight fever. Rest well and monitor your temperature.',
          priority: 'high',
          action: 'Monitor'
        });
      } else {
        tips.push({
          icon: '🌡️',
          title: 'Temperature Normal',
          message: 'Your body temperature is normal. All good!',
          priority: 'low',
          action: 'Continue'
        });
      }
    }

    // Blood Glucose Analysis
    if (vitals.blood_glucose) {
      if (vitals.blood_glucose > 140) {
        tips.push({
          icon: '🍬',
          title: 'High Blood Sugar',
          message: 'Reduce sugary foods and increase physical activity.',
          priority: 'high',
          action: 'Dietary Changes'
        });
      } else if (vitals.blood_glucose < 70) {
        tips.push({
          icon: '🍬',
          title: 'Low Blood Sugar',
          message: 'Have a healthy snack and monitor your glucose levels.',
          priority: 'high',
          action: 'Eat Snack'
        });
      } else {
        tips.push({
          icon: '🍬',
          title: 'Blood Sugar Balanced',
          message: 'Your glucose levels are well-balanced. Keep maintaining!',
          priority: 'low',
          action: 'Maintain'
        });
      }
    }

    // Additional General Tips
    if (tips.length > 0) {
      tips.push({
        icon: '💪',
        title: 'Daily Exercise',
        message: 'Engage in at least 30 minutes of moderate physical activity daily.',
        priority: 'medium',
        action: 'Start Exercise'
      }, {
        icon: '💧',
        title: 'Hydration',
        message: 'Drink 8-10 glasses of water daily to stay hydrated.',
        priority: 'medium',
        action: 'Drink Water'
      }, {
        icon: '😴',
        title: 'Sleep Quality',
        message: 'Aim for 7-8 hours of quality sleep every night.',
        priority: 'medium',
        action: 'Sleep Schedule'
      });
    }

    setSuggestions(tips);

    // Calculate progress
    const highPriorityCount = tips.filter(t => t.priority === 'high').length;
    const progressScore = Math.max(0, 100 - highPriorityCount * 15);
    setProgress({
      score: progressScore,
      completed: tips.filter(t => t.priority === 'low').length,
      pending: tips.filter(t => t.priority !== 'low').length,
      status: progressScore >= 80 ? 'Excellent' : progressScore >= 60 ? 'Good' : 'Needs Attention'
    });

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-medical-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      {progress && (
        <div className="bg-gradient-to-r from-teal-50 to-medical-50 rounded-2xl border border-teal-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Your Health Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Circle */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-3">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" fill="none"
                    stroke={progress.score >= 80 ? '#10B981' : progress.score >= 60 ? '#F59E0B' : '#EF4444'}
                    strokeWidth="8" strokeDasharray={`${(progress.score / 100) * 282.7} 282.7`} 
                    strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{progress.score}</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-900">{progress.status}</div>
                <div className="text-xs text-gray-500">Overall Health</div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="bg-white rounded-xl p-3">
                <div className="text-2xl font-bold text-green-600">{progress.completed}</div>
                <div className="text-xs text-gray-500">Healthy Metrics</div>
              </div>
              <div className="bg-white rounded-xl p-3">
                <div className="text-2xl font-bold text-orange-600">{progress.pending}</div>
                <div className="text-xs text-gray-500">Needs Attention</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm font-semibold text-gray-900 mb-3">🏆 Weekly Achievements</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Maintained exercise routine</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Good sleep schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Hydration tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Health Suggestions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 AI-Based Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, idx) => (
            <div key={idx} className={`rounded-xl p-4 border-l-4 ${
              suggestion.priority === 'high' ? 'bg-red-50 border-red-500' :
              suggestion.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-green-50 border-green-500'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{suggestion.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">{suggestion.title}</div>
                  <p className="text-xs text-gray-600 mt-1">{suggestion.message}</p>
                  <button className={`mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    suggestion.priority === 'high' ? 'bg-red-200 text-red-700 hover:bg-red-300' :
                    suggestion.priority === 'medium' ? 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300' :
                    'bg-green-200 text-green-700 hover:bg-green-300'
                  }`}>
                    {suggestion.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Health Goals */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Daily Health Goals</h3>
        <div className="space-y-3">
          {[
            { goal: 'Steps', current: '6,200', target: '10,000', icon: '👣' },
            { goal: 'Water Intake', current: '5', target: '8', icon: '💧', unit: 'glasses' },
            { goal: 'Exercise', current: '20', target: '30', icon: '💪', unit: 'mins' },
            { goal: 'Sleep', current: '6.5', target: '8', icon: '😴', unit: 'hours' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{item.goal}</span>
                  <span className="text-xs text-gray-500">{item.current}/{item.target} {item.unit || ''}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-medical-600 rounded-full"
                    style={{ width: `${Math.min(100, (parseFloat(item.current) / parseFloat(item.target)) * 100)}%` }}>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Personalized AI Suggestion */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-900">🤖 Personalized AI Suggestion</h3>
          <button
            type="button"
            onClick={loadBottomAiSuggestion}
            disabled={aiSuggestionLoading}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-60"
          >
            {aiSuggestionLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {aiSuggestionLoading && (
          <div className="text-sm text-gray-600">Generating AI suggestions based on your latest health data...</div>
        )}

        {!aiSuggestionLoading && aiSuggestionError && (
          <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
            {aiSuggestionError}
          </div>
        )}

        {!aiSuggestionLoading && !aiSuggestionError && aiSuggestion && (
          <div className="rounded-xl bg-white border border-blue-100 p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {aiSuggestion}
          </div>
        )}

        {!aiSuggestionLoading && !aiSuggestionError && !aiSuggestion && (
          <div className="text-sm text-gray-600">No AI suggestion available yet.</div>
        )}
      </div>
    </div>
  );
};

export default HealthSuggestions;
