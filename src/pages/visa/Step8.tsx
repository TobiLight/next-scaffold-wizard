
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function Step8() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: formData.familyDetails,
  });

  const handleNext = (data: any) => {
    updateFormData({ familyDetails: data });
    setCurrentStep(9);
    navigate('/visa/step9');
  };

  const handleBack = () => {
    setCurrentStep(7);
    navigate('/visa/step7');
  };

  const watchPersonalStatus = form.watch('personalStatus');
  const watchChildrenCount = form.watch('childrenCount');

  const isMarriedOrPartnered = ['married', 'unmarried-partner', 'civil-partnership'].includes(watchPersonalStatus);

  const addChild = () => {
    const currentChildren = form.getValues('children') || [];
    form.setValue('children', [
      ...currentChildren,
      { name: '', dateOfBirth: '', gender: '', nationality: '', passportNumber: '' }
    ]);
  };

  const removeChild = (index: number) => {
    const currentChildren = form.getValues('children') || [];
    form.setValue('children', currentChildren.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Applicant Family Details</h2>
        <p className="text-gray-600">Please provide information about your family status and dependents.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="personalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal Status</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your personal status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                    <SelectItem value="unmarried-partner">Unmarried Partner</SelectItem>
                    <SelectItem value="civil-partnership">Civil Partnership</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {isMarriedOrPartnered && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Spouse/Partner Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="spouseDetails.name"
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
                  name="spouseDetails.dateOfBirth"
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
                  name="spouseDetails.passportNumber"
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
                  name="spouseDetails.gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spouseDetails.residenceCountry"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Country of Residence</FormLabel>
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
            name="childrenCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Children</FormLabel>
                <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of children" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchChildrenCount > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Children Details</h4>
                <Button type="button" onClick={addChild} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Child
                </Button>
              </div>
              {form.watch('children')?.map((_, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Child {index + 1}</h5>
                    <Button
                      type="button"
                      onClick={() => removeChild(index)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`children.${index}.name`}
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
                      name={`children.${index}.dateOfBirth`}
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
                      name={`children.${index}.gender`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`children.${index}.nationality`}
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
                      name={`children.${index}.passportNumber`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Passport Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
