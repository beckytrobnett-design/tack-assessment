/**
 * PDF report generator — uses @react-pdf/renderer (client-side).
 * Generates PDF in browser, returns as base64 for API submission.
 */

import { pdf } from '@react-pdf/renderer';
import { ReportDocument } from '../components/pdf/ReportDocument';

export async function generateOrientationReportBase64(results, userName = 'You') {
  const blob = await pdf(
    <ReportDocument results={results} userName={userName} />
  ).toBlob();
  const buffer = await blob.arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
