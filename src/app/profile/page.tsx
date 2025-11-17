'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  
  const [profileData, setProfileData] = useState({
    firstName: 'Тест',
    lastName: 'Тестов',
    email: 'test@example.com',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Сохраняемые данные:', profileData);
    alert('Профиль успешно обновлен!');
  };
  
  const handleLogout = () => {
    console.log("logout");
    router.push('/'); 
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Ваш профиль</h1>
      
      <form onSubmit={handleSaveProfile} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Имя</label>
          <input 
            type="text" 
            id="firstName"
            name="firstName" 
            value={profileData.firstName} 
            onChange={handleInputChange} 
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" 
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Фамилия</label>
          <input 
            type="text" 
            id="lastName"
            name="lastName" 
            value={profileData.lastName} 
            onChange={handleInputChange} 
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Почта</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={profileData.email} 
            readOnly 
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" 
          />
        </div>

        <button type="submit" className="w-full bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">
          Сохранить изменения
        </button>
      </form>

      <button onClick={handleLogout} className="w-full mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfilePage;
