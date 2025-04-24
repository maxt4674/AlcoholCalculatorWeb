import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: rgb(0, 168, 165);
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
  align-items: left;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  background: none;
  border: none;
  font: inherit;

  &.active {
    color: #4d4dff;
  }

  &:hover {
    color: #333;
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
  margin-left: 200px;
  gap: 1rem;
`;