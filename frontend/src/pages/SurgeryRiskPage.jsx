import React from 'react';
import SurgeryRiskForm from '../components/SurgeryRiskForm';

const SurgeryRiskPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-medical text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔬</span>
            <h1 className="text-3xl font-bold">Surgery Risk Prediction</h1>
          </div>
          <p className="text-medical-100 text-lg max-w-2xl">
            Machine learning-powered surgical risk assessment. Enter patient parameters to predict
            risk levels and receive personalized medical recommendations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            <SurgeryRiskForm />
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Parameters Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Input Parameters</h3>
              <div className="space-y-3">
                {[
                  { name: 'Age', desc: 'Patient age in years', range: '18-100' },
                  { name: 'Blood Pressure', desc: 'Systolic & diastolic pressure', range: 'mmHg' },
                  { name: 'Heart Rate', desc: 'Resting heart rate', range: 'BPM' },
                  { name: 'Cholesterol', desc: 'Total cholesterol level', range: 'mg/dL' },
                  { name: 'BMI', desc: 'Body mass index', range: 'kg/m²' },
                  { name: 'Diabetes', desc: 'Diabetes diagnosis status', range: 'Yes/No' },
                  { name: 'Smoking', desc: 'Current smoking status', range: 'Yes/No' },
                ].map((param) => (
                  <div key={param.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{param.name}</div>
                      <div className="text-xs text-gray-500">{param.desc}</div>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">{param.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Levels */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Classification</h3>
              <div className="space-y-3">
                {[
                  { level: 'Low Risk', range: '0-30%', color: '#10B981', desc: 'Standard surgical protocol' },
                  { level: 'Medium Risk', range: '30-65%', color: '#F59E0B', desc: 'Enhanced precautions needed' },
                  { level: 'High Risk', range: '65-100%', color: '#EF4444', desc: 'Multi-specialist evaluation' },
                ].map((risk) => (
                  <div key={risk.level} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: risk.color }}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900">{risk.level}</span>
                        <span className="text-xs text-gray-500">{risk.range}</span>
                      </div>
                      <div className="text-xs text-gray-500">{risk.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-br from-medical-50 to-teal-50 rounded-2xl border border-medical-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Disclaimer</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This risk assessment is for screening purposes only. Final surgical decisions should always involve 
                a thorough evaluation by the surgical team and relevant specialists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgeryRiskPage;
