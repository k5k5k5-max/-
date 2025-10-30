// Fixed: Import ElementType to resolve 'React' namespace error.
import type { ElementType } from 'react';

export type SkillCategory = 'hearing' | 'proposal' | 'trust' | 'business';

export interface Answer {
  text: string;
  score: number;
  label: string;
}

export interface Question {
  text: string;
  answers: Answer[];
  skill: SkillCategory;
}

export type QuizState = 'start' | 'quiz' | 'results';

export interface Result {
  minScore: number;
  title: string;
  catchphrase: string;
  description: string;
  icon: ElementType;
}
