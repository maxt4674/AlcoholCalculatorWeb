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
      try {
        const res = await axios.get(`/api/calculators?search=${debouncedQuery}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [debouncedQuery]);

  const handleChange = (e) => setQuery(e.target.value);
  const handleNavigate = (path) => {
    navigate(path);
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
            placeholder="Search calculators..."
            value={query}
            onChange={handleChange}
          />
          {results.length > 0 && (
            <Dropdown>
              {results.map((item) => (
                <DropdownItem
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.name}
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