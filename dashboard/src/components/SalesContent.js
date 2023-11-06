import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  min-width: 100%;
  margin-top: 0px;

  button {
    background-color: #532D3C;
    color: #fff;
    padding: 30px 10px;
    font-size: 30px;
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

const ChartCard = styled.div`
  position: relative;
  transition: transform 0.3s ease-in-out;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 8px;
  color: #532D3C;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const ChartTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  button {
    background-color: #532D3C;
    color: #fff;
    padding: 5px;
    border: 1px solid #532D3C;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #fff;
      color: #532D3C;
      border: 1px solid #532D3C;
    }
  }
`;

const InfoItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  background-color: #fff;
  color: #fff;
  font-size: 16px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 93%;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

const InfoItem = styled.div`
  background-color: #fff;
  color: #532D3C;
  border: 1px solid #532D3C;
  border-radius: 8px;
  margin-left: 16px;
  margin-right: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  background-color: #f5f5f5;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: #532D3C;
    color: #fff;
  }
`;

const InfoItemTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color: #532D3C;
  margin-left: 16px;
`;

const Graph = ({ vendorId, selectedYear }) => {
    const [cogsData, setCOGSData] = useState({});
    const [itemCountsData, setItemCountsData] = useState({});
    const [quantityData, setQuantityData] = useState({});


    useEffect(() => {
        async function fetchData() {
            try {
                const ordersResponse = await fetch(`http://localhost:5000/dashboard/orders/${vendorId}/${selectedYear}`);
                const ordersData = await ordersResponse.json();

                const monthlyCOGS = Array(12).fill(0);
                ordersData.forEach((order) => {
                    const paymentDate = new Date(order.payment_at);
                    const month = paymentDate.getMonth();
                    const cogs = order.cart_item.cogs;
                    monthlyCOGS[month] += cogs;
                });
                setCOGSData({ data: monthlyCOGS, labels: getMonthLabels() });

                const monthlyItemCounts = Array(12).fill(0);
                ordersData.forEach((order) => {
                    const paymentDate = new Date(order.payment_at);
                    const month = paymentDate.getMonth();
                    const item_count = order.cart_item.item_count;
                    monthlyItemCounts[month] += item_count;
                });
                setItemCountsData({ data: monthlyItemCounts, labels: getMonthLabels() });

                const monthlyQuantities = Array(12).fill(0);
                ordersData.forEach((order) => {
                    const paymentDate = new Date(order.payment_at);
                    const month = paymentDate.getMonth();
                    const quantity = order.cart_item.quantity;
                    monthlyQuantities[month] += quantity;
                });
                setQuantityData({ data: monthlyQuantities, labels: getMonthLabels() });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [vendorId, selectedYear]);

    const getMonthLabels = () => {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
    };

    return (
        <div>
            <Bar
                data={{
                    labels: cogsData.labels,
                    datasets: [
                        {
                            label: 'COGS',
                            data: cogsData.data,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Item Counts',
                            data: itemCountsData.data,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Quantities',
                            data: quantityData.data,
                            backgroundColor: 'rgba(219, 213, 35, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                }}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                    },
                    responsive: true,
                }}
                width={1200}
                height={600}
            />
        </div>
    );
};

const SalesContent = ({ vendorId }) => {
    const years = [2021, 2022, 2023];
    const [selectedYearIndex, setSelectedYearIndex] = useState(2);
    const [cogsData, setCOGSData] = useState({});
    const [itemCountsData, setItemCountsData] = useState({});
    const [quantityData, setQuantityData] = useState({});


    useEffect(() => {
        async function fetchData() {
            try {
                const ordersResponse1 = await fetch(`http://localhost:5000/dashboard/orders/${vendorId}/2021`);
                const ordersData1 = await ordersResponse1.json();

                const yearlyCOGS = Array(4).fill(0);
                ordersData1.forEach((order) => {
                    const cogs = order.cart_item.cogs;
                    yearlyCOGS[0] += cogs;
                });

                const yearlyItemCounts = Array(4).fill(0);
                ordersData1.forEach((order) => {
                    const item_count = order.cart_item.item_count;
                    yearlyItemCounts[0] += item_count;
                });

                const yearlyQuantities = Array(4).fill(0);
                ordersData1.forEach((order) => {
                    const quantity = order.cart_item.quantity;
                    yearlyQuantities[0] += quantity;
                });
                const ordersResponse2 = await fetch(`http://localhost:5000/dashboard/orders/${vendorId}/2022`);
                const ordersData2 = await ordersResponse2.json();

                ordersData2.forEach((order) => {
                    const cogs = order.cart_item.cogs;
                    yearlyCOGS[1] += cogs;
                });

                ordersData2.forEach((order) => {
                    const item_count = order.cart_item.item_count;
                    yearlyItemCounts[1] += item_count;
                });

                ordersData2.forEach((order) => {
                    const quantity = order.cart_item.quantity;
                    yearlyQuantities[1] += quantity;
                });
                const ordersResponse3 = await fetch(`http://localhost:5000/dashboard/orders/${vendorId}/2023`);
                const ordersData3 = await ordersResponse3.json();

                ordersData3.forEach((order) => {
                    const cogs = order.cart_item.cogs;
                    yearlyCOGS[2] += cogs;
                });

                ordersData3.forEach((order) => {
                    const item_count = order.cart_item.item_count;
                    yearlyItemCounts[2] += item_count;
                });

                ordersData3.forEach((order) => {
                    const quantity = order.cart_item.quantity;
                    yearlyQuantities[2] += quantity;
                });

                yearlyCOGS[3] = yearlyCOGS[0] + yearlyCOGS[1] + yearlyCOGS[2];
                yearlyItemCounts[3] = yearlyItemCounts[0] + yearlyItemCounts[1] + yearlyItemCounts[2];
                yearlyQuantities[3] = yearlyQuantities[0] + yearlyQuantities[1] + yearlyQuantities[2];

                yearlyCOGS[0] = yearlyCOGS[0].toFixed(2);
                yearlyCOGS[1] = yearlyCOGS[1].toFixed(2);
                yearlyCOGS[2] = yearlyCOGS[2].toFixed(2);
                yearlyCOGS[3] = yearlyCOGS[3].toFixed(2);

                setCOGSData(yearlyCOGS);
                setItemCountsData(yearlyItemCounts);
                setQuantityData(yearlyQuantities);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [vendorId]);

    const handlePrevYear = () => {
        setSelectedYearIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    const handleNextYear = () => {
        setSelectedYearIndex((prevIndex) => (prevIndex < years.length - 1 ? prevIndex + 1 : prevIndex));
    };

    const selectedYear = years[selectedYearIndex];

    return (
        <>
            <Layout>
                <button onClick={handlePrevYear}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <ChartCard>
                    <ChartTitle>
                        <label><strong>Monthly Stats {selectedYear}</strong></label>
                    </ChartTitle>

                    {selectedYear === 2023 && (
                        <Graph vendorId={vendorId} selectedYear={2023} />
                    )}
                    {selectedYear === 2022 && (
                        <Graph vendorId={vendorId} selectedYear={2022} />
                    )}
                    {selectedYear === 2021 && (
                        <Graph vendorId={vendorId} selectedYear={2021} />
                    )}
                </ChartCard>
                <button onClick={handleNextYear}><FontAwesomeIcon icon={faArrowRight} /></button>
            </Layout>
            <InfoItemsGrid>
                <div>
                    <InfoItemTitle>All Time</InfoItemTitle>
                    <InfoItem>
                        <p><strong>Quantity Sold: </strong>{quantityData[3]}</p>
                        <p><strong>Total Item Count: </strong>{itemCountsData[3]}</p>
                        <p><strong>Total COGS: </strong>{cogsData[3]}</p>
                    </InfoItem>
                </div>
                <div>
                    <InfoItemTitle>2021</InfoItemTitle>
                    <InfoItem>
                        <p><strong>Quantity Sold: </strong>{quantityData[0]}</p>
                        <p><strong>Total Item Count: </strong>{itemCountsData[0]}</p>
                        <p><strong>Total COGS: </strong>{cogsData[0]}</p>
                    </InfoItem>
                </div>
                <div>
                    <InfoItemTitle>2022</InfoItemTitle>
                    <InfoItem>
                        <p><strong>Quantity Sold: </strong>{quantityData[1]}</p>
                        <p><strong>Total Item Count: </strong>{itemCountsData[1]}</p>
                        <p><strong>Total COGS: </strong>{cogsData[1]}</p>
                    </InfoItem>
                </div>
                <div>
                    <InfoItemTitle>2023</InfoItemTitle>
                    <InfoItem>
                        <p><strong>Quantity Sold: </strong>{quantityData[2]}</p>
                        <p><strong>Total Item Count: </strong>{itemCountsData[2]}</p>
                        <p><strong>Total COGS: </strong>{cogsData[2]}</p>
                    </InfoItem>
                </div>
            </InfoItemsGrid>
        </>
    );
};

export default SalesContent;
