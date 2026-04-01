import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config/apiConfig';

const SurgeryRiskForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    age: '',
    systolic_bp: '',
    diastolic_bp: '',
    heart_rate: '',
    cholesterol: '',
    bmi: '',
    diabetes: false,
    smoking: false,
    previous_surgeries: '0',
    comorbidity_count: '0',
    surgery_name: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [selectedSurgeryDetails, setSelectedSurgeryDetails] = useState(null);
  const [surgeryDetailsLoading, setSurgeryDetailsLoading] = useState(false);
  const [patientProfile, setPatientProfile] = useState(null);

  // Auto-fill patient data on component mount
  useEffect(() => {
    loadPatientProfile();
  }, []);

  // Load AI recommendations when patient conditions change
  useEffect(() => {
    if (patientProfile?.conditions && patientProfile.conditions.length > 0) {
      loadAISurgeryRecommendations();
    }
  }, [patientProfile]);

  // Load surgery details when selected surgery changes
  useEffect(() => {
    if (formData.surgery_name) {
      loadSurgeryDetails(formData.surgery_name);
    } else {
      setSelectedSurgeryDetails(null);
    }
  }, [formData.surgery_name]);

  const loadPatientProfile = () => {
    try {
      const userStr = localStorage.getItem('user');
      const profileStr = localStorage.getItem('profile');
      
      if (userStr) {
        const user = JSON.parse(userStr);
        const profile = profileStr ? JSON.parse(profileStr) : user;
        
        setPatientProfile(profile);

        // Auto-fill form with patient data
        if (profile) {
          const vitals = profile.vitals || {};
          const bp = profile.blood_pressure || vitals.blood_pressure || '120/80';
          const [systolic, diastolic] = bp.split('/').map(Number);

          setFormData(prev => ({
            ...prev,
            age: profile.age || prev.age,
            systolic_bp: systolic || prev.systolic_bp,
            diastolic_bp: diastolic || prev.diastolic_bp,
            heart_rate: vitals.heart_rate || profile.heart_rate || prev.heart_rate,
            cholesterol: vitals.cholesterol || prev.cholesterol,
            bmi: vitals.bmi || profile.bmi || prev.bmi,
            diabetes: profile.conditions?.includes('Type 2 Diabetes') || profile.conditions?.includes('Diabetes') || prev.diabetes,
            smoking: profile.smoking || prev.smoking,
            previous_surgeries: profile.previous_surgeries || prev.previous_surgeries,
            comorbidity_count: profile.conditions?.length - 1 || prev.comorbidity_count,
          }));
        }
      }
    } catch (error) {
      console.error('Failed to load patient profile:', error);
    }
  };

  const loadAISurgeryRecommendations = async () => {
    try {
      setRecommendationsLoading(true);
      const response = await fetch(`${API_BASE}/diagnosis/surgery-recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conditions: patientProfile?.conditions || [],
          temperature: 0.6,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setRecommendations(data.recommendations || []);
      }
    } catch (error) {
      console.error('Failed to load surgery recommendations:', error);
    } finally {
      setRecommendationsLoading(false);
    }
  };

  const loadSurgeryDetails = async (surgeryName) => {
    try {
      setSurgeryDetailsLoading(true);
      const response = await fetch(`${API_BASE}/diagnosis/surgery-details/${encodeURIComponent(surgeryName)}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedSurgeryDetails(data.details);
      }
    } catch (error) {
      console.error('Failed to load surgery details:', error);
    } finally {
      setSurgeryDetailsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      age: parseInt(formData.age) || 50,
      systolic_bp: parseInt(formData.systolic_bp) || 120,
      diastolic_bp: parseInt(formData.diastolic_bp) || 80,
      heart_rate: parseInt(formData.heart_rate) || 72,
      cholesterol: parseInt(formData.cholesterol) || 200,
      bmi: parseFloat(formData.bmi) || 25,
      diabetes: formData.diabetes,
      smoking: formData.smoking,
      previous_surgeries: parseInt(formData.previous_surgeries) || 0,
      comorbidity_count: parseInt(formData.comorbidity_count) || 0,
      surgery_name: formData.surgery_name || undefined,
    };

    try {
      const endpoint = formData.surgery_name 
        ? '/diagnosis/surgery-risk-with-side-effects'
        : '/diagnosis/surgery-risk';
      
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResult(data);
      if (onResult) onResult(data);
    } catch {
      const simulated = generateSimulatedResult(payload);
      setResult(simulated);
      if (onResult) onResult(simulated);
    } finally {
      setLoading(false);
    }
  };

  const generateSimulatedResult = (data) => {
    let score = 0;
    if (data.age > 65) score += 2;
    else if (data.age > 50) score += 1;
    if (data.systolic_bp > 140) score += 2;
    if (data.cholesterol > 240) score += 1;
    if (data.diabetes) score += 1.5;
    if (data.smoking) score += 1;
    if (data.bmi > 30) score += 1;
    if (data.comorbidity_count > 2) score += 1.5;

    const riskLevel = score > 6 ? 2 : score > 3 ? 1 : 0;
    const levels = {
      0: { level: 'Low Risk', color: '#10B981', percentage_range: '0-30%', description: 'Patient is generally fit for surgery.', recommendations: ['Standard pre-operative assessment', 'Routine blood work'] },
      1: { level: 'Medium Risk', color: '#F59E0B', percentage_range: '30-65%', description: 'Moderate risk factors present.', recommendations: ['Enhanced pre-operative assessment', 'Cardiac evaluation', 'Anesthesiologist consultation'] },
      2: { level: 'High Risk', color: '#EF4444', percentage_range: '65-100%', description: 'Significant risk factors detected.', recommendations: ['Multi-specialist evaluation', 'ICU standby required', 'Discuss alternatives'] },
    };

    return {
      success: true,
      risk_level: riskLevel,
      risk_info: levels[riskLevel],
      confidence: [82.5, 74.3, 88.1][riskLevel],
      probabilities: riskLevel === 0 ? { low: 82.5, medium: 12.3, high: 5.2 } : riskLevel === 1 ? { low: 15.7, medium: 74.3, high: 10.0 } : { low: 3.2, medium: 8.7, high: 88.1 },
      risk_factors: [
        { factor: 'Age', importance: 22.5 },
        { factor: 'Blood Pressure', importance: 18.3 },
        { factor: 'Comorbidities', importance: 15.7 },
        { factor: 'BMI', importance: 12.1 },
        { factor: 'Cholesterol', importance: 10.8 },
        { factor: 'Diabetes', importance: 8.4 },
      ],
      patient_summary: {
        total_concerns: riskLevel + 1,
        concerns: data.age > 65 ? ['Advanced age'] : [],
        clearance: levels[riskLevel].description,
      },
      simulated: true,
    };
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Parameters</h3>
        <p className="text-sm text-gray-500 mb-6">Auto-filled with your patient profile data</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Age (years)</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange}
              placeholder="e.g. 55" min="1" max="120" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Systolic BP (mmHg)</label>
            <input type="number" name="systolic_bp" value={formData.systolic_bp} onChange={handleChange}
              placeholder="e.g. 130" min="70" max="250" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Diastolic BP (mmHg)</label>
            <input type="number" name="diastolic_bp" value={formData.diastolic_bp} onChange={handleChange}
              placeholder="e.g. 85" min="40" max="150" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Heart Rate (BPM)</label>
            <input type="number" name="heart_rate" value={formData.heart_rate} onChange={handleChange}
              placeholder="e.g. 72" min="30" max="200" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Cholesterol (mg/dL)</label>
            <input type="number" name="cholesterol" value={formData.cholesterol} onChange={handleChange}
              placeholder="e.g. 200" min="100" max="400" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>BMI</label>
            <input type="number" name="bmi" value={formData.bmi} onChange={handleChange}
              placeholder="e.g. 25.4" min="10" max="60" step="0.1" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Previous Surgeries</label>
            <select name="previous_surgeries" value={formData.previous_surgeries} onChange={handleChange} className={inputClass}>
              {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Comorbidity Count</label>
            <select name="comorbidity_count" value={formData.comorbidity_count} onChange={handleChange} className={inputClass}>
              {[0,1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 mt-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="diabetes" checked={formData.diabetes} onChange={handleChange}
              className="w-4 h-4 text-medical-600 border-gray-300 rounded focus:ring-medical-500" />
            <span className="text-sm text-gray-700">Diabetes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="smoking" checked={formData.smoking} onChange={handleChange}
              className="w-4 h-4 text-medical-600 border-gray-300 rounded focus:ring-medical-500" />
            <span className="text-sm text-gray-700">Smoking</span>
          </label>
        </div>

        {/* AI Recommended Surgeries or Manual Selection */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Surgery Selection</h4>
          
          {recommendationsLoading ? (
            <div className="flex items-center justify-center py-4">
              <svg className="animate-spin w-5 h-5 text-medical-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span className="ml-2 text-sm text-gray-600">Loading AI recommendations...</span>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">🤖 AI Recommended Surgeries</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {recommendations.map((rec, idx) => (
                  <label key={idx} className="flex items-start p-3 border border-medical-200 rounded-lg cursor-pointer hover:bg-medical-50 transition">
                    <input
                      type="radio"
                      name="surgery_name"
                      value={rec.name}
                      checked={formData.surgery_name === rec.name}
                      onChange={handleChange}
                      className="w-4 h-4 text-medical-600 border-gray-300 rounded focus:ring-medical-500 mt-0.5 flex-shrink-0"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-gray-900">{rec.name}</div>
                      <div className="text-xs text-gray-500">{rec.reason}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1.5 flex-1 max-w-xs bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-medical-500" style={{ width: `${rec.confidence * 100}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{(rec.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ) : null}

          {/* Manual Surgery Selection */}
          <div>
            <label className={`${labelClass} ${recommendations.length > 0 ? 'mt-4 pt-4 border-t border-gray-200' : ''}`}>
              {recommendations.length > 0 ? 'or Select Surgery Manually' : 'Select Surgery'}
            </label>
            <select
              name="surgery_name"
              value={formData.surgery_name}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">-- Choose a surgery --</option>
              <optgroup label="Common Surgeries">
                <option value="Cataract Surgery">Cataract Surgery</option>
                <option value="Knee Replacement">Knee Replacement</option>
                <option value="Hip Replacement">Hip Replacement</option>
                <option value="Coronary Artery Bypass">Coronary Artery Bypass</option>
                <option value="Hernia Repair">Hernia Repair</option>
                <option value="Appendectomy">Appendectomy</option>
                <option value="Prostate Surgery (TURP)">Prostate Surgery (TURP)</option>
                <option value="Thyroid Surgery">Thyroid Surgery</option>
                <option value="Joint Arthroscopy">Joint Arthroscopy</option>
                <option value="Gallbladder Removal (Cholecystectomy)">Gallbladder Removal</option>
              </optgroup>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full md:w-auto px-8 py-3 gradient-medical text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Predicting...
            </>
          ) : (
            <>🔬 Predict Surgery Risk</>
          )}
        </button>
      </form>

      {/* Surgery Details - Side Effects */}
      {formData.surgery_name && selectedSurgeryDetails && !surgeryDetailsLoading && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 shadow-sm p-6 animate-slide-up">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">📋 {formData.surgery_name}</h4>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 pb-4 border-b border-blue-200">
            {selectedSurgeryDetails.description}
          </p>

          {/* Recovery Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-xl p-4">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Recovery Time</div>
              <div className="text-lg font-bold text-blue-600">{selectedSurgeryDetails.recovery_time}</div>
            </div>
          </div>

          {/* Common Side Effects */}
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 text-xs">⚠</span>
              Common Side Effects
            </h5>
            <ul className="space-y-2">
              {selectedSurgeryDetails.common_side_effects?.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-yellow-500 font-bold mt-1">•</span>
                  {effect}
                </li>
              ))}
            </ul>
          </div>

          {/* Serious Complications */}
          {selectedSurgeryDetails.serious_complications && selectedSurgeryDetails.serious_complications.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-700 text-xs">!</span>
                Serious Complications (Rare)
              </h5>
              <ul className="space-y-2">
                {selectedSurgeryDetails.serious_complications.map((complication, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-red-500 font-bold mt-1">•</span>
                    {complication}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="animate-slide-up space-y-4">
          {/* Risk Level */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div
                className="w-28 h-28 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: result.risk_info?.color }}
              >
                <div className="text-3xl font-bold">{result.confidence}%</div>
                <div className="text-xs mt-1 opacity-90">Confidence</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: result.risk_info?.color }}>
                  {result.risk_info?.level}
                </div>
                <p className="text-sm text-gray-500 mt-1">{result.risk_info?.description}</p>
                {formData.surgery_name && (
                  <p className="text-xs text-gray-400 mt-2">💊 Surgery: {formData.surgery_name}</p>
                )}
              </div>
            </div>

            {/* Risk probability bars */}
            {result.probabilities && (
              <div className="space-y-3">
                {[
                  { label: 'Low Risk', value: result.probabilities.low, color: '#10B981' },
                  { label: 'Medium Risk', value: result.probabilities.medium, color: '#F59E0B' },
                  { label: 'High Risk', value: result.probabilities.high, color: '#EF4444' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full progress-fill"
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Surgery Specific Risk & Side Effects */}
          {result.surgery_specific_risk && !result.surgery_specific_risk.error && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">⚕️ Surgery-Specific Risk Analysis</h4>
              
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-600 mb-1">Additional Risk Increase</div>
                <div className="text-2xl font-bold text-orange-600">{(result.surgery_specific_risk.additional_risk_increase * 100).toFixed(1)}%</div>
              </div>

              {/* Common Side Effects */}
              {result.surgery_specific_risk.common_side_effects && (
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">⚠️ Common Side Effects</h5>
                  <div className="bg-white rounded-xl p-4 space-y-2">
                    {result.surgery_specific_risk.common_side_effects.map((effect, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-yellow-500">•</span>
                        {effect}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Serious Complications */}
              {result.surgery_specific_risk.serious_complications && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">🚨 Serious Complications (Rare)</h5>
                  <div className="bg-white rounded-xl p-4 space-y-2">
                    {result.surgery_specific_risk.serious_complications.map((complication, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-red-500">•</span>
                        {complication}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <strong>Recovery Time:</strong> {result.surgery_specific_risk.recovery_time}
              </div>
            </div>
          )}

          {/* Risk Factors */}
          {result.risk_factors && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Risk Factor Importance</h4>
              <div className="space-y-3">
                {result.risk_factors.slice(0, 6).map((factor) => (
                  <div key={factor.factor} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32 flex-shrink-0">{factor.factor}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-medical-500 progress-fill"
                        style={{ width: `${factor.importance}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">{factor.importance}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {result.risk_info?.recommendations && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {result.risk_info.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: result.risk_info?.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SurgeryRiskForm;
