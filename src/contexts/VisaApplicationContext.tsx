
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VisaApplicationData } from '@/types/visa';

interface VisaApplicationContextType {
  formData: VisaApplicationData;
  updateFormData: (stepData: Partial<VisaApplicationData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  saveDraft: () => void;
  loadDraft: () => void;
  clearDraft: () => void;
}

const VisaApplicationContext = createContext<VisaApplicationContextType | undefined>(undefined);

const initialFormData: VisaApplicationData = {
  travelInfo: {
    countryOfNationality: '',
    reasonForTravel: '',
    stayType: 'short',
    journeyType: 'single',
    purposeOfTravel: '',
    passportType: '',
    passportNumber: '',
    proposedEntryDate: '',
    proposedExitDate: '',
  },
  personalInfo: {
    surname: '',
    firstName: '',
    otherNames: '',
    dateOfBirth: '',
    gender: 'male',
    countryOfBirth: '',
    currentAddress: {
      addressLine1: '',
      phone: '',
      email: '',
    },
  },
  generalInfo: {
    lengthOfResidenceYears: 0,
    lengthOfResidenceMonths: 0,
    appliedBefore: false,
    issuedBefore: false,
    refusedBefore: false,
    beenInIrelandBefore: false,
    familyInIreland: false,
    refusedEntry: false,
    deportationOrder: false,
    refusedVisaOtherCountry: false,
    refusedEntryOtherCountry: false,
    criminalConvictions: false,
  },
  passportDetails: {
    passportNumber: '',
    passportType: '',
    issuingAuthority: '',
    issueDate: '',
    expiryDate: '',
    firstPassport: true,
  },
  employmentCollege: {
    employed: false,
    student: false,
  },
  travelCompanions: {
    travellingWithOthers: false,
  },
  irelandContact: {
    address: {
      addressLine1: '',
      phone: '',
    },
    knownPersonally: false,
  },
  familyDetails: {
    personalStatus: '',
    childrenCount: 0,
  },
  irelandEmployment: {
    employmentPermitNumber: '',
    companyName: '',
    companyAddress: '',
    contactPerson: {
      name: '',
      phone: '',
      email: '',
    },
  },
  formAssistance: {
    assistedByAgent: false,
  },
  declaration: {
    confirmed: false,
  },
};

export function VisaApplicationProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<VisaApplicationData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (stepData: Partial<VisaApplicationData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const saveDraft = () => {
    localStorage.setItem('visaApplicationDraft', JSON.stringify({ formData, currentStep }));
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('visaApplicationDraft');
    if (draft) {
      const { formData: draftData, currentStep: draftStep } = JSON.parse(draft);
      setFormData(draftData);
      setCurrentStep(draftStep);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem('visaApplicationDraft');
  };

  useEffect(() => {
    loadDraft();
  }, []);

  const value = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    saveDraft,
    loadDraft,
    clearDraft,
  };

  return (
    <VisaApplicationContext.Provider value={value}>
      {children}
    </VisaApplicationContext.Provider>
  );
}

export function useVisaApplication() {
  const context = useContext(VisaApplicationContext);
  if (!context) {
    throw new Error('useVisaApplication must be used within a VisaApplicationProvider');
  }
  return context;
}
