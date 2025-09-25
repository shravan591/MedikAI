import React, { useState } from 'react';
import { Language, UserInfo } from '../types';
import { UI_TEXT } from '../constants';

interface UserInfoFormProps {
  onSubmit: (data: UserInfo) => void;
  language: Language;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, language }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [pastHistory, setPastHistory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !gender) {
      setError('Please fill out your name, age, and gender.');
      return;
    }
    if (isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
      setError('Please enter a valid age.');
      return;
    }
    setError('');
    onSubmit({ name, age, gender, pastHistory });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">{UI_TEXT[language].userInfoTitle}</h2>
      <p className="text-slate-600 mb-8 max-w-md">{UI_TEXT[language].userInfoDescription}</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 text-left">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
            {UI_TEXT[language].nameLabel}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
            placeholder={UI_TEXT[language].namePlaceholder}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="age" className="block text-sm font-bold text-slate-700 mb-2">
              {UI_TEXT[language].ageLabel}
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
              placeholder={UI_TEXT[language].agePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {UI_TEXT[language].genderLabel}
            </label>
            <div className="flex space-x-4 items-center h-10">
              {['Male', 'Female', 'Other'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={(e) => setGender(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600"
                  />
                  <span>{UI_TEXT[language][`gender${option}` as keyof typeof UI_TEXT.en]}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="pastHistory" className="block text-sm font-bold text-slate-700 mb-2">
            {UI_TEXT[language].pastHistoryLabel}
          </label>
          <textarea
            id="pastHistory"
            value={pastHistory}
            onChange={(e) => setPastHistory(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none placeholder:text-slate-400"
            placeholder={UI_TEXT[language].pastHistoryPlaceholder}
          />
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="pt-4">
            <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
            >
            {UI_TEXT[language].nextButton}
            </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;