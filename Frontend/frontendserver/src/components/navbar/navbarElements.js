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
  const { isAuthenticated, user, logout } = useAuth();
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

  const handleChange = (e) => setQuery(e.target.value);

  const handleNavigate = (slug) => {
    navigate(`${slug}`);
    setQuery("");
    setResults([]); 
  };

  return (
    <Nav>
      <NavMenu>
        <h1 style={{marginRight: '50px', color: 'rgb(16, 57, 84)'}}>AlchCalc</h1>
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
        {isAuthenticated && user.userType === 'ADMIN' && (
          <NavLink to="/CalcPage" end style={{marginLeft: '15px'}}>Calc Creation</NavLink>
        )}
        <RightNav>
          {isAuthenticated ? (
            <>
              <NavLink to="/account" end>Account</NavLink>
              <NavLink as="button" onClick={logout} style={{height: '25px', padding: '8px 12px'}}>Logout</NavLink>
            </>
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