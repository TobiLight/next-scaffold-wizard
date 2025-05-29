
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Step5() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: formData.employmentCollege,
  });

  const handleNext = (data: any) => {
    updateFormData({ employmentCollege: data });
    setCurrentStep(6);
    navigate('/visa/step6');
  };

  const handleBack = () => {
    setCurrentStep(4);
    navigate('/visa/step4');
  };

  const watchEmployed = form.watch('employed');
  const watchStudent = form.watch('student');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Employment/College Details</h2>
        <p className="text-gray-600">Please provide your current employment or education status.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="employed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you currently employed?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="employed-yes" />
                      <label htmlFor="employed-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="employed-no" />
                      <label htmlFor="employed-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchEmployed && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Employer Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="employerDetails.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employer Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employerDetails.position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position/Job Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employerDetails.durationYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Years)</FormLabel>
                      <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select years" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 51 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employerDetails.durationMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Months)</FormLabel>
                      <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select months" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employerDetails.address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Employer Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employerDetails.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employer Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employerDetails.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employer Phone</FormLabel>
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

          <FormField
            control={form.control}
            name="student"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you currently a student?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="student-yes" />
                      <label htmlFor="student-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="student-no" />
                      <label htmlFor="student-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchStudent && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Institution Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="institutionDetails.name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Institution Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institutionDetails.address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Institution Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institutionDetails.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institutionDetails.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution Phone</FormLabel>
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
