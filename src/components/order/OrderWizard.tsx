import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { MaterialSelector } from './MaterialSelector';
import { PlaqueCustomizer } from './PlaqueCustomizer';
import { MemorialPageBuilder } from './MemorialPageBuilder';
import { OrderFormData } from '../../types';
import { generateQRCode, getMemorialQRUrl } from '../../lib/qr-generator';

interface OrderWizardProps {
  onComplete?: (orderData: OrderFormData) => void;
}

export const OrderWizard: React.FC<OrderWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<Partial<OrderFormData>>({
    privacy: 'public'
  });
  const [qrCode, setQrCode] = useState<{ svg: string; png: string } | null>(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  const steps = [
    { number: 1, title: 'Material & Design', completed: false },
    { number: 2, title: 'Memorial Details', completed: false },
    { number: 3, title: 'Payment & Checkout', completed: false }
  ];

  const updateOrderData = (updates: Partial<OrderFormData>) => {
    setOrderData(prev => ({ ...prev, ...updates }));
  };

  const generateQR = async () => {
    if (!orderData.full_name) return;
    
    setIsGeneratingQR(true);
    try {
      // Create a temporary slug for QR generation
      const slug = orderData.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const memorialUrl = getMemorialQRUrl(slug);
      
      const qrResult = await generateQRCode(memorialUrl, {
        errorCorrectionLevel: 'H',
        color: {
          dark: orderData.qr_color === 'white' ? '#FFFFFF' : '#000000',
          light: orderData.qr_color === 'black' ? '#000000' : '#FFFFFF'
        }
      });
      
      setQrCode(qrResult);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    } finally {
      setIsGeneratingQR(false);
    }
  };

  useEffect(() => {
    if (currentStep === 2 && orderData.full_name && !qrCode && !isGeneratingQR) {
      generateQR();
    }
  }, [currentStep, orderData.full_name]);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(current => current + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(current => current - 1);
    }
  };

  const handleStepComplete = (stepData: Partial<OrderFormData>) => {
    updateOrderData(stepData);
    
    if (currentStep === 3) {
      onComplete?.(orderData as OrderFormData);
    } else {
      nextStep();
    }
  };

  const canProceedFromStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(orderData.material && orderData.size && orderData.qr_color && orderData.text_color);
      case 2:
        return !!(orderData.full_name && orderData.few_words);
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${currentStep > step.number 
                      ? 'bg-amber-400 border-amber-400 text-black' 
                      : currentStep === step.number
                      ? 'border-amber-400 text-amber-400'
                      : 'border-gray-600 text-gray-400'
                    }
                  `}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ${
                    currentStep > step.number ? 'bg-amber-400' : 'bg-gray-600'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
            >
              {currentStep === 1 && (
                <div className="space-y-8">
                  <MaterialSelector
                    selectedMaterial={orderData.material}
                    onSelect={(material) => updateOrderData({ material })}
                  />
                  
                  {orderData.material && (
                    <PlaqueCustomizer
                      orderData={orderData}
                      onUpdate={updateOrderData}
                    />
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <MemorialPageBuilder
                  orderData={orderData}
                  qrCode={qrCode}
                  onUpdate={updateOrderData}
                  isGeneratingQR={isGeneratingQR}
                />
              )}

              {currentStep === 3 && (
                <div className="text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Payment & Checkout</h2>
                  <p className="text-gray-400">Payment integration coming soon...</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="px-8 py-4 bg-gray-900 border-t border-gray-700 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg transition-colors
                ${currentStep === 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-sm text-gray-400">
              Step {currentStep} of {steps.length}
            </div>

            <button
              onClick={() => handleStepComplete(orderData)}
              disabled={!canProceedFromStep(currentStep)}
              className={`
                flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${canProceedFromStep(currentStep)
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg hover:shadow-amber-500/25'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {currentStep === 3 ? 'Complete Order' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};