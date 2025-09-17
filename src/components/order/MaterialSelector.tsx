import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Clock, Shield } from 'lucide-react';
import { materials, Material } from '../../lib/materials';
import { Plaque } from '../../types';

interface MaterialSelectorProps {
  selectedMaterial?: Plaque['material'];
  onSelect: (material: Plaque['material']) => void;
  className?: string;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  selectedMaterial,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Material</h2>
        <p className="text-gray-400">Select the perfect material for your memorial plaque</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            isSelected={selectedMaterial === material.type}
            onSelect={() => onSelect(material.type)}
          />
        ))}
      </div>
    </div>
  );
};

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onSelect: () => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  isSelected,
  onSelect
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200
        ${isSelected 
          ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-400/25' 
          : 'border-gray-700 hover:border-gray-600'
        }
      `}
      onClick={onSelect}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 z-10 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-black" />
        </motion.div>
      )}

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={material.image_url}
          alt={material.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 bg-gray-900/90 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white text-lg">{material.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-xs text-gray-400">Premium</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {material.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {material.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-300">
              <div className="w-1 h-1 rounded-full bg-amber-400"></div>
              {feature}
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {material.lead_time_days} days
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Shield className="w-3 h-3" />
            {material.engraving_depth}
          </div>
        </div>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Starting at</span>
            <span className="text-lg font-bold text-white">
              ${material.price_base}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};