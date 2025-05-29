
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useVisaApplication } from '@/contexts/VisaApplicationContext';
import { declarationSchema } from '@/lib/validation/visaSchemas';
import { NavigationButtons } from '@/components/visa/NavigationButtons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

export default function Step11() {
  const { formData, updateFormData, setCurrentStep } = useVisaApplication();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(declarationSchema),
    defaultValues: formData.declaration,
  });

  const handleNext = (data: any) => {
    updateFormData({ declaration: data });
    setCurrentStep(12);
    navigate('/visa/review');
  };

  const handleBack = () => {
    setCurrentStep(10);
    navigate('/visa/step10');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Declaration</h2>
        <p className="text-gray-600">Please read the following declaration carefully and confirm your agreement.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4 text-sm">
        <h3 className="font-semibold text-lg">DECLARATION</h3>
        
        <div className="space-y-3">
          <p>
            I declare that the information given by me in this application is true and complete. I understand that any false information may lead to my application being refused and may count against any future application I may make.
          </p>
          
          <p>
            I understand that I must have a valid reason for traveling to Ireland and that I must satisfy the visa officer that I will observe the conditions of my visa, will not become a burden on the State and intend to leave Ireland on the expiration of my permission to remain.
          </p>
          
          <p>
            I understand that the granting of a visa does not guarantee entry to Ireland. The final decision on entry rests with the Immigration Officer at the port of entry.
          </p>
          
          <p>
            I understand that if I am granted a visa, I may be required to present myself to the immigration authorities and/or the Garda National Immigration Bureau on arrival in Ireland.
          </p>
          
          <p>
            I understand that I may be refused entry to Ireland if I cannot satisfy the Immigration Officer that I meet the conditions for entry.
          </p>
          
          <p>
            I consent to the processing of my personal data for the purposes of this visa application and understand that this information may be shared with other Irish Government departments and agencies for immigration control purposes.
          </p>
          
          <p>
            I understand that if I am found to be in breach of the immigration laws, I may be liable to prosecution and/or removal from the State.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="confirmed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium">
                    I confirm that I have read and understood the above declaration, and I agree to all the terms and conditions stated above.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

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
