import { useState, useEffect } from 'react';

export function useTypingEffect(words, delay = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeoutId;

    if (!isDeleting) {
      // Typing forward
      if (charIndex < currentWord.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        // Finished typing, wait before deleting
        timeoutId = setTimeout(() => setIsDeleting(true), delay);
      }
    } else {
      // Deleting backward
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, currentWordIndex, isDeleting, words, delay]);

  return currentText;
}

export default useTypingEffect;
