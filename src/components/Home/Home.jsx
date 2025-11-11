import React from 'react';
import LatestProducts from '../LatestProducts/LatestProducts';

const latestProductsPormise = fetch('http://localhost:5000/latest-products').then(res => res.json());

const Home = () => {
    return (
        <div>
            <h1>This is Home</h1>
            <LatestProducts latestProductsPormise={latestProductsPormise}></LatestProducts>
        </div>
    );
};

export default Home;