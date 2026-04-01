import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';

const HomePage = () => {
  const features = [
    {
      icon: '🤖',
      title: 'Unified AI Health Assistant',
      description: 'Chat-based AI assistant with real-time symptom guidance, vitals-aware insights, and support conversations.',
      link: '/patient-dashboard',
      color: 'blue',
    },
    {
      icon: '🔬',
      title: 'Surgery Risk Prediction',
      description: 'ML-powered surgical risk assessment based on comprehensive patient health parameters.',
      link: '/surgery-risk',
      color: 'orange',
    },
    {
      icon: '🧠',
      title: 'AI Decision Engine',
      description: 'Intelligent health analysis using conversation context and vital trends for safer recommendations.',
      link: '/dashboard',
      color: 'red',
    },
    {
      icon: '📊',
      title: 'Doctor Dashboard',
      description: 'Professional monitoring dashboard with real-time patient tracking and analytics.',
      link: '/dashboard',
      color: 'green',
    },
  ];

  const benefits = [
    {
      icon: '⚡',
      title: 'Early Detection',
      description: 'AI-powered analysis catches potential health issues before they become critical.',
    },
    {
      icon: '🎯',
      title: 'Reliable Guidance',
      description: 'Context-aware AI guidance built for practical day-to-day monitoring and clinical follow-up.',
    },
    {
      icon: '⏱️',
      title: 'Real-Time Analysis',
      description: 'Instant updates from conversational inputs and live vital sign monitoring.',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'HIPAA-compliant data handling with encrypted storage and secure API communications.',
    },
  ];

  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive AI Healthcare Suite
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Four integrated modules working together to provide complete patient health intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why AI Smart Hospital?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Empowering healthcare professionals with AI-driven insights for better patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center card-hover">
                <span className="text-4xl">{benefit.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-medical-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Healthcare with AI?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals using AI Smart Hospital Assistant 
            for early disease detection and better patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/ai-smart-diagnosis"
              className="px-8 py-3.5 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-semibold transition-colors shadow-lg"
            >
              Start Smart Diagnosis
            </a>
            <a
              href="/login"
              className="px-8 py-3.5 glass text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Doctor Login
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
