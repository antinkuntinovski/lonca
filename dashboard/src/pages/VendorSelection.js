import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/lonca.png';
//import backgroundGIF from '../assets/background.gif';

const blinkTextCursor = keyframes`
  from {border-right-color: rgba(0, 0, 0, .75);}
  to {border-right-color: transparent}
`;

const TextCursor = styled.span`
  border-right: 2px solid rgba(0, 0, 0, .75);
  display: inline;
  animation: ${blinkTextCursor} 1s steps(44) infinite normal;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: #b8ae93;

  img {
    width: 200px;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 0px 100px;
    background-color: #fff;
  }
`;

const VendorSelectionContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  width: 90%;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
`;

const Heading = styled.h1`
  color: #532D3C;
  font-size: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #532D3C;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #532D3C;
  border-radius: 5px;
`;

const GoToDashboardButton = styled.button`
  background-color: #532D3C;
  color: #fff;
  padding: 10px 20px;
  border: 1px solid #532D3C;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fff;
    color: #532D3C;
    border: 1px solid #532D3C;
  }
`;

function TypeWriter({ value }) {
  const [text, setText] = useState('');

  const typeWriter = (text, i = 0) => {
    if (i < value.length) {
      setText(text.slice(0, i + 1));
      setTimeout(() => {
        typeWriter(text, i + 1);
      }, 100);
    }
  };

  useEffect(() => {
    typeWriter(value);
  }, []);

  return (
    <Heading>
      {text}
      <TextCursor />
    </Heading>
  );
}

function VendorSelection() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await axios.get('http://localhost:5000/dashboard/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    }

    fetchVendors();
  }, []);

  const handleGoToDashboard = () => {
    if (selectedVendor) {
      navigate(`/dashboard/${selectedVendor}`);
    }
  };

  return (
    <CenteredContainer>
      <img src={logo} alt='logo' />
      <VendorSelectionContainer>
        <TypeWriter value='Vendor Selection'></TypeWriter>
        <Label htmlFor="vendorSelect">Select a Vendor:</Label>
        <Select
          id="vendorSelect"
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
        >
          <option value="">Select a vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor._id} value={vendor._id}>
              {vendor.name}
            </option>
          ))}
        </Select>
        <GoToDashboardButton onClick={handleGoToDashboard}>Go to Dashboard</GoToDashboardButton>
      </VendorSelectionContainer>
    </CenteredContainer>
  );
}

export default VendorSelection;
