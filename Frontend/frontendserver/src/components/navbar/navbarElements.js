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
  RightNav,
} from "./navbarHelp";
import { useAuth } from '../Authentication/authContext';
import axios from 'axios';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
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
        const res = await axios.get(`/pages?search=${debouncedQuery}`);
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
        <NavLink to="/" end>Home</NavLink>
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
                <DropdownItem key={item.slug} onClick={() => handleNavigate(item.slug)}>
                  {item.slug}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        </SearchContainer>
        {isAuthenticated && (
          <NavLink to="/CalcPage" end>Calc Creation</NavLink>
        )}
        <RightNav>
          {isAuthenticated ? (
            <NavLink as="button" onClick={logout}>Logout</NavLink>
          ) : (
            <>
              <NavLink to="/login" end>Login</NavLink>
              <NavLink to="/register" end>Register</NavLink>
            </>
          )}
        </RightNav>
      </NavMenu>
    </Nav>
  );
};

export default Navbar;