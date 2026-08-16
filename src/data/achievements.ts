export interface Achievement {
  id: string;
  title: string;
  event: string;
  label: 'First Prize' | 'Winner' | 'Finalist' | 'Participant';
  certificate: string;
  description?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'protoblitz25',
    title: "ProtoBlitz'25 — First Prize",
    event: 'VelTech University',
    label: 'First Prize',
    certificate: '/assets/certificates/ProtoBlitz25_First_Prize_VelTech.png',
    description: 'Awarded First Prize at ProtoBlitz\'25, a rapid prototyping competition held at VelTech University.',
  },
  {
    id: 'ideathon6',
    title: 'IDEATHON 6',
    event: 'SRMIST',
    label: 'Participant',
    certificate: '/assets/certificates/IDEATHON6_SRMIST_Certificate.png.png',
    description: 'Participated in IDEATHON 6 at SRMIST — an innovation and idea challenge.',
  },
  {
    id: 'futurepreneur',
    title: 'Futurepreneur 2024–25 Grand Finale',
    event: 'RIT',
    label: 'Participant',
    certificate: '/assets/certificates/Futurepreneur2024_25_RIT_GrandFinale_Certificate.png.png',
    description: 'Reached the Grand Finale of Futurepreneur 2024–25 at RIT — an entrepreneurship challenge.',
  },
];

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
  category?: string;
}

/**
 * All verified certificate/credential assets from public/assets/certificates/
 * These are sourced from actual uploaded files only. No invented entries.
 */
export const CERTIFICATES: Certificate[] = [
  {
    id: 'kaggle-ai',
    title: 'AI Agents',
    issuer: 'Kaggle',
    image: '/assets/certificates/Kaggle_AI_Agents_Certificates.png',
    category: 'AI / ML',
  },
  {
    id: 'digital-scholar-genai',
    title: 'Generative AI',
    issuer: 'Digital Scholar',
    image: '/assets/certificates/DigitalScholar_GenerativeAI_Certificates.png',
    category: 'AI / ML',
  },
  {
    id: 'adobe-hackathon',
    title: 'Adobe India Hackathon',
    issuer: 'Adobe',
    image: '/assets/certificates/Adobe_India_Hackathon_Certificates.png',
    category: 'Hackathon',
  },
  {
    id: 'reliance-ds',
    title: 'Data Science',
    issuer: 'Reliance',
    image: '/assets/certificates/Reliance_DataScience_Certificates.png',
    category: 'Data Science',
  },
  {
    id: 'geekster-python',
    title: 'Python',
    issuer: 'Geekster',
    image: '/assets/certificates/Geekster_Python_Certificates.png',
    category: 'Programming',
  },
  {
    id: 'officemaster-pbi',
    title: 'Power BI',
    issuer: 'OfficeMaster',
    image: '/assets/certificates/OfficeMaster_PowerBI_Certificate.png.png',
    category: 'Data Science',
  },
  {
    id: 'simats-participation',
    title: 'Engineering Participation',
    issuer: 'SIMATS Engineering',
    image: '/assets/certificates/SIMATS_Engineering_Participation_Certificate.png.png',
    category: 'Participation',
  },
  {
    id: 'ideathon6-cert',
    title: 'IDEATHON 6',
    issuer: 'SRMIST',
    image: '/assets/certificates/IDEATHON6_SRMIST_Certificate.png.png',
    category: 'Hackathon',
  },
  {
    id: 'futurepreneur-cert',
    title: 'Futurepreneur 2024–25 Grand Finale',
    issuer: 'RIT',
    image: '/assets/certificates/Futurepreneur2024_25_RIT_GrandFinale_Certificate.png.png',
    category: 'Entrepreneurship',
  },
  {
    id: 'prodigy-internship-cert',
    title: 'Internship Certificate',
    issuer: 'Prodigy InfoTech',
    image: '/assets/certificates/Prodigy_Internship_Certificate.png.png',
    category: 'Internship',
  },
  {
    id: 'prodigy-lor',
    title: 'Letter of Recommendation',
    issuer: 'Prodigy InfoTech',
    image: '/assets/certificates/Prodigy_Letter_of_Recommendation.png.png',
    category: 'Internship',
  },
  {
    id: 'protoblitz25-cert',
    title: "ProtoBlitz'25 — First Prize",
    issuer: 'VelTech University',
    image: '/assets/certificates/ProtoBlitz25_First_Prize_VelTech.png',
    category: 'Achievement',
  },
];
