import React, { useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { countryCodes } from '../../constants/countries';

const CountryCodeSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedCountry = countryCodes.find(country => country.code === value);

  const filteredCountries = countryCodes.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.code.includes(search)
  );

  const handleSelect = (code) => {
    onChange(code);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full flex items-center justify-between px-3 py-2 
                 border border-gray-300 dark:border-gray-600 rounded-lg 
                 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
                 transition-colors"
      >
        <div className="flex items-center">
          <span className="text-lg mr-2">{selectedCountry?.flag || '🇱🇰'}</span>
          <span className="font-medium">{selectedCountry?.code || '+94'}</span>
        </div>
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg 
                      shadow-lg border border-gray-200 dark:border-gray-700 max-h-80 
                      overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 
                         dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>

          {/* Country List */}
          <div className="overflow-y-auto max-h-60">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country.code)}
                className={`w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 
                         dark:hover:bg-gray-700 transition-colors
                         ${country.code === value ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
              >
                <span className="text-lg w-8">{country.flag}</span>
                <span className="font-medium mr-2">{country.code}</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {country.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelect;