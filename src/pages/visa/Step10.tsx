
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Step10() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: formData.formAssistance,
  });

  const handleNext = (data: any) => {
    updateFormData({ formAssistance: data });
    setCurrentStep(11);
    navigate('/visa/step11');
  };

  const handleBack = () => {
    setCurrentStep(9);
    navigate('/visa/step9');
  };

  const watchAssistedByAgent = form.watch('assistedByAgent');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Assistance</h2>
        <p className="text-gray-600">Please provide information about any assistance you received in completing this form.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="assistedByAgent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Were you assisted by an agent or agency in completing this form?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="assisted-yes" />
                      <label htmlFor="assisted-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="assisted-no" />
                      <label htmlFor="assisted-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchAssistedByAgent && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Agent/Agency Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="agentDetails.agentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter agent's full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agentDetails.agencyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter agency name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agentDetails.address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Agency Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter complete agency address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agentDetails.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter phone number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

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
