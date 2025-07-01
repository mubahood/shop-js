// src/app/components/HomePage/CategoryList.tsx
import React from 'react';

const categories = [
    { name: 'Consumer Electronics', icon: 'bi-phone' },
    { name: 'Apparel & Fashion', icon: 'bi-bag' }, // changed icon
    { name: 'Home, Garden & Tools', icon: 'bi-house' },
    { name: 'Sports & Outdoors', icon: 'bi-bicycle' },
    { name: 'Toys & Hobbies', icon: 'bi-joystick' },
    { name: 'Beauty & Health', icon: 'bi-heart-pulse' },
    { name: 'Automobiles', icon: 'bi-car-front' },
    { name: 'Books & Office', icon: 'bi-book' },
];

const CategoryList: React.FC = () => {
  return (
    <div className="category-list-wrapper">
      <ul className="list-unstyled">
        {categories.map((category) => (
          <li key={category.name}>
            <a href="#" className="category-item">
              <i className={`bi ${category.icon}`}></i>
              <span>{category.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;