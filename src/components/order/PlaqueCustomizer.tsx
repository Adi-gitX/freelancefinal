import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Ruler } from 'lucide-react';
import { sizes, fonts } from '../../lib/materials';
import { OrderFormData } from '../../types';
import { PlaquePreview } from '../plaque/PlaquePreview';

interface PlaqueCustomizerProps {
  orderData: Partial<OrderFormData>;
  onUpdate: (updates: Partial<OrderFormData>) => void;
}

export const PlaqueCustomizer: React.FC<PlaqueCustomizerProps> = ({
  orderData,
  onUpdate
}) => {
  const colorOptions = [
    { id: 'gold', name: 'Gold', color: 'bg-yellow-400', textColor: 'text-yellow-400' },
    { id: 'silver', name: 'Silver', color: 'bg-gray-300', textColor: 'text-gray-300' },
    { id: 'black', name: 'Black', color: 'bg-gray-900', textColor: 'text-gray-900' },
    { id: 'white', name: 'White', color: 'bg-white', textColor: 'text-white' }
  ];

  const shapes = [
    { id: 'square', name: 'Square' },
    { id: 'rectangle', name: 'Rectangle' },
    { id: 'rounded', name: 'Rounded' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Customization options */}
      <div className="space-y-6">
        {/* Size selection */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">Plaque Size</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {sizes.map((size) => (
              <motion.button
                key={size.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onUpdate({ size: size.id as any })}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all duration-200
                  ${orderData.size === size.id
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-gray-700 hover:border-gray-600'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{size.name}</span>
                  <span className="text-sm text-gray-400">{size.dimensions}</span>
                </div>
                <p className="text-sm text-gray-400">{size.description}</p>
                {size.price_modifier > 0 && (
                  <span className="text-xs text-amber-400">+${size.price_modifier}</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Shape selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shape</h3>
          <div className="flex gap-3">
            {shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => onUpdate({ shape: shape.id as any })}
                className={`
                  px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200
                  ${orderData.shape === shape.id
                    ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                    : 'border-gray-700 text-gray-300 hover:border-gray-600'
                  }
                `}
              >
                {shape.name}
              </button>
            ))}
          </div>
        </div>

        {/* QR Color */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">QR Code Color</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.id}
                onClick={() => onUpdate({ qr_color: color.id as any })}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200
                  ${orderData.qr_color === color.id
                    ? 'border-amber-400 bg-amber-400/10'
                    : 'border-gray-700 hover:border-gray-600'
                  }
                `}
              >
                <div className={`w-6 h-6 rounded-full border-2 border-gray-600 ${color.color}`} />
                <span className="text-white font-medium">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Color */}
        {orderData.size !== 'qr_only_5x5' && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Text Color</h3>
            <div className="grid grid-cols-2 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => onUpdate({ text_color: color.id as any })}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200
                    ${orderData.text_color === color.id
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-gray-700 hover:border-gray-600'
                    }
                  `}
                >
                  <div className={`w-6 h-6 rounded-full border-2 border-gray-600 ${color.color}`} />
                  <span className="text-white font-medium">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Font selection */}
        {orderData.size !== 'qr_only_5x5' && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Font Style</h3>
            </div>
            <div className="space-y-2">
              {fonts.map((font) => (
                <button
                  key={font.id}
                  onClick={() => onUpdate({ font_choice: font.id })}
                  className={`
                    w-full p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${orderData.font_choice === font.id
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-gray-700 hover:border-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-white font-medium ${
                        font.style === 'serif' ? 'font-serif' : 'font-sans'
                      }`}
                      style={{ fontFamily: font.name }}
                    >
                      {font.name}
                    </span>
                    <span className="text-xs text-gray-400 capitalize">{font.style}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Live preview */}
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-900/50 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-white mb-6">Live Preview</h3>
        <PlaquePreview
          plaque={{
            ...orderData,
            text_lines: ['Sample Text', 'Memorial Words']
          }}
          qrSvg="<svg viewBox='0 0 25 25'><rect width='25' height='25' fill='white'/><rect x='5' y='5' width='15' height='15' fill='black'/></svg>"
          showActions={false}
        />
        <p className="text-sm text-gray-400 text-center mt-4 max-w-xs">
          This is a preview with sample text. Your actual memorial content will be added in the next step.
        </p>
      </div>
    </div>
  );
};