import React from 'react';
import PainDetector from '../components/PainDetector';

const FacialPainDetection = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-medical text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">😊</span>
            <h1 className="text-3xl font-bold">Facial Pain Detection</h1>
          </div>
          <p className="text-medical-100 text-lg max-w-2xl">
            Real-time facial expression analysis using computer vision and AI to accurately detect 
            and quantify pain levels on a 0-10 scale.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            <PainDetector />
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* How it works */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Face Detection', desc: 'AI locates and maps your facial features' },
                  { step: '2', title: 'Expression Analysis', desc: 'Eye squinting, mouth tension, and brow furrowing are analyzed' },
                  { step: '3', title: 'Pain Classification', desc: 'AI classifies pain level on a 0-10 scale' },
                  { step: '4', title: 'Results', desc: 'Instant pain score with detailed breakdown' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 gradient-medical rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain Scale Reference */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pain Scale Reference</h3>
              <div className="space-y-2">
                {[
                  { range: '0', label: 'No Pain', color: '#10B981' },
                  { range: '1-3', label: 'Mild Pain', color: '#84CC16' },
                  { range: '4-6', label: 'Moderate Pain', color: '#F59E0B' },
                  { range: '7-8', label: 'Severe Pain', color: '#EF4444' },
                  { range: '9-10', label: 'Worst Pain', color: '#7F1D1D' },
                ].map((level) => (
                  <div key={level.range} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: level.color }}></div>
                    <span className="text-sm text-gray-600 w-10">{level.range}</span>
                    <span className="text-sm font-medium text-gray-900">{level.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-medical-50 to-teal-50 rounded-2xl border border-medical-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for Best Results</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-medical-500">•</span>
                  Ensure good lighting on your face
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-medical-500">•</span>
                  Face the camera directly, avoid tilting
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-medical-500">•</span>
                  Remove glasses or sunglasses if possible
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-medical-500">•</span>
                  Keep a distance of 1-2 feet from camera
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialPainDetection;
