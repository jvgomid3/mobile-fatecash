import { Platform } from 'react-native';

export function useSpeechSynthesis() {
  const speak = (text: string) => {
    // Placeholder: if you install expo-speech you can replace this with Speech.speak(text)
    if (Platform.OS === 'web') {
      console.log('speak:', text);
    } else {
      // not implemented by default; keep as console fallback
      console.log('speak:', text);
    }
  };

  return { speak };
}
