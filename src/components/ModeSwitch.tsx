import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { modeSwitchStyles } from './ModeSwitch.styles';
import { applyTheme, getInitialTheme } from '../utils/theme';

const ModeSwitch = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Sync theme state if changed elsewhere
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setTheme(currentTheme);
    };
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <div 
      style={{
        ...modeSwitchStyles.container,
        justifyContent: isDark ? 'flex-end' : 'flex-start',
      }}
      onClick={toggleTheme}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 60,
          mass: 1,
        }}
        style={{
          ...modeSwitchStyles.knob,
          ...(isDark ? modeSwitchStyles.knobDark : modeSwitchStyles.knobLight),
        }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
           <svg 
             width="100%" 
             height="100%" 
             viewBox="0 0 85 85" 
             fill="none" 
             xmlns="http://www.w3.org/2000/svg"
             style={modeSwitchStyles.moonIcon}
           >
             <path 
               fillRule="evenodd" 
               clipRule="evenodd" 
               d="M50.0003 0.659719C47.5656 0.226208 45.0592 0 42.5 0C19.0279 0 0 19.0279 0 42.5C0 65.9721 19.0279 85 42.5 85C65.9721 85 85 65.9721 85 42.5C85 42.4467 84.9999 42.3935 84.9997 42.3403C65.1554 38.8069 50.077 21.5013 50.0003 0.659719Z" 
               fill="currentColor"
             />
           </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModeSwitch;
