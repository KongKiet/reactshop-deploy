import React from 'react';
import Products from './pages/ProductList/Product';
import ProductManagement  from './pages/ProductManagement/ProductManagement';
import Carts from './pages/Carts/Carts';

const routes = [
    {
        path : '/products',
        exact : false,
        main : () => <Products />
    },

    {
        path : '/carts',
        exact : false,
        main : () => <Carts />
    },

    {
        path : '/products_management',
        exact : false,
        main : () => <ProductManagement />
    }
]

export default routes;