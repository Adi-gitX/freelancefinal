import { Material } from "../types";

export const materials: Material[] = [
  {
    id: "brass",
    name: "Premium Brass",
    type: "brass",
    description: "Elegant brass with deep engraving and protective coating",
    image_url: "src/pages/number1brazz.png",
    price_base: 89.99,
    lead_time_days: 5,
    engraving_depth: "0.5mm",
    features: [
      "Lifetime durability",
      "Weather resistant",
      "Premium finish",
      "Hand-polished",
    ],
  },
  {
    id: "marble_black",
    name: "Black Marble",
    type: "marble_black",
    description: "Sophisticated black marble with precision laser engraving",
    image_url: "src/pages/number2blackmarble.png",
    price_base: 129.99,
    lead_time_days: 7,
    engraving_depth: "1.0mm",
    features: [
      "Natural stone",
      "Unique grain patterns",
      "Premium feel",
      "Indoor/outdoor use",
    ],
  },
  {
    id: "marble_white",
    name: "White Marble",
    type: "marble_white",
    description: "Classic white marble with elegant black engraving",
    image_url: "src/pages/number3whitemarble.png",
    price_base: 129.99,
    lead_time_days: 7,
    engraving_depth: "1.0mm",
    features: [
      "Timeless elegance",
      "High contrast",
      "Premium stone",
      "Handcrafted",
    ],
  },
  {
    id: "steel",
    name: "Brushed Steel",
    type: "steel",
    description: "src/pages/number4.png",
    image_url: "src/pages/number4.png",
    price_base: 69.99,
    lead_time_days: 3,
    engraving_depth: "0.3mm",
    features: [
      "Modern aesthetic",
      "Corrosion resistant",
      "Easy maintenance",
      "Industrial strength",
    ],
  },
  {
    id: "slate",
    name: "Natural Slate",
    type: "slate",
    description: "Rustic natural slate with deep character engraving",
    image_url: "src/pages/number5.png",
    price_base: 79.99,
    lead_time_days: 4,
    engraving_depth: "0.8mm",
    features: [
      "Natural texture",
      "Unique character",
      "Weather proof",
      "Traditional feel",
    ],
  },
  {
    id: "plastic_gold",
    name: "Gold Finish Composite",
    type: "plastic_gold",
    description: "Durable composite with luxury gold finish",
    image_url: "src/pages/number6.png",
    price_base: 39.99,
    lead_time_days: 2,
    engraving_depth: "0.2mm",
    features: [
      "Budget friendly",
      "Lightweight",
      "Fade resistant",
      "Easy installation",
    ],
  },
];

export const sizes = [
  {
    id: "qr_only_5x5",
    name: "QR Only",
    dimensions: "5cm × 5cm",
    description: "Pure QR code design",
    price_modifier: 0,
  },
  {
    id: "qr_name_6x6",
    name: "QR + Name",
    dimensions: "6cm × 6cm",
    description: "QR code with name",
    price_modifier: 10,
  },
  {
    id: "qr_name_words_6x7",
    name: "QR + Name + Words",
    dimensions: "6cm × 7cm",
    description: "QR code, name, and memorial words",
    price_modifier: 20,
  },
];

export const fonts = [
  { id: "playfair", name: "Playfair Display", style: "serif" },
  { id: "inter", name: "Inter", style: "sans-serif" },
  { id: "crimson", name: "Crimson Text", style: "serif" },
  { id: "lato", name: "Lato", style: "sans-serif" },
];

export const getMaterialById = (id: string): Material | undefined => {
  return materials.find((material) => material.type === id);
};

export const calculatePrice = (
  materialType: string,
  sizeId: string,
  quantity: number = 1
): number => {
  const material = getMaterialById(materialType);
  const size = sizes.find((s) => s.id === sizeId);

  if (!material || !size) return 0;

  const basePrice = material.price_base;
  const sizeModifier = size.price_modifier;

  return (basePrice + sizeModifier) * quantity;
};
