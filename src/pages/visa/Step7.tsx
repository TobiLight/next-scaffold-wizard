
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

export default function Step7() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: formData.irelandContact,
  });

  const handleNext = (data: any) => {
    updateFormData({ irelandContact: data });
    setCurrentStep(8);
    navigate('/visa/step8');
  };

  const handleBack = () => {
    setCurrentStep(6);
    navigate('/visa/step6');
  };

  const watchKnownPersonally = form.watch('knownPersonally');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact/Host in Ireland</h2>
        <p className="text-gray-600">Please provide contact information for your host or contact in Ireland.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Ireland Contact Address</h4>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="address.addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 1 *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.addressLine3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 3</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.addressLine4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 4</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="knownPersonally"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you know this person/host personally?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="known-yes" />
                      <label htmlFor="known-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="known-no" />
                      <label htmlFor="known-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchKnownPersonally && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Host Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hostDetails.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostDetails.nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostDetails.occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostDetails.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship to You</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostDetails.dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostDetails.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostDetails.dojReference"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Department of Justice Reference (if any)</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
