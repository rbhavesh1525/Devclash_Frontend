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
    tests: [
      { name: 'Test 1', score: 85 },
      { name: 'Test 2', score: 92 },
      { name: 'Test 3', score: 78 },
      { name: 'Test 4', score: 88 },
    ]
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
    tests: [
      { name: 'Test 1', score: 65 },
      { name: 'Test 2', score: 72 },
      { name: 'Test 3', score: 68 },
      { name: 'Test 4', score: 75 },
    ]
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
    tests: [
      { name: 'Test 1', score: 15 },
      { name: 'Test 2', score: 82 },
      { name: 'Test 3', score: 79 },
      { name: 'Test 4', score: 85 },
    ]
  },
];