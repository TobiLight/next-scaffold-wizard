
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useVisaApplication } from '@/contexts/VisaApplicationContext';
import { passportDetailsSchema } from '@/lib/validation/visaSchemas';
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
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function Step4() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(passportDetailsSchema),
    defaultValues: formData.passportDetails,
  });

  const handleNext = (data: any) => {
    updateFormData({ passportDetails: data });
    setCurrentStep(5);
    navigate('/visa/step5');
  };

  const handleBack = () => {
    setCurrentStep(3);
    navigate('/visa/step3');
  };

  const watchFirstPassport = form.watch('firstPassport');

  const addPreviousPassport = () => {
    const currentPassports = form.getValues('previousPassports') || [];
    form.setValue('previousPassports', [
      ...currentPassports,
      { passportNumber: '', issueDate: '', expiryDate: '' }
    ]);
  };

  const removePreviousPassport = (index: number) => {
    const currentPassports = form.getValues('previousPassports') || [];
    form.setValue('previousPassports', currentPassports.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Passport Details</h2>
        <p className="text-gray-600">Please provide your current passport information.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport/Travel Document Number *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Type *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Ordinary, Diplomatic, Service" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuingAuthority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuing Authority *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Government of..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="firstPassport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is this your first passport?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="first-yes" />
                      <label htmlFor="first-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="first-no" />
                      <label htmlFor="first-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!watchFirstPassport && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Previous Passports</h4>
                <Button type="button" onClick={addPreviousPassport} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Previous Passport
                </Button>
              </div>
              {form.watch('previousPassports')?.map((_, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Previous Passport {index + 1}</h5>
                    <Button
                      type="button"
                      onClick={() => removePreviousPassport(index)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`previousPassports.${index}.passportNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passport Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`previousPassports.${index}.issueDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`previousPassports.${index}.expiryDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <NavigationButtons
            onBack={handleBack}
            onNext={form.handleSubmit(handleNext)}
            canGoBack={true}
            canGoNext={form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  );
}
