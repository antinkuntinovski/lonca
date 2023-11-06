import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Icon from '../assets/vendor.png';
import ScrollToTopButton from '../utils/ScrollToTopButton';
import OrdersContent from '../components/OrdersContent';
import ProductsContent from '../components/ProductsContent';
import SalesContent from '../components/SalesContent';
import API_BASE_URL from '../config';

const DashboardContainer = styled.div`
  display: flex;
  background-color: #b8ae93;
`;

const Sidebar = styled.div`
  width: ${({ sidebaropen }) => (sidebaropen ? '240px' : '40px')};
  background-color: #532D3C;
  color: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: width 0.3s;
  overflow-y: auto;
  z-index: 1;
  box-shadow: ${({ sidebaropen }) =>
        sidebaropen ? '4px 0 4px rgba(0, 0, 0, 0.2)' : '4px 0 4px rgba(0, 0, 0, 0.1)'};
`;

const SidebarContent = styled.div`
  width: 100%;
  display: ${({ sidebaropen }) => (sidebaropen ? 'block' : 'none')};
`;

const SidebarTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 0 20px;
`;

const SidebarOptions = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 10px;
  color: #fff;
  font-size: 18px;

  li {
    padding: 40px;
    margin: 10px 0px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;
    border-radius: 5px;
    &:hover {
      color: #532D3C;
      background-color: #fff;
    }
`;

const SidebarToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  position: absolute;
  right: 0;
  transition: transform 0.3s;
  transform: rotate(${({ sidebaropen }) => (sidebaropen ? '0deg' : '180deg')});
  font-size: 24px;
  line-height: 0;
  margin-top: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${({ sidebaropen }) => (sidebaropen ? '240px' : '40px')};
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #b8ae93;
`;

const VendorInfo = styled.div`
  background-color: #f5f5f5;
  padding: 3vh 50vh;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
  color: #532D3C;
`;

const VendorTitle = styled.h2`
  font-size: 40px;
  margin-bottom: 20px;
`;

const VendorName = styled.p`
  font-size: 20px;
  margin: 20px 0;
`;

const VendorIcon = styled.img`
  width: 15vh;
  height: 15vh;
  margin: 20px 0;
  border-radius: 10px;
  border: 3px solid #532D3C;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
    transform: scale(1.2);
    background-color: #532D3C;
    color: #fff;
    }
`;

const GoBackButton = styled.button`
  background-color: #532D3C;
  color: #fff;
  font-weight: bold;
  padding: 2vh 3vh;
  border: 1px solid #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 20px 0;

  &:hover {
    background-color: #fff;
    color: #532D3C;
    border: 1px solid #532D3C;
  }
`;

function Dashboard() {
    const { vendorId } = useParams();
    const [vendorInfo, setVendorInfo] = useState({});
    const [sidebaropen, setSidebaropen] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Sales');
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchVendorInfo() {
            try {
                const response = await axios.get(`${API_BASE_URL}/dashboard/vendors/${vendorId}`);
                setVendorInfo(response.data[0]);
            } catch (error) {
                console.error('Error fetching vendor info:', error);
            }
        }
        fetchVendorInfo();
    }, [vendorId]);

    const handleGoBack = () => {
        navigate('/');
    };

    const renderMainContent = () => {
        switch (selectedOption) {
            case 'Sales':
                return <SalesContent vendorId={vendorId} />;
            case 'Orders':
                return <OrdersContent vendorId={vendorId} />;
            case 'Products':
                return <ProductsContent vendorId={vendorId} />;
            default:
                return null;
        }
    };

    return (
        <DashboardContainer>
            <Sidebar sidebaropen={sidebaropen}>
                <SidebarContent sidebaropen={sidebaropen}>
                    <SidebarTitle>
                        Sidebar
                    </SidebarTitle>
                    <SidebarOptions>
                        <li
                            onClick={() => setSelectedOption('Sales')}
                            selected={selectedOption === 'Sales'}
                        >
                            Sales
                        </li>
                        <li
                            onClick={() => setSelectedOption('Products')}
                            selected={selectedOption === 'Products'}

                        >
                            Products
                        </li>
                        <li
                            onClick={() => setSelectedOption('Orders')}
                            selected={selectedOption === 'Orders'}
                        >
                            Orders
                        </li>
                    </SidebarOptions>
                </SidebarContent>
                <SidebarToggleButton onClick={() => setSidebaropen(!sidebaropen)}>
                    <FontAwesomeIcon icon={sidebaropen ? faArrowRight : faArrowLeft} />
                </SidebarToggleButton>
            </Sidebar>
            <MainContent sidebaropen={sidebaropen}>
                <VendorInfo>
                    <VendorTitle>Vendor Information</VendorTitle>
                    <VendorName><strong>Vendor Name: </strong><em>{vendorInfo.name}</em></VendorName>
                    <VendorIcon src={Icon} alt="Vendor Icon" />
                    <GoBackButton onClick={handleGoBack}>Change Vendor</GoBackButton>
                </VendorInfo>
                {renderMainContent()}
            </MainContent>
            <ScrollToTopButton />
        </DashboardContainer>
    );
}

export default Dashboard;
