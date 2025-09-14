import React, { useEffect, useState } from 'react';
import { Select, MenuItem as MuiMenuItem, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LanguageSelectProps {
  language?: 'en' | 'uz';
  setLanguage?: (lang: 'en' | 'uz') => void;
}

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid var(--color-line)' },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--color-placeholder)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--color-primary)',
  },
};

const LanguageSelect: React.FC<LanguageSelectProps> = ({ language: initialLang, setLanguage: setParentLanguage }) => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState<'en' | 'uz'>(
    () => (localStorage.getItem('i18nextLng') as 'en' | 'uz') || initialLang || 'en'
  );

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
    setParentLanguage?.(language);
  }, [language, i18n, setParentLanguage]);

  const handleLanguageChange = (event: SelectChangeEvent<'en' | 'uz'>) => {
    const newLang = event.target.value as 'en' | 'uz';
    setLanguage(newLang);
  };

  return (
    <Select
      value={language}
      onChange={handleLanguageChange}
      size="small"
      variant="outlined"
      className="bg-gray-50 dark:bg-gray-800 rounded-md text-gray-900 dark:text-gray-100 min-w-[70px] lg:min-w-[80px]"
      sx={{ ...inputStyles, '& .MuiSelect-select': { padding: '6px 10px' } }}
    >
      <MuiMenuItem value="en" className="text-gray-900 dark:text-gray-100">
        EN
      </MuiMenuItem>
      <MuiMenuItem value="uz" className="text-gray-900 dark:text-gray-100">
        UZ
      </MuiMenuItem>
    </Select>
  );
};

export default LanguageSelect;
