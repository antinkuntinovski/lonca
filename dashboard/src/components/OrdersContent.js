import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
  min-width: 100%;
  margin-top: 0px;
`;

const OrderItem = styled.div`
  border: 1px transparent;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #532D3C;
  text-align: center;
  font-size: 16px;
  background-color: #f5f5f5;
  max-width: 300px;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: #532D3C;
    color: #fff;
  }
`;

const TitleContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background: #532D3C;
border: 1px solid;
border-radius: 5px;
padding: 16px 0px;
width: 100%;
z-index: 1;
`;

const TitleContent = styled.div`
display: flex;
align-items: center;
color: #fff;
font-size: 24px;
font-weight: bold;
padding-right: 45%;
`;

const SortOptions = styled.div`
display: flex;
align-items: center;
margin-left: 10px;
`;

const SortingDropdown = styled.select`
background: #532D3C;
color: #fff;
border: none;
cursor: pointer;
font-size: 16px;
`;

const LoadingContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 32px;
`;

const Loading = styled.h2`
font-size: 24px;
color: #532D3C;
margin-bottom: 32px;
`;

const Spinner = styled.div`
border: 10px solid #f3f3f3;
border-top: 10px solid #532D3C;
border-radius: 50%;
width: 100px;
height: 100px;
animation: spin 1s linear infinite;

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

const OrdersContent = ({ vendorId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productNames, setProductNames] = useState({});
    const [sortBy, setSortBy] = useState('newest'); // State to track sorting

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch(`http://localhost:5000/dashboard/orders/vendor/${vendorId}`);
                const data = await response.json();

                // Sort the orders based on the selected sorting method
                data.sort((a, b) => {
                    if (sortBy === 'newest') {
                        return new Date(b.payment_at) - new Date(a.payment_at);
                    } else {
                        return new Date(a.payment_at) - new Date(b.payment_at);
                    }
                });

                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        }

        async function fetchParentProducts() {
            try {
                const response = await fetch(`http://localhost:5000/dashboard/parents/${vendorId}`);
                const data = await response.json();
                const productNameMapping = {};
                data.forEach((product) => {
                    productNameMapping[product._id] = product.name;
                });
                setProductNames(productNameMapping);
            } catch (error) {
                console.error('Error fetching parent products:', error);
            }
        }

        fetchOrders();
        fetchParentProducts();
    }, [vendorId, sortBy]);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <>
            <TitleContainer>
                <SortOptions>
                    <SortingDropdown onChange={handleSortChange} value={sortBy}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </SortingDropdown>
                </SortOptions>
                <TitleContent>Listing Orders: ({orders.length} Orders)</TitleContent>
            </TitleContainer>
            {loading ? (
                <LoadingContainer>
                    <Loading>Loading Orders...</Loading>
                    <Spinner />
                </LoadingContainer>
            ) : (
                <OrdersGrid>
                    {orders.map((order, index) => (
                        <OrderItem key={index}>
                            <p>
                                <strong>{productNames[order.cart_item.product.$oid]}</strong>
                            </p>
                            <p>
                                <strong>Series: </strong> {order.cart_item.series}
                            </p>
                            <p>
                                <strong>Item Count: </strong> {order.cart_item.item_count}
                            </p>
                            <p>
                                <strong>Quantity: </strong> {order.cart_item.quantity}
                            </p>
                            <p>
                                <strong>COGS: </strong> {order.cart_item.cogs}
                            </p>
                            <p>
                                <strong>Order Status: </strong> {order.cart_item.order_status}
                            </p>
                            <p>
                                <strong>Payment Date: </strong>
                                <br /> {formatDate(order.payment_at)}
                            </p>
                        </OrderItem>
                    ))}
                </OrdersGrid>
            )}
        </>
    );
};

export default OrdersContent;
