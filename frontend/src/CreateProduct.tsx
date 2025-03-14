import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct: React.FC<{ onProductCreated: () => void }> = ({ onProductCreated }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/products', { name, price: Number(price), description });
        setName('');
        setPrice('');
        setDescription('');
        onProductCreated();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required type="number" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateProduct;
