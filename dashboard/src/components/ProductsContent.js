import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API_BASE_URL from '../config';
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
  min-width: 100%;
  margin-top: 60px;
`;

const ProductItem = styled.div`
  border: 1px transparent;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #532D3C;
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

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #532D3C;
  border: 1px transparent;
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
  padding-right: 40%;
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

const SortBy = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #fff;
`;

const FirstItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background-color: #fff;
  color: #fff;
  font-size: 16px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

const FirstItem = styled.div`
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

const FirstItemTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color: #532D3C;
  margin-left: 16px;
`;

const ProductsContent = ({ vendorId }) => {
    const [productInfo, setProductInfo] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('quantity');

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch(`${API_BASE_URL}/dashboard/orders/vendor/${vendorId}`);
                const ordersData = await response.json();

                // Process orders to count instances and sum quantities, item_count, and cogs
                const productInfoMap = {};

                ordersData.forEach((order) => {
                    const productId = order.cart_item.product.$oid;
                    const quantity = order.cart_item.quantity;
                    const item_count = order.cart_item.item_count;
                    const cogs = order.cart_item.cogs;

                    if (productInfoMap[productId]) {
                        productInfoMap[productId].quantity += quantity;
                        productInfoMap[productId].item_count += item_count;
                        productInfoMap[productId].cogs += cogs;
                    } else {
                        productInfoMap[productId] = { quantity, item_count, cogs };
                    }
                });

                setProductInfo(productInfoMap);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        }

        async function fetchProductNames() {
            try {
                const response = await fetch(`${API_BASE_URL}/dashboard/parents/${vendorId}`);
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
        fetchProductNames();
    }, [vendorId]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const sortProducts = (a, b) => {
        if (sortBy === 'cogs') {
            return b.cogs - a.cogs;
        } else if (sortBy === 'item_count') {
            return b.item_count - a.item_count;
        } else {
            return b.quantity - a.quantity;
        }
    };

    const sortedProductInfo = Object.keys(productInfo)
        .map((productId) => ({
            productId,
            ...productInfo[productId],
        }))
        .sort(sortProducts);

    // Create separate arrays for each sorting criteria
    const sortByQuantity = [...sortedProductInfo].sort((a, b) => b.quantity - a.quantity);
    const sortByItemCount = [...sortedProductInfo].sort((a, b) => b.item_count - a.item_count);
    const sortByCOGS = [...sortedProductInfo].sort((a, b) => b.cogs - a.cogs);

    return (
        <>
            <FirstItemsGrid>
                <div>
                    <FirstItemTitle>Top Product by Quantity Sold:</FirstItemTitle>
                    {sortByQuantity.length > 0 && (
                        <FirstItem>
                            <p><strong>{productNames[sortByQuantity[0].productId]}</strong></p>
                            <p><strong>Quantity Sold: </strong> {sortByQuantity[0].quantity}</p>
                            <p><strong>Total Item Count: </strong> {sortByQuantity[0].item_count}</p>
                            <p><strong>Total COGS: </strong> {sortByQuantity[0].cogs.toFixed(2)}</p>
                        </FirstItem>
                    )}
                </div>
                <div>
                    <FirstItemTitle>Top Product by Item Count:</FirstItemTitle>
                    {sortByItemCount.length > 0 && (
                        <FirstItem>
                            <p><strong>{productNames[sortByItemCount[0].productId]}</strong></p>
                            <p><strong>Quantity Sold: </strong> {sortByItemCount[0].quantity}</p>
                            <p><strong>Total Item Count: </strong> {sortByItemCount[0].item_count}</p>
                            <p><strong>Total COGS: </strong> {sortByItemCount[0].cogs.toFixed(2)}</p>
                        </FirstItem>
                    )}
                </div>
                <div>
                    <FirstItemTitle>Top Product by COGS:</FirstItemTitle>
                    {sortByCOGS.length > 0 && (
                        <FirstItem>
                            <p><strong>{productNames[sortByCOGS[0].productId]}</strong></p>
                            <p><strong>Quantity Sold: </strong> {sortByCOGS[0].quantity}</p>
                            <p><strong>Total Item Count: </strong> {sortByCOGS[0].item_count}</p>
                            <p><strong>Total COGS: </strong> {sortByCOGS[0].cogs.toFixed(2)}</p>
                        </FirstItem>
                    )}
                </div>
            </FirstItemsGrid>
            <TitleContainer>
                <SortOptions>
                    <SortBy><strong>Sort By:  </strong></SortBy>
                    <SortingDropdown value={sortBy} onChange={handleSortChange}>
                        <option value="quantity">Quantity</option>
                        <option value="item_count">Item Count</option>
                        <option value="cogs">COGS</option>
                    </SortingDropdown>
                </SortOptions>
                <TitleContent>Listing Products ({sortedProductInfo.length} Products)</TitleContent>
            </TitleContainer>
            <ProductsGrid>
                {loading ? (
                    <LoadingContainer>
                        <Loading>Loading Products...</Loading>
                        <Spinner />
                    </LoadingContainer>
                ) : (
                    sortedProductInfo.map((product, index) => (
                        <ProductItem key={index}>
                            <p><strong>{productNames[product.productId]}</strong></p>
                            <p><strong>Quantity Sold: </strong> {product.quantity}</p>
                            <p><strong>Total Item Count: </strong> {product.item_count}</p>
                            <p><strong>Total COGS: </strong> {product.cogs.toFixed(2)}</p>
                        </ProductItem>
                    ))
                )}
            </ProductsGrid>
        </>
    );
};

export default ProductsContent;