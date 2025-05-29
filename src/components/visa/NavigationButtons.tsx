
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  onSaveDraft?: () => void;
  canGoBack?: boolean;
  canGoNext?: boolean;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}

export function NavigationButtons({
  onBack,
  onNext,
  onSaveDraft,
  canGoBack = true,
  canGoNext = true,
  isLastStep = false,
  isSubmitting = false,
}: NavigationButtonsProps) {
  const { toast } = useToast();

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft();
      toast({
        title: "Draft Saved",
        description: "Your progress has been saved. You can resume later.",
      });
    }
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <div className="flex gap-2">
        {canGoBack && onBack && (
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        {onSaveDraft && (
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        )}
      </div>
      
      {onNext && (
        <Button 
          onClick={onNext} 
          disabled={!canGoNext || isSubmitting}
          className="ml-auto"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : isLastStep ? (
            "Submit Application"
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
