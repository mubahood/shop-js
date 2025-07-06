// src/app/components/HomePage/CategoryList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { useManifestCategories, useManifest } from "../../hooks/useManifest";

const CategoryList: React.FC = () => {
  const categories = useManifestCategories();
  const { isLoading: categoriesLoading, error: categoriesError } = useManifest();

  // Icon mapping for categories
  const categoryIcons: { [key: string]: string } = {
    electronics: "bi-phone",
    fashion: "bi-bag",
    home: "bi-house",
    sports: "bi-bicycle",
    toys: "bi-joystick",
    beauty: "bi-heart-pulse",
    automotive: "bi-car-front",
    books: "bi-book",
    default: "bi-grid",
  };

  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    for (const [key, icon] of Object.entries(categoryIcons)) {
      if (name.includes(key)) {
        return icon;
      }
    }
    return categoryIcons.default;
  };

  if (categoriesLoading) {
    return (
      <div className="category-list-wrapper d-flex justify-content-center p-3">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="category-list-wrapper">
        <Alert variant="warning" className="small">
          Error loading categories
        </Alert>
      </div>
    );
  }

  //limit categories to 9 only
  const displayCategories =
    categories && categories.length > 9 ? categories.slice(0, 9) : categories;

  return (
    <div className="category-list-wrapper">
      <ul className="list-unstyled">
        {displayCategories &&
          displayCategories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/products?category=${category.id}`}
                className="category-item"
              >
                <i
                  className={`bi ${getIconForCategory(category.category)}`}
                ></i>
                <span>{category.category}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryList;
