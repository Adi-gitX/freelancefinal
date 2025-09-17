import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';
import { Plaque, Material } from '../../types';
import { materials } from '../../lib/materials';

interface PlaquePreviewProps {
  plaque: Partial<Plaque>;
  qrSvg?: string;
  className?: string;
  showActions?: boolean;
}

export const PlaquePreview: React.FC<PlaquePreviewProps> = ({
  plaque,
  qrSvg,
  className = '',
  showActions = true
}) => {
  const material = useMemo(() => {
    return materials.find(m => m.type === plaque.material);
  }, [plaque.material]);

  const getMaterialTexture = (materialType?: string) => {
    switch (materialType) {
      case 'brass':
        return 'bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700';
      case 'steel':
        return 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500';
      case 'marble_black':
        return 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900';
      case 'marble_white':
        return 'bg-gradient-to-br from-gray-100 via-white to-gray-200';
      case 'slate':
        return 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800';
      case 'plastic_gold':
        return 'bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500';
      default:
        return 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500';
    }
  };

  const getTextColor = (textColor?: string, materialType?: string) => {
    if (textColor === 'gold') return 'text-yellow-400';
    if (textColor === 'silver') return 'text-gray-300';
    if (textColor === 'black') return 'text-gray-900';
    if (textColor === 'white') return 'text-white';
    
    // Auto contrast based on material
    if (materialType === 'marble_white' || materialType === 'steel') {
      return 'text-gray-900';
    }
    return 'text-white';
  };

  const getBorderRadius = (shape?: string) => {
    switch (shape) {
      case 'rounded':
        return 'rounded-xl';
      case 'rectangle':
        return 'rounded-lg';
      default:
        return 'rounded-lg';
    }
  };

  const getSizeClasses = (size?: string) => {
    switch (size) {
      case 'qr_only_5x5':
        return 'w-32 h-32';
      case 'qr_name_6x6':
        return 'w-36 h-36';
      case 'qr_name_words_6x7':
        return 'w-36 h-40';
      default:
        return 'w-36 h-36';
    }
  };

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center space-y-4"
      >
        {/* Plaque preview */}
        <div className="relative">
          <div
            className={`
              ${getSizeClasses(plaque.size)}
              ${getMaterialTexture(plaque.material)}
              ${getBorderRadius(plaque.shape)}
              shadow-2xl shadow-black/50
              flex flex-col items-center justify-center
              p-4 space-y-2
              border-2 border-black/20
              relative overflow-hidden
            `}
          >
            {/* Material texture overlay */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <pattern id="texture" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.1" />
                    <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.1" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#texture)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-1">
              {/* QR Code */}
              {qrSvg && (
                <div className="w-16 h-16 bg-white p-1 rounded">
                  <div 
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                </div>
              )}

              {/* Text content */}
              {plaque.size !== 'qr_only_5x5' && (
                <div className={`text-center ${getTextColor(plaque.text_color, plaque.material)}`}>
                  {plaque.text_lines?.map((line, index) => (
                    <div
                      key={index}
                      className={`
                        ${index === 0 ? 'text-xs font-bold' : 'text-xs'}
                        ${plaque.font_choice === 'playfair' ? 'font-serif' : 'font-sans'}
                        leading-tight
                      `}
                      style={{
                        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Engraving depth effect */}
            <div className="absolute inset-0 rounded-lg shadow-inner opacity-30 pointer-events-none" />
          </div>

          {/* Material label */}
          {material && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-full border border-gray-700">
                {material.name}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 text-black rounded-lg hover:bg-amber-500 transition-colors text-sm">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        )}

        {/* Material info */}
        {material && (
          <div className="text-center text-sm text-gray-400 max-w-xs">
            <p className="font-medium text-white">{material.name}</p>
            <p className="text-xs">{material.description}</p>
            <p className="text-xs mt-1">
              Lead time: {material.lead_time_days} days
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};