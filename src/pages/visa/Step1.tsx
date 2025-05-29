
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { travelInfoSchema } from '@/lib/validation/visaSchemas';
import { useVisaApplication } from '@/contexts/VisaApplicationContext';
import { NavigationButtons } from '@/components/visa/NavigationButtons';
import { CountrySelect } from '@/components/visa/CountrySelect';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const employmentVisaTypes = [
  'General Employment Permit',
  'Critical Skills Employment Permit',
  'Hosting Agreement/Scientific Researcher',
  'Intra-Company Transfer',
  'Vander Elst',
  'Atypical Working Scheme',
  'Other Employment Permit'
];

const studyVisaTypes = [
  'English Language (ILEP)',
  'Foundation/Preparatory Courses (ILEP)',
  'Higher Education/Professional (ILEP)',
  'Fee Paying Secondary School',
  'Fee Paying Primary School',
  'Other'
];

export default function Step1() {
  const { formData, updateFormData, setCurrentStep, saveDraft } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(travelInfoSchema),
    defaultValues: formData.travelInfo,
  });

  const watchReasonForTravel = form.watch('reasonForTravel');

  const onSubmit = (data: any) => {
    updateFormData({ travelInfo: data });
    saveDraft();
    setCurrentStep(2);
    navigate('/visa/step2');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Step 1: Travel Information</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="countryOfNationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Nationality *</FormLabel>
                <FormControl>
                  <CountrySelect
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select your country of nationality"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reasonForTravel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Travel *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason for travel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Employment">Employment</SelectItem>
                    <SelectItem value="Study">Study</SelectItem>
                    <SelectItem value="Tourism">Tourism</SelectItem>
                    <SelectItem value="Visiting Family/Friends">Visiting Family/Friends</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Transit">Transit</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchReasonForTravel === 'Employment' && (
            <FormField
              control={form.control}
              name="employmentVisaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Employment Visa *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment visa type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employmentVisaTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchReasonForTravel === 'Study' && (
            <FormField
              control={form.control}
              name="studyVisaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Study Visa *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select study visa type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studyVisaTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="stayType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stay Type *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="short" id="short" />
                        <Label htmlFor="short">Short-stay</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="long" id="long" />
                        <Label htmlFor="long">Long-stay</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="journeyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journey Type *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single">Single journey</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="multiple" id="multiple" />
                        <Label htmlFor="multiple">Multiple journey</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="purposeOfTravel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose of Travel *</FormLabel>
                <FormControl>
                  <Input placeholder="Describe the purpose of your travel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="passportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select passport type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Diplomatic">Diplomatic</SelectItem>
                      <SelectItem value="Official">Official</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter passport number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="proposedEntryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Proposed Entry Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proposedExitDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Proposed Exit Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <NavigationButtons
            onNext={form.handleSubmit(onSubmit)}
            onSaveDraft={saveDraft}
            canGoBack={false}
            canGoNext={form.formState.isValid}
          />
        </form>
      </Form>
    </div>
  );
}
