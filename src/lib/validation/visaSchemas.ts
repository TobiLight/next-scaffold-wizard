
import { z } from 'zod';

export const travelInfoSchema = z.object({
  countryOfNationality: z.string().min(1, 'Country of nationality is required'),
  reasonForTravel: z.string().min(1, 'Reason for travel is required'),
  employmentVisaType: z.string().optional(),
  studyVisaType: z.string().optional(),
  stayType: z.enum(['short', 'long']),
  journeyType: z.enum(['single', 'multiple']),
  purposeOfTravel: z.string().min(1, 'Purpose of travel is required'),
  passportType: z.string().min(1, 'Passport type is required'),
  passportNumber: z.string().min(1, 'Passport number is required'),
  proposedEntryDate: z.string().min(1, 'Entry date is required'),
  proposedExitDate: z.string().min(1, 'Exit date is required'),
});

export const personalInfoSchema = z.object({
  surname: z.string().min(1, 'Surname is required'),
  firstName: z.string().min(1, 'First name is required'),
  otherNames: z.string(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other']),
  countryOfBirth: z.string().min(1, 'Country of birth is required'),
  currentAddress: z.object({
    addressLine1: z.string().min(1, 'Address line 1 is required'),
    addressLine2: z.string().optional(),
    addressLine3: z.string().optional(),
    addressLine4: z.string().optional(),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Valid email is required'),
  }),
});

export const generalInfoSchema = z.object({
  lengthOfResidenceYears: z.number().min(0),
  lengthOfResidenceMonths: z.number().min(0).max(11),
  appliedBefore: z.boolean(),
  issuedBefore: z.boolean(),
  issuedDetails: z.string().optional(),
  refusedBefore: z.boolean(),
  refusedDetails: z.string().optional(),
  beenInIrelandBefore: z.boolean(),
  irelandVisitDetails: z.object({
    purpose: z.string(),
    dojReference: z.string().optional(),
    gnibReference: z.string().optional(),
    ppsNumber: z.string().optional(),
  }).optional(),
  familyInIreland: z.boolean(),
  familyMembers: z.array(z.object({
    surname: z.string().min(1, 'Surname is required'),
    forenames: z.string().min(1, 'Forenames are required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    dojReference: z.string().optional(),
  })).optional(),
  refusedEntry: z.boolean(),
  deportationOrder: z.boolean(),
  refusedVisaOtherCountry: z.boolean(),
  refusedEntryOtherCountry: z.boolean(),
  detailsIfYes: z.string().optional(),
  criminalConvictions: z.boolean(),
  convictionDetails: z.object({
    convictionFor: z.string().min(1, 'Conviction details required'),
    whenAndWhere: z.string().min(1, 'When and where required'),
    sentence: z.string().min(1, 'Sentence details required'),
  }).optional(),
});

export const passportDetailsSchema = z.object({
  passportNumber: z.string().min(1, 'Passport number is required'),
  passportType: z.string().min(1, 'Passport type is required'),
  issuingAuthority: z.string().min(1, 'Issuing authority is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiryDate: z.string().min(1, 'Expiry date is required'),
  firstPassport: z.boolean(),
  previousPassports: z.array(z.object({
    passportNumber: z.string(),
    issueDate: z.string(),
    expiryDate: z.string(),
  })).optional(),
});

export const declarationSchema = z.object({
  confirmed: z.boolean().refine(val => val === true, 'You must confirm the declaration'),
});
