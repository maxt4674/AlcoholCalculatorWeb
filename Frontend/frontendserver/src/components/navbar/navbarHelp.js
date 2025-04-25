import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: rgb(202, 231, 250);
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  position: fixed;
  width: 100%;
  top: 0;

`;

export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px 12px;
  height: 25px; 
  cursor: pointer;
  background: none;
  border: none;
  font: inherit;
  border-radius: 5px;
  transition: background 0.3s ease, color 0.3s ease;
  margin: 8px;
  margin-left: 10px;

  &.active {
    color: #4d4dff;
    border: 1px solid #ccc;
    padding: 7px 11px;
    background-color: rgb(166, 220, 255);
  }

  &:hover {
    color: #333;
    background-color: rgb(166, 220, 255);
    border: 1px solid #ccc;
    padding: 7px 11px;
    text-decoration: underline;
  }

`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
`;

export const SearchContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-right: 10px;
`;

export const SearchInput = styled.input`
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    height: 25px;
`;

export const Dropdown = styled.div`
    position: absolute;
    top: 38px;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
`;

export const DropdownItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const RightNav = styled.div`
  display: flex;
  align-items: center;
  margin-left: 180px;
  gap: 1rem;
`;