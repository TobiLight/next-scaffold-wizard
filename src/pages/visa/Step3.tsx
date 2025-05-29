
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useVisaApplication } from '@/contexts/VisaApplicationContext';
import { generalInfoSchema } from '@/lib/validation/visaSchemas';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function Step3() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: formData.generalInfo,
  });

  const handleNext = (data: any) => {
    updateFormData({ generalInfo: data });
    setCurrentStep(4);
    navigate('/visa/step4');
  };

  const handleBack = () => {
    setCurrentStep(2);
    navigate('/visa/step2');
  };

  const watchAppliedBefore = form.watch('appliedBefore');
  const watchIssuedBefore = form.watch('issuedBefore');
  const watchRefusedBefore = form.watch('refusedBefore');
  const watchBeenInIreland = form.watch('beenInIrelandBefore');
  const watchFamilyInIreland = form.watch('familyInIreland');
  const watchCriminalConvictions = form.watch('criminalConvictions');

  const addFamilyMember = () => {
    const currentMembers = form.getValues('familyMembers') || [];
    form.setValue('familyMembers', [
      ...currentMembers,
      { surname: '', forenames: '', dateOfBirth: '', relationship: '', dojReference: '' }
    ]);
  };

  const removeFamilyMember = (index: number) => {
    const currentMembers = form.getValues('familyMembers') || [];
    form.setValue('familyMembers', currentMembers.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">General Applicant Information</h2>
        <p className="text-gray-600">Please provide your general background information.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lengthOfResidenceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length of Residence (Years)</FormLabel>
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
              name="lengthOfResidenceMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length of Residence (Months)</FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="appliedBefore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you applied for an Irish Visa/Preclearance before?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="applied-yes" />
                      <label htmlFor="applied-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="applied-no" />
                      <label htmlFor="applied-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuedBefore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you ever been issued with an Irish Visa/Preclearance before?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="issued-yes" />
                      <label htmlFor="issued-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="issued-no" />
                      <label htmlFor="issued-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchIssuedBefore && (
            <FormField
              control={form.control}
              name="issuedDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please provide the location, transaction number and year of issue</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Provide details..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="refusedBefore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you ever been refused an Irish Visa/Preclearance?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="refused-yes" />
                      <label htmlFor="refused-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="refused-no" />
                      <label htmlFor="refused-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchRefusedBefore && (
            <FormField
              control={form.control}
              name="refusedDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>If you have been refused before, please provide location of application, year and reference number</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Provide details..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="beenInIrelandBefore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you ever been in Ireland before?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="ireland-yes" />
                      <label htmlFor="ireland-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="ireland-no" />
                      <label htmlFor="ireland-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchBeenInIreland && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Ireland Visit Details</h4>
              <FormField
                control={form.control}
                name="irelandVisitDetails.purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of trip to Ireland</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="irelandVisitDetails.dojReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department of Justice Reference number (if any)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="irelandVisitDetails.gnibReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GNIB Reference number (if any)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="irelandVisitDetails.ppsNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PPS Number (if any)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="familyInIreland"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have family members living in Ireland?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="family-yes" />
                      <label htmlFor="family-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="family-no" />
                      <label htmlFor="family-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchFamilyInIreland && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Family Members in Ireland</h4>
                <Button type="button" onClick={addFamilyMember} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Family Member
                </Button>
              </div>
              {form.watch('familyMembers')?.map((_, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Family Member {index + 1}</h5>
                    <Button
                      type="button"
                      onClick={() => removeFamilyMember(index)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`familyMembers.${index}.surname`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surname/Family Name (as in Passport)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`familyMembers.${index}.forenames`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forenames</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`familyMembers.${index}.dateOfBirth`}
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
                      name={`familyMembers.${index}.relationship`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship to you</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="spouse">Spouse</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="child">Child</SelectItem>
                              <SelectItem value="extended">Extended Family</SelectItem>
                              <SelectItem value="partner">Partner</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`familyMembers.${index}.dojReference`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department of Justice Reference number (if any)</FormLabel>
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

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="refusedEntry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you ever been refused permission to enter Ireland before?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? 'true' : 'false'}
                      onValueChange={(value) => field.onChange(value === 'true')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="refused-entry-yes" />
                        <label htmlFor="refused-entry-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="refused-entry-no" />
                        <label htmlFor="refused-entry-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deportationOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you ever been notified of a deportation order to leave Ireland?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? 'true' : 'false'}
                      onValueChange={(value) => field.onChange(value === 'true')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="deportation-yes" />
                        <label htmlFor="deportation-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="deportation-no" />
                        <label htmlFor="deportation-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="refusedVisaOtherCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you ever been refused a visa to another country?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? 'true' : 'false'}
                      onValueChange={(value) => field.onChange(value === 'true')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="visa-refused-yes" />
                        <label htmlFor="visa-refused-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="visa-refused-no" />
                        <label htmlFor="visa-refused-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="refusedEntryOtherCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you ever been refused entry to, deported from, overstayed permission in, or were otherwise required to leave any country?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? 'true' : 'false'}
                      onValueChange={(value) => field.onChange(value === 'true')}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="entry-refused-yes" />
                        <label htmlFor="entry-refused-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="entry-refused-no" />
                        <label htmlFor="entry-refused-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {(form.watch('refusedEntry') || form.watch('deportationOrder') || form.watch('refusedVisaOtherCountry') || form.watch('refusedEntryOtherCountry')) && (
            <FormField
              control={form.control}
              name="detailsIfYes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>If yes to any of the above please give details</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Provide details..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="criminalConvictions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you any criminal convictions in any country?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? 'true' : 'false'}
                    onValueChange={(value) => field.onChange(value === 'true')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="criminal-yes" />
                      <label htmlFor="criminal-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="criminal-no" />
                      <label htmlFor="criminal-no">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchCriminalConvictions && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">Criminal Conviction Details</h4>
              <FormField
                control={form.control}
                name="convictionDetails.convictionFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>If yes, what was your conviction for?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="convictionDetails.whenAndWhere"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When and where were you convicted?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="convictionDetails.sentence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What was your sentence?</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
