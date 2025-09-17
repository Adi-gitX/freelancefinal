import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Heart, Image, Lock, Globe, Eye } from 'lucide-react';
import { OrderFormData } from '../../types';
import { PlaquePreview } from '../plaque/PlaquePreview';

interface MemorialPageBuilderProps {
  orderData: Partial<OrderFormData>;
  qrCode: { svg: string; png: string } | null;
  onUpdate: (updates: Partial<OrderFormData>) => void;
  isGeneratingQR: boolean;
}

export const MemorialPageBuilder: React.FC<MemorialPageBuilderProps> = ({
  orderData,
  qrCode,
  onUpdate,
  isGeneratingQR
}) => {
  const handleInputChange = (field: keyof OrderFormData, value: any) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Memorial Page Details</h2>
        <p className="text-gray-400">Create the digital memorial that your QR code will link to</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form fields */}
        <div className="space-y-6">
          {/* Name fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4" />
                Full Name *
              </label>
              <input
                type="text"
                value={orderData.full_name || ''}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Heart className="w-4 h-4" />
                Nickname
              </label>
              <input
                type="text"
                value={orderData.nick_name || ''}
                onChange={(e) => handleInputChange('nick_name', e.target.value)}
                placeholder="Johnny"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Date fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4" />
                Birth Month/Year
              </label>
              <input
                type="text"
                value={orderData.birth_month_year || ''}
                onChange={(e) => handleInputChange('birth_month_year', e.target.value)}
                placeholder="January 1950"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4" />
                Passing Month/Year
              </label>
              <input
                type="text"
                value={orderData.death_month_year || ''}
                onChange={(e) => handleInputChange('death_month_year', e.target.value)}
                placeholder="December 2024"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Memorial words */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Heart className="w-4 h-4" />
              Memorial Words *
            </label>
            <input
              type="text"
              value={orderData.few_words || ''}
              onChange={(e) => handleInputChange('few_words', e.target.value)}
              placeholder="Forever in our hearts"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-colors"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              This will appear on both the plaque and memorial page
            </p>
          </div>

          {/* Photo upload */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Image className="w-4 h-4" />
              Memorial Photo
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Drag and drop a photo here, or click to select</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Choose Photo
              </button>
            </div>
          </div>

          {/* Privacy settings */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Lock className="w-4 h-4" />
              Memorial Page Privacy
            </label>
            <div className="space-y-2">
              {[
                { value: 'public', label: 'Public', icon: Globe, description: 'Anyone with the link can view' },
                { value: 'private', label: 'Private', icon: Lock, description: 'Only family members can view' },
                { value: 'password_protected', label: 'Password Protected', icon: Eye, description: 'Requires password to view' }
              ].map((option) => (
                <label key={option.value} className="flex items-start gap-3 p-3 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="privacy"
                    value={option.value}
                    checked={orderData.privacy === option.value}
                    onChange={(e) => handleInputChange('privacy', e.target.value as any)}
                    className="mt-1 text-amber-400 focus:ring-amber-400"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <option.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-medium">{option.label}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Post-purchase note */}
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-lg p-4">
            <h4 className="text-amber-400 font-medium mb-2">Complete Your Memorial Later</h4>
            <p className="text-sm text-gray-300">
              After your order is placed, you'll receive a link to finish building your memorial page 
              with additional photos, stories, and personal details.
            </p>
          </div>
        </div>

        {/* Preview section */}
        <div className="space-y-6">
          {/* Plaque preview with QR */}
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Your Plaque Preview</h3>
            
            {isGeneratingQR ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4">Generating QR code...</p>
              </div>
            ) : (
              <PlaquePreview
                plaque={{
                  ...orderData,
                  text_lines: [
                    orderData.full_name || 'Full Name',
                    orderData.few_words || 'Memorial Words'
                  ].filter(Boolean)
                }}
                qrSvg={qrCode?.svg}
                showActions={false}
              />
            )}
          </div>

          {/* Memorial page preview */}
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Memorial Page Preview</h3>
            
            <div className="bg-white rounded-lg p-6 text-gray-900 max-h-80 overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-1">
                  {orderData.full_name || 'Memorial Name'}
                </h2>
                {orderData.nick_name && (
                  <p className="text-gray-600 italic">"{orderData.nick_name}"</p>
                )}
                <div className="flex items-center justify-center gap-2 text-gray-600 mt-2">
                  <span>{orderData.birth_month_year || 'Birth'}</span>
                  <span>-</span>
                  <span>{orderData.death_month_year || 'Passing'}</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg italic text-gray-700 mb-4">
                  "{orderData.few_words || 'Memorial words will appear here'}"
                </p>
                
                <div className="space-y-4 text-left">
                  <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-gray-600 text-sm">
                      Memorial details, stories, and remembrances will be added after your order is complete.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Photo Gallery</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                          <Image className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 text-center mt-4">
              This QR code will link to your complete memorial page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};