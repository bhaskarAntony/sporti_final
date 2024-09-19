import React, { useState } from 'react';
import menu from '../../data/foods';
import './style.css';
import { Link } from 'react-router-dom';

function FoodItems({ type }) {
    const [selectedCategory, setSelectedCategory] = useState('Breakfast');
    const [selectedFoods, setSelectedFoods] = useState({});

    const addQuantity = (foodId) => {
        setSelectedFoods({
            ...selectedFoods,
            [foodId]: { ...selectedFoods[foodId], quantity: (selectedFoods[foodId]?.quantity || 0) + 1 }
        });
    };

    const removeQuantity = (foodId) => {
        if (selectedFoods[foodId]?.quantity > 0) {
            setSelectedFoods({
                ...selectedFoods,
                [foodId]: { ...selectedFoods[foodId], quantity: selectedFoods[foodId].quantity - 1 }
            });
        }
    };

    const handleAddClick = (foodId) => {
        if (selectedFoods[foodId]) {
            setSelectedFoods({
                ...selectedFoods,
                [foodId]: { ...selectedFoods[foodId], quantity: (selectedFoods[foodId]?.quantity || 0) + 1 }
            });
        } else {
            setSelectedFoods({
                ...selectedFoods,
                [foodId]: { quantity: 1 }
            });
        }
    };

    return (
        <div className=' container-fluid p-2 p-md-4 bg-white'>
            <div className="food-categories">
                {menu.map((item, index) => (
                    <div className="menu-item text-center" key={index} onClick={() => setSelectedCategory(item.title)}>
                        <img src={item.image} alt="" className='mb-3' />
                        <div className="menu-info">
                            <p className="fs-4">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="filter p-3 d-flex gap-3 py-4 overflow-auto flex-nowrap position-sticky top-0 bg-white">
                <button className="btn btn-outline-secondary px-4 rounded-3"><i className="bi bi-funnel"></i> Filter</button>
                <button className="btn btn-outline-secondary px-4 rounded-3"><i className="bi bi-star"></i> Rating 4.0+</button>
                <button className="btn btn-outline-secondary px-4 rounded-3"><i className="bi bi-check-circle"></i> Pure veg</button>
                <button className="btn btn-outline-secondary px-4 rounded-3"><i className="bi bi-bar-chart-steps"></i> Cuisines</button>
            </div>

            <div className="allfoods p-2">
                <h1 className="fs-1 fw-bold mt-3">{selectedCategory}</h1>
                <hr />
                <div className="row">
                    {menu.map((item, index) => (
                        item.title === selectedCategory && item.foods.map((fooditem, foodIndex) => (
                            fooditem.veg === type ? (
                                <div className="col-12 col-md-3 mb-4" key={fooditem.id}>
                                    <div className="food-card d-flex flex-column justify-content-between h-100 p-3">
                                        <div className="food-card-top">
                                            <img src={fooditem.image} alt="" className='w-100 mb-3' />
                                            {(selectedFoods[fooditem.id] && selectedFoods[fooditem.id].quantity > 0) ? (
                                                <div className="add active d-flex align-items-center">
                                                    <button onClick={() => removeQuantity(fooditem.id)}>-</button>
                                                    <span className='fs-5'>{selectedFoods[fooditem.id].quantity}</span>
                                                    <button onClick={() => addQuantity(fooditem.id)}>+</button>
                                                </div>
                                            ) : (
                                                <span className="fs-3" onClick={() => handleAddClick(fooditem.id)}>Add</span>
                                            )}
                                            <div className="type">
                                                <div className={`type-circle ${fooditem.veg === 'veg' ? 'bg-success' : 'bg-danger'}`}></div>
                                            </div>
                                        </div>
                                        <span className="fs-5 d-block fw-bold text-dark">{fooditem.title}</span>
                                        <div className="d-flex gap-3 mt-2 align-items-center">
                                            <small className="fs-6 text-secondary caption">{fooditem.caption}</small>
                                            <span className="fs-5 price fw-bold btn btn-outline-success p-1 btn-sm">&#8377; {fooditem.price}/-</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (null)
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FoodItems;
