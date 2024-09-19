import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css'

function FoodCart() {
    const location = useLocation();
    const [items, setItems] = useState(location.state?.cartItems || []);

    // Update the items state when location state changes
    useEffect(() => {
        setItems(location.state?.cartItems || []);
    }, [location.state?.cartItems]);

    const handleAddClick = (foodItem) => {
        // Check if the item is already in the cart
        const itemIndex = items.findIndex(item => item.id === foodItem.id);
        if (itemIndex !== -1) {
            // If item is already in the cart, update its quantity
            const updatedItems = [...items];
            updatedItems[itemIndex].quantity += 1;
            setItems(updatedItems);
        } else {
            // If item is not in the cart, add it with quantity 1
            setItems(prevItems => [...prevItems, { ...foodItem, quantity: 1 }]);
        }
    };

    const addQuantity = (id) => {
        const updatedItems = items.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const removeQuantity = (id) => {
        const updatedItems = items.map(item => {
            if (item.id === id && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setItems(updatedItems);
    };

    return (
        <div>
            {items && items.length > 0 ? (
                <div className='cart-container p-2 p-md-4 container-fluid'>
                    <h1>Selected Items:</h1>
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <div className="cart-left">
                                <div className="cart-card rounded-4">
                                    {items.map((foodItem, index) => (
                                        <ul className="cart-foods" key={index}>
                                            <li className="cart-item d-flex justify-content-between align-items-center mb-3">
                                                <div className='d-flex align-items-center gap-2 w-100'>
                                                    <div className={`type-circle ${foodItem.veg === 'veg' ? 'bg-success' : 'bg-danger'}`}></div>
                                                    <div>
                                                        <span className="fs-5">{foodItem.title}</span>
                                                        <small className='d-block '>{foodItem.caption}</small>
                                                    </div>
                                                </div>
                                                <div className="input-group flex-nowrap w-25">
                                                    <button onClick={() => removeQuantity(foodItem.id)} className='fs-4 input-group-text'>-</button>
                                                    <span className='fs-4  form-control text-center'>{foodItem.quantity}</span>
                                                    <button onClick={() => addQuantity(foodItem.id)} className='fs-4 input-group-text'>+</button>
                                                </div>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="cart-right">
                            </div>
                        </div>
                    </div>

                    <button className="order-btn fs-4">Confirm Order <i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            ) : (
                <p>No items selected</p>
            )}
        </div>
    );
}

export default FoodCart;
