
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVisaApplication } from '@/contexts/VisaApplicationContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Review() {
  const { formData, setCurrentStep, clearDraft } = useVisaApplication();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEdit = (step: number) => {
    setCurrentStep(step);
    navigate(`/visa/step${step}`);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear the draft after successful submission
      clearDraft();
      
      toast({
        title: "Application Submitted Successfully",
        description: "Your visa application has been submitted and is being processed.",
      });
      
      // Navigate to a success page or back to home
      navigate('/');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h2>
        <p className="text-gray-600">Please review all the information below before submitting your application.</p>
      </div>

      <div className="space-y-6">
        {/* Travel Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Travel Information</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleEdit(1)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Country of Nationality:</strong> {formData.travelInfo.countryOfNationality}</div>
            <div><strong>Reason for Travel:</strong> {formData.travelInfo.reasonForTravel}</div>
            <div><strong>Stay Type:</strong> {formData.travelInfo.stayType}</div>
            <div><strong>Journey Type:</strong> {formData.travelInfo.journeyType}</div>
            <div><strong>Purpose:</strong> {formData.travelInfo.purposeOfTravel}</div>
            <div><strong>Passport Type:</strong> {formData.travelInfo.passportType}</div>
            <div><strong>Passport Number:</strong> {formData.travelInfo.passportNumber}</div>
            <div><strong>Proposed Entry Date:</strong> {formData.travelInfo.proposedEntryDate}</div>
            <div><strong>Proposed Exit Date:</strong> {formData.travelInfo.proposedExitDate}</div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleEdit(2)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Name:</strong> {formData.personalInfo.firstName} {formData.personalInfo.surname}</div>
            <div><strong>Other Names:</strong> {formData.personalInfo.otherNames}</div>
            <div><strong>Date of Birth:</strong> {formData.personalInfo.dateOfBirth}</div>
            <div><strong>Gender:</strong> {formData.personalInfo.gender}</div>
            <div><strong>Country of Birth:</strong> {formData.personalInfo.countryOfBirth}</div>
            <div><strong>Address:</strong> {formData.personalInfo.currentAddress.addressLine1}</div>
            <div><strong>Phone:</strong> {formData.personalInfo.currentAddress.phone}</div>
            <div><strong>Email:</strong> {formData.personalInfo.currentAddress.email}</div>
          </CardContent>
        </Card>

        {/* Passport Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Passport Details</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleEdit(4)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Passport Number:</strong> {formData.passportDetails.passportNumber}</div>
            <div><strong>Passport Type:</strong> {formData.passportDetails.passportType}</div>
            <div><strong>Issuing Authority:</strong> {formData.passportDetails.issuingAuthority}</div>
            <div><strong>Issue Date:</strong> {formData.passportDetails.issueDate}</div>
            <div><strong>Expiry Date:</strong> {formData.passportDetails.expiryDate}</div>
            <div><strong>First Passport:</strong> {formData.passportDetails.firstPassport ? 'Yes' : 'No'}</div>
          </CardContent>
        </Card>

        {/* Employment/College Details */}
        {(formData.employmentCollege.employed || formData.employmentCollege.student) && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Employment/College Details</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleEdit(5)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {formData.employmentCollege.employed && (
                <div>
                  <div><strong>Employed:</strong> Yes</div>
                  {formData.employmentCollege.employerDetails && (
                    <>
                      <div><strong>Employer:</strong> {formData.employmentCollege.employerDetails.name}</div>
                      <div><strong>Position:</strong> {formData.employmentCollege.employerDetails.position}</div>
                    </>
                  )}
                </div>
              )}
              {formData.employmentCollege.student && (
                <div>
                  <div><strong>Student:</strong> Yes</div>
                  {formData.employmentCollege.institutionDetails && (
                    <div><strong>Institution:</strong> {formData.employmentCollege.institutionDetails.name}</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Ireland Contact */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Ireland Contact/Host</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleEdit(7)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Address:</strong> {formData.irelandContact.address.addressLine1}</div>
            <div><strong>Phone:</strong> {formData.irelandContact.address.phone}</div>
            <div><strong>Known Personally:</strong> {formData.irelandContact.knownPersonally ? 'Yes' : 'No'}</div>
            {formData.irelandContact.hostDetails && (
              <div><strong>Host Name:</strong> {formData.irelandContact.hostDetails.name}</div>
            )}
          </CardContent>
        </Card>

        {/* Family Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Family Details</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleEdit(8)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            <div><strong>Personal Status:</strong> {formData.familyDetails.personalStatus}</div>
            <div><strong>Number of Children:</strong> {formData.familyDetails.childrenCount}</div>
          </CardContent>
        </Card>

        {/* Declaration */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Declaration</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleEdit(11)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div><strong>Declaration Confirmed:</strong> {formData.declaration.confirmed ? 'Yes' : 'No'}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6 border-t">
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !formData.declaration.confirmed}
          size="lg"
          className="px-8"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
