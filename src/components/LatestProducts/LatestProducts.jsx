import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({ latestProductsPormise }) => {
    const products = use(latestProductsPormise);
    console.log(products)
    return (
        <div>
            <h1 className='text-5xl font-semibold text-center'>Recent <span className='text-primary'>Products</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    products.map(product => <Product product={product} key={product._id}></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;