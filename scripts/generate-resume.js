/*
 * generate-resume.js
 *
 * Generates a minimal but valid PDF version of the resume so the
 * About page can link to a downloadable PDF (as required by the
 * assignment). Run with:  node scripts/generate-resume.js
 *
 * Student Name: Shu Haoyang (Jackie)  |  StudentID: 2024110172
 */

const fs = require('fs');
const path = require('path');

const A4 = { width: 595, height: 842 };
const MARGIN = 50;
const CONTENT_WIDTH = A4.width - MARGIN * 2;

const NAVY = '0.059 0.106 0.176 rg';
const TEAL = '0.078 0.722 0.651 rg';
const TEXT = '0.141 0.231 0.325 rg';
const RULE = '0.886 0.91 0.941 rg';

let y = A4.height - 50;
const ops = [];

function escapeText(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function text(s, opts = {}) {
  const size = opts.size || 10;
  const font = opts.bold ? 'F2' : 'F1';
  const color = opts.color || TEXT;
  const x = opts.x || MARGIN;
  ops.push(`BT /${font} ${size} Tf ${color} ${x} ${y} Td (${escapeText(s)}) Tj ET`);
  y -= size * (opts.lineHeight || 1.35);
}

function gap(amount) {
  y -= amount;
}

function rule() {
  ops.push(`${RULE} 0.8 w ${MARGIN} ${y} m ${A4.width - MARGIN} ${y} l S`);
  y -= 14;
}

// Estimate lines by wrapping on word boundaries (Helvetica ~0.5em per char).
function wrap(s, size, maxWidth) {
  const approxCharWidth = size * 0.5;
  const maxChars = Math.floor(maxWidth / approxCharWidth);
  const words = s.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

function paragraph(s, size = 10, bold = false) {
  const lines = wrap(s, size, CONTENT_WIDTH);
  for (const line of lines) text(line, { size, bold });
}

// ------------------------------------------------------------------
// Header
// ------------------------------------------------------------------
text('Shu Haoyang (Jackie)', { size: 22, bold: true, color: NAVY, lineHeight: 1.2 });
text('Technical Sales | FAE | Technical Support', { size: 11, bold: true, color: TEAL });
text('Suzhou Centennial College | Software Technology | Expected 2027', { size: 9.5, color: TEXT, lineHeight: 1.5 });
text('+86 199 9161 8708  |  212jackieshu@gmail.com', { size: 9.5, color: TEXT });
rule();

// ------------------------------------------------------------------
// Summary
// ------------------------------------------------------------------
text('SUMMARY', { size: 11, bold: true, color: NAVY });
paragraph('Software Technology student with foundations in C and Linux, strong bilingual (English / Chinese) communication skills, and frontline customer service experience. Adaptable to multitasking and cross-cultural collaboration, and eager to combine technical understanding with customer service in technical sales, FAE, or technical support roles.');
gap(6);

// ------------------------------------------------------------------
// Skills
// ------------------------------------------------------------------
text('SKILLS', { size: 11, bold: true, color: NAVY });
paragraph('Technical: C, C#, Java, SQL databases, Unix/Linux operations.', 9.5);
paragraph('Communication: CET-4 (English), NCRE Level 1, customer-facing communication and presentation.', 9.5);
gap(6);

// ------------------------------------------------------------------
// Core Courses
// ------------------------------------------------------------------
text('CORE COURSES', { size: 11, bold: true, color: NAVY });
paragraph('C Programming, C# Programming, Java Programming, SQL Databases, Linux Operating Systems.', 9.5);
gap(6);

// ------------------------------------------------------------------
// Experience
// ------------------------------------------------------------------
text('EXPERIENCE', { size: 11, bold: true, color: NAVY });

text('Teaching Assistant (Homework Tutoring)', { size: 10, bold: true, lineHeight: 1.3 });
text('Xinsiqi Education  |  2025.05 - 2026.08', { size: 9, color: TEAL });
paragraph('Supported student homework tutoring and Q&A, organizing task requirements and building patience and classroom management skills.', 9.5);
gap(4);

text('English Teaching Assistant', { size: 10, bold: true, lineHeight: 1.3 });
text('Suzhou Centennial College  |  2025.06 - 2025.08 / 2026.06 - 2026.09', { size: 9, color: TEAL });
paragraph('Assisted academic affairs and after-class tutoring, delivering English explanations and Q&A; won first prize in the campus English speech contest.', 9.5);
gap(4);

text('B2B Sales Practice (Semiconductor Equipment)', { size: 10, bold: true, lineHeight: 1.3 });
text('Field Visit with Senior Sales Lead  |  2025.09', { size: 9, color: TEAL });
paragraph('Shadowed a semiconductor ToB sales lead visiting Russian and Taiwanese clients, learning equipment introduction, requirement discovery, and quotation negotiation.', 9.5);
gap(4);

text('Barista (Part-time)', { size: 10, bold: true, lineHeight: 1.3 });
text('Starbucks (Suzhou)  |  2025.11 - Present', { size: 9, color: TEAL });
paragraph('Handled drink preparation and customer service in a fast-paced shift environment, building service awareness and time management under pressure.', 9.5);
gap(4);

text('Bilingual Volunteer', { size: 10, bold: true, lineHeight: 1.3 });
text('Suzhou Metro APEC Conference  |  2026.05', { size: 9, color: TEAL });
paragraph('Provided bilingual reception, information and route guidance for international guests; recognized as an Outstanding Volunteer.', 9.5);
gap(6);

// ------------------------------------------------------------------
// Honors & Awards
// ------------------------------------------------------------------
text('HONORS & AWARDS', { size: 11, bold: true, color: NAVY });
paragraph('National Inspirational Scholarship (2025-2026)', 9.5);
paragraph('Suzhou Centennial College Scholarship, 3rd Prize (2024-2025, 2025-2026)', 9.5);
paragraph('Campus Web Design Competition, 2nd Prize (2025)', 9.5);
paragraph('Campus English Speech Contest, 1st Prize - Preliminary & Final (2025)', 9.5);
paragraph('Suzhou University Football League (Group A), 1st Place (2026)', 9.5);
paragraph('Suzhou Metro APEC Outstanding Bilingual Volunteer (2026)', 9.5);
gap(6);

// ------------------------------------------------------------------
// Strengths
// ------------------------------------------------------------------
text('STRENGTHS', { size: 11, bold: true, color: NAVY });
paragraph('Self-driven and resilient; comfortable balancing study, competitions and part-time work. Strong English communication and adaptability to multitasking and cross-cultural collaboration.', 9.5);

// ------------------------------------------------------------------
// Assemble the PDF document
// ------------------------------------------------------------------
const contentStream = ops.join('\n');
const streamBytes = Buffer.from(contentStream, 'latin1');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4.width} ${A4.height}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
  `<< /Length ${streamBytes.length} >>\nstream\n${contentStream}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'
];

let pdf = '%PDF-1.4\n';
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, 'latin1');
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';
offsets.forEach((off) => {
  pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

const outPath = path.join(__dirname, '..', 'public', 'resume', 'ShuHaoyang_Resume.pdf');
fs.writeFileSync(outPath, pdf, 'latin1');
console.log('Wrote ' + outPath);
