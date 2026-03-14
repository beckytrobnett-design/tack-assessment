/**
 * PDF report generator — uses @react-pdf/renderer (client-side).
 * Generates PDF in browser, returns as base64 for API submission.
 */

import { pdf } from '@react-pdf/renderer';
import { ReportDocument } from '../components/pdf/ReportDocument';

async function fetchLogoAsDataUri(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
}

export async function generateOrientationReportBase64(results, userName = 'You') {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://tack.tondreaupoint.com';
  const [logoDataUri, headerLogoDataUri] = await Promise.all([
    fetchLogoAsDataUri(`${origin}/logos/logo-stacked-dark.png`),
    fetchLogoAsDataUri(`${origin}/logos/logo-horizontal-light.png`),
  ]);

  const blob = await pdf(
    <ReportDocument
      results={results}
      userName={userName}
      logoDataUri={logoDataUri}
      headerLogoDataUri={headerLogoDataUri}
    />
  ).toBlob();
  const buffer = await blob.arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
