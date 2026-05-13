import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const baseStrings = {
  "app_title": "Shilpa-Kala",
  "digital_portfolio_assistant": "Digital Portfolio Assistant",
  "heritage_branding": "Heritage Branding",
  "prepare_artifact": "Prepare your artifact for a professional catalog capture.",
  "your_name": "Your Name",
  "artifact_name": "Artifact Name",
  "wood_type": "Wood Type/Material",
  "price": "Price (₹)",
  "start_capture": "Start Capture",
  "catalog_preview": "Catalog Preview",
  "export": "Export",
  "undo": "Undo",
  "redo": "Redo",
  "photo_adjustments": "Photo Adjustments",
  "brightness": "Brightness",
  "contrast": "Contrast",
  "saturation": "Saturation",
  "background_blur": "Background Blur",
  "framing_composition": "Framing & Composition",
  "scale_zoom": "Scale / Zoom",
  "pan_x": "Pan X",
  "pan_y": "Pan Y",
  "ai_backgrounds": "AI Backgrounds",
  "suggest_backgrounds": "Suggest Backgrounds",
  "generating_magic": "Generating Magic...",
  "original_blurred": "Original (Blurred)",
  "canvas_format": "Canvas Format",
  "square": "Square (1:1)",
  "portrait": "Portrait (4:5)",
  "story": "Story (9:16)",
  "heritage_typography": "Heritage Typography",
  "custom_logo": "Custom Logo",
  "brand_name": "Brand Name",
  "font_size": "Font Size",
  "label_logo_position": "Label/Logo Position",
  "theme_color": "Theme Color",
  "hex_code": "Hex Code",
  "watermark": "Watermark",
  "watermark_text": "Watermark Text",
  "opacity": "Opacity",
  "custom_text_overlay": "Custom Text Overlay",
  "text_content": "Text Content",
  "font": "Font",
  "color": "Color",
  "size": "Size",
  "position_x": "Position X",
  "position_y": "Position Y",
  "alignment": "Alignment",
  "baseline": "Baseline",
  "language": "Language",
  "capture_photo": "Capture Photo",
  "retake": "Retake",
  "use_photo": "Use Photo",
};

const languages = [
  { id: 'hi', name: 'Hindi' },
  { id: 'bh', name: 'Bhojpuri' },
  { id: 'mai', name: 'Maithili' },
  { id: 'gu', name: 'Gujarati' },
  { id: 'mr', name: 'Marathi' },
  { id: 'pa', name: 'Punjabi' },
  { id: 'kn', name: 'Kannada' },
  { id: 'te', name: 'Telugu' },
  { id: 'ta', name: 'Tamil' }
];

async function run() {
  const result: any = { en: baseStrings };
  for (const lang of languages) {
    console.log(`Translating to ${lang.name}...`);
    const prompt = `Translate the following JSON object values to ${lang.name}. Keep the keys exactly the same. Return ONLY valid JSON, no markdown formatting.
${JSON.stringify(baseStrings, null, 2)}`;
    try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });
      let text = response.text || '';
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      result[lang.id] = JSON.parse(text);
    } catch(e) {
      console.error(e);
      result[lang.id] = baseStrings; // fallback
    }
  }
  fs.writeFileSync('src/translations.json', JSON.stringify(result, null, 2));
  console.log("Done");
}

run();
