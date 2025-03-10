import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { useIntl } from "react-intl";
import { MenuItem } from "./MenuItem";
import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MegaMenuELearning } from "./MegaMenuELearning";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { ProductModel } from "../../../../../app/models/ProductModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Mobile search toggle component.
const MobileSearchToggle: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => setShowSearch((prev) => !prev);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setShowSearch(false);
    }
  };

  return (
    <div className="w-100">
      <button className="btn btn-link p-0" onClick={handleToggle}>
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
      {showSearch && (
        <form onSubmit={handleSubmit} className="mt-2 position-relative">
          <div className="input-group">
            <input
              ref={searchInputRef}
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                border: "1px solid black",
                borderRadius: 0,
                padding: "4px 8px",
              }}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary"
              style={{
                border: "1px solid black",
                borderLeft: "none",
                borderRadius: 0,
                padding: "4px 8px",
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const ProductSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductModel[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const timeoutRef = useRef<number>();

  const fetchSuggestions = async (search: string) => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const paginatedResults = await ProductModel.fetchProducts(1, {
        name: search,
        per_page: 5,
      });
      setSuggestions(paginatedResults.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSuggestions([]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setQuery(term);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (term.length > 1) fetchSuggestions(term);
      else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (product: ProductModel) => {
    navigate(`/product/${product.id}`);
    setQuery("");
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-100">
      <form onSubmit={handleSubmit} className="position-relative w-100">
        <div className="input-group">
          <input
            ref={searchInputRef}
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={query}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="Search"
            style={{
              border: "1px solid black",
              borderRadius: 0,
              padding: "4px 8px",
            }}
          />
          <button
            type="submit"
            className="btn btn-outline-secondary"
            style={{
              border: "1px solid black",
              borderLeft: "none",
              borderRadius: 0,
              padding: "4px 8px",
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        {showDropdown && suggestions.length > 0 && (
          <div
            className="position-absolute bg-white"
            style={{
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
              border: "1px solid #ccc",
              maxHeight: "180px",
              overflowY: "auto",
            }}
          >
            <ul className="list-unstyled m-0 p-0">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  className="p-2 border-bottom"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSuggestionClick(product)}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export function MenuInner() {
  const urlSegments = window.location.pathname.split("/");
  const isAdmin = urlSegments.includes("admin");
  if (isAdmin) return null;
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <>
      <div className="menu-item me-lg-1 m-0 p-0">
        <Link className="menu-link p-0" to="/">
          <img
            src="/media/logos/loader-1.svg"
            alt="Skills.ug logo"
            title="Home Page"
            style={{ width: "180px", height: "70px" }}
          />
        </Link>
      </div>

      <MenuItem title="SHOP" to="/shop" />

      <MenuInnerWithSub
        isMega={true}
        title="CATEGORIES"
        to="/mega-menu"
        menuPlacement="bottom-start"
        menuTrigger="{default:'click', lg: 'hover'}"
        hasArrow={true}
      >
        <MegaMenuELearning />
      </MenuInnerWithSub>
      {/* Middle Search Box spans full available width */}
      <div className="menu-item flex-grow-1 d-none d-lg-block pt-5 ps-8 w-100">
        <ProductSearch />
      </div>
      {/* Mobile: Toggle search */}
      <div className="menu-item d-lg-none">
        <MobileSearchToggle />
      </div>
    </>
  );
}
