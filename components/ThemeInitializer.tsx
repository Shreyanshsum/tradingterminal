'use client';

import { useEffect } from 'react';
import * as Utilities from '@common/utilities';

export default function ThemeInitializer() {
  useEffect(() => {
    // Set default theme if none is saved
    const savedTheme = localStorage.getItem('theme-preference');
    if (!savedTheme) {
      Utilities.onHandleThemeChange('theme-light');
    } else {
      Utilities.onHandleThemeChange(savedTheme);
    }

    // Restore font preference if saved
    const savedFont = localStorage.getItem('font-preference');
    if (savedFont) {
      Utilities.onHandleFontChange(savedFont);
    }
  }, []);

  return null;
} 