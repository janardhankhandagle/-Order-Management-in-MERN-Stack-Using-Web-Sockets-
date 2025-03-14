import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';

const socket = io('http://localhost:5000');

const App: React.FC = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
        socket.on('productUpdated', fetchProducts);
        return () => { socket.off('productUpdated'); };
    }, []);

    return (
        <div>
            <h1>Product Management</h1>
            <CreateProduct onProductCreated={fetchProducts} />
            <ProductList products={products} onProductUpdated={fetchProducts} />
        </div>
    );
};

export default App;
