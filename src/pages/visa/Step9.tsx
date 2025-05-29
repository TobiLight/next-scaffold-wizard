
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useVisaApplication } from '@/contexts/VisaApplicationContext';
import { NavigationButtons } from '@/components/visa/NavigationButtons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function Step9() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: formData.irelandEmployment,
  });

  const handleNext = (data: any) => {
    updateFormData({ irelandEmployment: data });
    setCurrentStep(10);
    navigate('/visa/step10');
  };

  const handleBack = () => {
    setCurrentStep(8);
    navigate('/visa/step8');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ireland Employment Details</h2>
        <p className="text-gray-600">Please provide information about your employment arrangements in Ireland.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="employmentPermitNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Permit Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter employment permit number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter company name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter complete company address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h4 className="font-medium">Contact Person Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactPerson.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter contact person name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson.email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Contact Person Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Enter email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <NavigationButtons
            onBack={handleBack}
            onNext={form.handleSubmit(handleNext)}
            canGoBack={true}
            canGoNext={true}
          />
        </form>
      </Form>
    </div>
  );
}
