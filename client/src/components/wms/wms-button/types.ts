import { ReactNode } from 'react';

export interface WmsButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled: boolean;
  onclick?: () => void;
}
