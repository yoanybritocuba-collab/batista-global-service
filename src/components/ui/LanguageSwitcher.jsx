import React, { useState } from 'react';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('es');

  return (
    <div className="relative">
      <button className="flex items-center space-x-1">
        <Globe size={16} />
        <span className="text-sm">{language === 'es' ? 'ES' : 'EN'}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;