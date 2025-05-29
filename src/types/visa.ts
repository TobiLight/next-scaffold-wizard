
export interface VisaApplicationData {
  // Step 1: Travel Information
  travelInfo: {
    countryOfNationality: string;
    reasonForTravel: string;
    employmentVisaType?: string;
    studyVisaType?: string;
    stayType: 'short' | 'long';
    journeyType: 'single' | 'multiple';
    purposeOfTravel: string;
    passportType: string;
    passportNumber: string;
    proposedEntryDate: string;
    proposedExitDate: string;
  };

  // Step 2: Personal Information
  personalInfo: {
    surname: string;
    firstName: string;
    otherNames: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    countryOfBirth: string;
    currentAddress: {
      addressLine1: string;
      addressLine2?: string;
      addressLine3?: string;
      addressLine4?: string;
      phone: string;
      email: string;
    };
  };

  // Step 3: General Information
  generalInfo: {
    lengthOfResidenceYears: number;
    lengthOfResidenceMonths: number;
    appliedBefore: boolean;
    issuedBefore: boolean;
    issuedDetails?: string;
    refusedBefore: boolean;
    refusedDetails?: string;
    beenInIrelandBefore: boolean;
    irelandVisitDetails?: {
      purpose: string;
      dojReference?: string;
      gnibReference?: string;
      ppsNumber?: string;
    };
    familyInIreland: boolean;
    familyMembers?: Array<{
      surname: string;
      forenames: string;
      dateOfBirth: string;
      relationship: string;
      dojReference?: string;
    }>;
    refusedEntry: boolean;
    deportationOrder: boolean;
    refusedVisaOtherCountry: boolean;
    refusedEntryOtherCountry: boolean;
    detailsIfYes?: string;
    criminalConvictions: boolean;
    convictionDetails?: {
      convictionFor: string;
      whenAndWhere: string;
      sentence: string;
    };
  };

  // Step 4: Passport Details
  passportDetails: {
    passportNumber: string;
    passportType: string;
    issuingAuthority: string;
    issueDate: string;
    expiryDate: string;
    firstPassport: boolean;
    previousPassports?: Array<{
      passportNumber: string;
      issueDate: string;
      expiryDate: string;
    }>;
  };

  // Step 5: Employment/College Details
  employmentCollege: {
    employed: boolean;
    employerDetails?: {
      name: string;
      durationYears: number;
      durationMonths: number;
      position: string;
      address: string;
      email: string;
      phone: string;
    };
    student: boolean;
    institutionDetails?: {
      name: string;
      address: string;
      email: string;
      phone: string;
    };
  };

  // Step 6: Travel Companions
  travelCompanions: {
    travellingWithOthers: boolean;
    companions?: Array<{
      name: string;
      relationship: string;
    }>;
  };

  // Step 7: Contact/Host in Ireland
  irelandContact: {
    address: {
      addressLine1: string;
      addressLine2?: string;
      addressLine3?: string;
      addressLine4?: string;
      phone: string;
    };
    knownPersonally: boolean;
    hostDetails?: {
      name: string;
      nationality: string;
      occupation: string;
      relationship: string;
      dojReference?: string;
      dateOfBirth: string;
      email: string;
    };
  };

  // Step 8: Family Details
  familyDetails: {
    personalStatus: string;
    spouseDetails?: {
      name: string;
      dateOfBirth: string;
      passportNumber: string;
      gender: string;
      residenceCountry: string;
    };
    childrenCount: number;
    children?: Array<{
      name: string;
      dateOfBirth: string;
      gender: string;
      nationality: string;
      passportNumber: string;
    }>;
  };

  // Step 9: Ireland Employment
  irelandEmployment: {
    employmentPermitNumber: string;
    companyName: string;
    companyAddress: string;
    contactPerson: {
      name: string;
      phone: string;
      email: string;
    };
  };

  // Step 10: Form Assistance
  formAssistance: {
    assistedByAgent: boolean;
    agentDetails?: {
      agentName: string;
      agencyName: string;
      address: string;
      phone: string;
    };
  };

  // Declaration
  declaration: {
    confirmed: boolean;
  };
}

export interface VisaFormStep {
  stepNumber: number;
  title: string;
  isComplete: boolean;
  isValid: boolean;
}
