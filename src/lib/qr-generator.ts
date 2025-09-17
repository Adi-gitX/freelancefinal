import QRCode from 'qrcode';

export interface QROptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  color: {
    dark: string;
    light: string;
  };
  width: number;
}

export const generateQRCode = async (
  text: string,
  options: Partial<QROptions> = {}
): Promise<{ svg: string; png: string }> => {
  const defaultOptions: QROptions = {
    errorCorrectionLevel: 'H', // High error correction for engraving
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    width: 1000,
  };

  const finalOptions = { ...defaultOptions, ...options };

  try {
    // Generate SVG
    const svg = await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: finalOptions.errorCorrectionLevel,
      color: finalOptions.color,
      width: finalOptions.width,
      margin: 4, // Quiet zone
    });

    // Generate PNG
    const png = await QRCode.toDataURL(text, {
      errorCorrectionLevel: finalOptions.errorCorrectionLevel,
      color: finalOptions.color,
      width: finalOptions.width,
      margin: 4,
    });

    return { svg, png };
  } catch (error) {
    console.error('QR Code generation failed:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const getMemorialQRUrl = (slug: string): string => {
  return `${window.location.origin}/memorial/${slug}`;
};

export const validateQRScannability = (
  moduleSize: number,
  plaqueSize: number,
  contrast: number
): { valid: boolean; warnings: string[] } => {
  const warnings: string[] = [];
  let valid = true;

  // Minimum module size for engraving (2mm recommended)
  if (moduleSize < 2) {
    warnings.push('QR modules may be too small for reliable engraving');
    valid = false;
  }

  // QR should be at least 20% of plaque size
  const qrSize = moduleSize * 25; // Assuming 25x25 modules
  if (qrSize < plaqueSize * 0.2) {
    warnings.push('QR code may be too small relative to plaque size');
  }

  // Contrast ratio for engraving visibility
  if (contrast < 4.5) {
    warnings.push('Low contrast may affect QR scannability');
    valid = false;
  }

  return { valid, warnings };
};