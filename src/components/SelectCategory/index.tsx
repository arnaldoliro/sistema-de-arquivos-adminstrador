'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const options = [
  { value: 'all', label: 'Todos os tipos' },
  { value: 'pdf', label: 'PDF' },
  { value: 'doc', label: 'Documentos' },
  { value: 'img', label: 'Imagens' },
  { value: 'zip', label: 'Arquivos ZIP' },
];

export default function AnimatedDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-700 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
      >
        {options.find(o => o.value === selected)?.label}
        <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 hover:bg-blue-100 text-gray-700 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
