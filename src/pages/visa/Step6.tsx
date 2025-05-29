
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
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function Step6() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: formData.travelCompanions,
  });

  const handleNext = (data: any) => {
    updateFormData({ travelCompanions: data });
    setCurrentStep(7);
    navigate('/visa/step7');
  };

  const handleBack = () => {
    setCurrentStep(5);
    navigate('/visa/step5');
  };

  const watchTravellingWithOthers = form.watch('travellingWithOthers');

  const addCompanion = () => {
    const currentCompanions = form.getValues('companions') || [];
    form.setValue('companions', [
      ...currentCompanions,
      { name: '', relationship: '' }
    ]);
  };

  const removeCompanion = (index: number) => {
    const currentCompanions = form.getValues('companions') || [];
    form.setValue('companions', currentCompanions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Travelling Companion Details</h2>
        <p className="text-gray-600">Please provide information about anyone travelling with you.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="travellingWithOthers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you travelling with others?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="travelling-yes" />
                      <label htmlFor="travelling-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="travelling-no" />
                      <label htmlFor="travelling-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchTravellingWithOthers && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Travel Companions</h4>
                <Button type="button" onClick={addCompanion} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Companion
                </Button>
              </div>
              {form.watch('companions')?.map((_, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Companion {index + 1}</h5>
                    <Button
                      type="button"
                      onClick={() => removeCompanion(index)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`companions.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`companions.${index}.relationship`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship to You</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Spouse, Friend, Colleague" />
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
            canGoNext={true}
          />
        </form>
      </Form>
    </div>
  );
}
