import { ReactNode } from 'react';

interface Page {
  index: number;
  component: ReactNode;
}

export interface MultiStepFormProps {
  step: number;
  pages: Page[];
}
