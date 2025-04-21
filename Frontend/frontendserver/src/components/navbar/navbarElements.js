import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavMenu,
  SearchContainer,
  SearchInput,
  Dropdown,
  DropdownItem,
} from "./navbarHelp";
import axios from "axios";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    const fetchData = async () => {
      console.log("Fetching data for:", debouncedQuery); // Debugging line
      try {
        const res = await axios.get(`/api/pages?search=${debouncedQuery}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [debouncedQuery]);

  // Handle input changes
  const handleChange = (e) => setQuery(e.target.value);

  // Navigate to the selected page
  const handleNavigate = (slug) => {
    navigate(`${slug}`);
    setQuery("");
    setResults([]); 
  };

  return (
    <Nav>
      <NavMenu>
        <NavLink to="/" end>
          Home
        </NavLink>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search Calculators"
            value={query}
            onChange={handleChange}
          />
          {results.length > 0 && (
            <Dropdown>
              {results.map((item) => (
                <DropdownItem
                  key={item.slug}
                  onClick={() => handleNavigate(item.slug)} 
                >
                  {item.title}  {}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </SearchContainer>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;