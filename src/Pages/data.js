import { BookOpen, Atom, FlaskConical } from 'lucide-react';

export const subjects = [
  {
    id: '1',
    name: 'Mathematics',
    progress: 70,
    icon: BookOpen.toString(),
    subtopics: [
      { name: 'Algebra', progress: 85 },
      { name: 'Geometry', progress: 65 },
      { name: 'Calculus', progress: 60 },
    ],
  },
  {
    id: '2',
    name: 'Physics',
    progress: 45,
    icon: Atom.toString(),
    subtopics: [
      { name: 'Mechanics', progress: 50 },
      { name: 'Electricity', progress: 40 },
      { name: 'Optics', progress: 45 },
    ],
  },
  {
    id: '3',
    name: 'Chemistry',
    progress: 60,
    icon: FlaskConical.toString(),
    subtopics: [
      { name: 'Organic', progress: 70 },
      { name: 'Inorganic', progress: 55 },
      { name: 'Physical', progress: 55 },
    ],
  },
];