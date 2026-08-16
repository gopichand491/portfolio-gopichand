export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  /** completed = internship done + certificate issued
   *  offer_received = offer/selection letter obtained, internship not yet started
   *  ongoing = currently active
   */
  status: 'completed' | 'offer_received' | 'ongoing';
  projects?: string[];
  certificateDate?: string;
  documents: { label: string; path: string }[];
  statusNote?: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'prodigy',
    company: 'Prodigy InfoTech',
    role: 'Software Development Intern',
    period: '1 July 2025 – 31 July 2025',
    location: 'Remote',
    status: 'completed',
    projects: [
      'Temperature Converter',
      'Number Guessing Game',
      'Contact Management System',
      'Sudoku Solver',
      'Web Scraper using Python & BeautifulSoup',
    ],
    certificateDate: '1 August 2025',
    documents: [
      { label: 'Internship Certificate', path: '/assets/certificates/Prodigy_Internship_Certificate.png.png' },
      { label: 'Offer Letter', path: '/assets/certificates/Prodigy_Offer_Letter.png.png' },
      { label: 'Letter of Recommendation', path: '/assets/certificates/Prodigy_Letter_of_Recommendation.png.png' },
    ],
  },
  {
    id: 'alcronix',
    company: 'Alcronix',
    role: 'Offer / Selection Letter Received',
    period: '',
    location: '',
    status: 'offer_received',
    statusNote: 'Offer letter received. Refer to the document for details.',
    documents: [
      { label: 'Offer Letter', path: '/assets/certificates/Alcronix_Offer_Letter.png.png' },
    ],
  },
  {
    id: 'zidio',
    company: 'Zidio',
    role: 'Offer / Selection Letter Received',
    period: '',
    location: '',
    status: 'offer_received',
    statusNote: 'Offer letter received. Refer to the document for details.',
    documents: [
      { label: 'Offer Letter', path: '/assets/certificates/Zidio_Offer_Letter.png.png' },
    ],
  },
];
