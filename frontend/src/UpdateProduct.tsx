import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct: React.FC<{ product: any, onClose: () => void, onUpdated: () => void }> = ({ product, onClose, onUpdated }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    const handleUpdate = async () => {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, { name, price, description });
        onUpdated();
        onClose();
    };

    return (
        <div>
            <h3>Edit Product</h3>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default UpdateProduct;
