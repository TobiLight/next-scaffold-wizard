
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProgressBar } from './ProgressBar';
import { useVisaApplication } from '@/contexts/VisaApplicationContext';

export function VisaLayout() {
  const { currentStep } = useVisaApplication();
  const totalSteps = 12; // 11 steps + declaration + review

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Irish Visa Application
          </h1>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <Outlet />
        </div>
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          © 2024 Irish Visa Application System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
