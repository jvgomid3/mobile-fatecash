import { useCallback } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useAccessibility() {
  const readPageContent = useCallback(() => {
    // Simple placeholder: announce that page loaded. In a real app integrate with TTS or more specific messages.
    AccessibilityInfo.announceForAccessibility('Página carregada');
  }, []);

  return { readPageContent };
}
