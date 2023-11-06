import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #532D3C;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 15px;
  padding: 30px;
  cursor: pointer;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 1;
  transition: background-color 0.3s;
  margin: 30px;
  font-size: 20px;
  &:hover {
    background-color: #fff;
    color: #532D3C;
    border: 2px solid #532D3C;
  }
`;

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ScrollButton show={showButton} onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
        </ScrollButton>
    );
};

export default ScrollToTopButton;
