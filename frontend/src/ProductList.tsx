import React, { useState } from 'react';
import axios from 'axios';
import UpdateProduct from './UpdateProduct';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
}

const ProductList: React.FC<{ products: Product[], onProductUpdated: () => void }> = ({ products, onProductUpdated }) => {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const deleteProduct = async (id: string) => {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        onProductUpdated();
    };

    return (
        <div>
            {products.map(product => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.description} - ${product.price}</p>
                    <button onClick={() => setEditingProduct(product)}>Edit</button>
                    <button onClick={() => deleteProduct(product._id)}>Delete</button>
                </div>
            ))}
            {editingProduct && (
                <UpdateProduct product={editingProduct} onClose={() => setEditingProduct(null)} onUpdated={onProductUpdated} />
            )}
        </div>
    );
};

export default ProductList;
