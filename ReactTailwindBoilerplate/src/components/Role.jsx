import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import r1 from "../image/role1.jpg"
import r2 from "../image/role2.jpg"
import r3 from "../image/role3.jpg"

const OptionsCard = ({ title, description, image, isSelected, onClick, onRadioChange, id }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer ${isSelected ? 'border-2 border-pink-500' : ''}`}
    onClick={onClick}
  >
    <img src={image} alt={title} className="w-24 h-24 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {isSelected && <p className="text-gray-600 text-center">{description}</p>}
    <input
      type="radio"
      name="roles"
      value={id}
      checked={isSelected}
      onChange={onRadioChange}
      className="mt-4"
    />
  </div>
);

const Role = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const options = useMemo(() => [
    {
      id: 1,
      title: "I'm a designer looking to share my work",
      description: 'Share your latest designs and get feedback from the community.',
      image: r1,
    },
    {
      id: 2,
      title: "I'm looking to hire a designer",
      description: 'Browse portfolios and hire the perfect designer for your project.',
      image: r2,
    },
    {
      id: 3,
      title: "I'm looking for design inspiration",
      description: 'With over 7 million shots from a vast community of designers, Dribbble is the leading source for design inspiration.',
      image: r3,
    },
  ], []);

  useEffect(() => {
    const selectedRolesTitles = selectedRoles.map(roleId => options.find(option => option.id === roleId)?.title);
    localStorage.setItem('selectedRoles', JSON.stringify(selectedRolesTitles));
  }, [selectedRoles, options]);

  const handleOptionChange = (id) => {
    setSelectedCard(id);
    if (selectedRoles.includes(id)) {
      setSelectedRoles(selectedRoles.filter((roleId) => roleId !== id));
    } else {
      setSelectedRoles([...selectedRoles, id]);
    }
  };

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">What brings you to Dribbble?</h2>
        <p className="text-gray-600 mb-8 text-center">
          Select the options that best describe you. Don't worry, you can explore other options later.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option) => (
            <OptionsCard
              key={option.id}
              id={option.id}
              title={option.title}
              description={option.description}
              image={option.image}
              isSelected={selectedCard === option.id}
              onClick={() => handleOptionChange(option.id)}
              onRadioChange={() => handleOptionChange(option.id)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition-colors duration-300"
            disabled={selectedRoles.length === 0}
          >
            <Link to='/verification'>Finish</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Role;