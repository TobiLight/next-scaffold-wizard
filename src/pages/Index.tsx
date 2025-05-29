
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartApplication = () => {
    navigate('/visa/step1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Irish Visa Application System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete your Irish visa application online with our comprehensive, step-by-step form.
            Save your progress and resume anytime.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Welcome to the Irish Visa Application Portal</CardTitle>
              <CardDescription>
                This application will guide you through all the necessary steps to apply for an Irish visa.
                The process consists of 11 detailed steps plus a final declaration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-1">Travel Information</h3>
                  <p className="text-sm text-gray-600">Basic travel details and passport information</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-1">Personal Details</h3>
                  <p className="text-sm text-gray-600">Your personal and contact information</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-1">Background Info</h3>
                  <p className="text-sm text-gray-600">Previous applications and family details</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">4-11</span>
                  </div>
                  <h3 className="font-semibold mb-1">Additional Steps</h3>
                  <p className="text-sm text-gray-600">Employment, family, and host details</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <h3 className="font-semibold mb-1">Declaration</h3>
                  <p className="text-sm text-gray-600">Final confirmation and submission</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">👁</span>
                  </div>
                  <h3 className="font-semibold mb-1">Review</h3>
                  <p className="text-sm text-gray-600">Preview and submit your application</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Before You Start:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Have your passport and travel documents ready</li>
                  <li>• Prepare employment or study documentation if applicable</li>
                  <li>• Your progress will be automatically saved as you proceed</li>
                  <li>• You can resume your application at any time</li>
                </ul>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={handleStartApplication}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Start Visa Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
