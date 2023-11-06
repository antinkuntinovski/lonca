import React from 'react';
import styled from 'styled-components';

const SortOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const SortButton = styled.button`
  background-color: #532D3C;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 16px;

  &:hover {
    background-color: #fff;
    color: #532D3C;
  }
`;

const SortSelect = styled.select`
  padding: 10px;
  border: 1px solid #532D3C;
  border-radius: 5px;
  cursor: pointer;
`;

const SortOptions = ({ onSortChange, selectedSortOption }) => {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <SortOptionsContainer>
            <SortButton onClick={onSortChange}>Sort</SortButton>
            <SortSelect value={selectedSortOption} onChange={handleSortChange}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
            </SortSelect>
        </SortOptionsContainer>
    );
};

export default SortOptions;
