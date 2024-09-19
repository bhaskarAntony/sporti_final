import React, { useState } from 'react';
import menu from '../../data/foods';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

function FoodItems({ type }) {
    const [selectedCategory, setSelectedCategory] = useState('Breakfast');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const navigate = useNavigate()

    const addQuantity = (id) => {
        setSelectedItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: (item.quantity || 0) + 1 };
                }
                return item;
            });
            return updatedItems;
        });
    };

    const removeQuantity = (id) => {
        setSelectedItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === id && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            return updatedItems.filter(item => item.quantity > 0); // Remove product if quantity becomes 0
        });
    };

    const handleAddClick = (fooditem) => {
        if (selectedItems.some(item => item.id === fooditem.id)) {
            // If the same food item is clicked again and quantity > 0, keep the quantity adjustment buttons visible
            setSelectedItems(selectedItems.map(item =>
                item.id === fooditem.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
            ));
        } else {
            // If a new food item is clicked, add it to the selected items with quantity 1
            setSelectedItems([...selectedItems, { ...fooditem, quantity: 1 }]);
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
              
                <div className="row">
                    {menu.map((item, index) => (
                        item.title === selectedCategory && item.all.map((allitem, allindex) => (
                          <section className='mt-3'>
                            <h1 className="fs-1 fw-bold mt-3">{allitem.title}</h1>
                            <hr />
                          <div className="row">
                            {
                                allitem.foods.map((fooditem, foodIndex)=>(
                                    fooditem.veg === type ? (
                                        <div className="col-12 col-md-3 mb-4" key={fooditem.id}>
                                            <div className="food-card d-flex flex-column justify-content-between h-100 p-3">
                                                <div className="food-card-top" onClick={() => setSelectedItem(fooditem)}>
                                                    <img src={fooditem.image} alt="" className='w-100 mb-3' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />
                                                    {(selectedItems.some(selectedItem => selectedItem.id === fooditem.id) && selectedItems.find(selectedItem => selectedItem.id === fooditem.id).quantity > 0) ? (
                                                        <div className="add active d-flex align-items-center">
                                                            <button onClick={() => removeQuantity(fooditem.id)} className='fs-4'>-</button>
                                                            <span className='fs-4'>{selectedItems.find(selectedItem => selectedItem.id === fooditem.id).quantity}</span>
                                                            <button onClick={() => addQuantity(fooditem.id)} className='fs-4'>+</button>
                                                        </div>
                                                    ) : (
                                                        <div className="add d-flex align-item-center justify-content-center">
                                                            <span className="fs-4" onClick={() => handleAddClick(fooditem)}>Add</span>
                                                        </div>
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
                            }
                          </div>
                          </section>
                        ))
                    ))}
                </div>
            </div>

            <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">{selectedItem.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="bottom-card">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <div className="food-card-top">
                                    <img src={selectedItem.image} alt={selectedItem.title} className="w-100 rounded-3" />
                                    <div className="type">
                                        <div className={`type-circle ${selectedItem.veg === 'veg' ? 'bg-success' : 'bg-danger'}`}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-7 py-4">
                                <span className="fs-4 fw-bold">{selectedItem.title}</span>
                                <div className="d-flex flex-md-column gap-3 mt-2 align-items-md-start align-items-center">
                                    <small className="fs-6 text-secondary caption">{selectedItem.caption}</small>
                                    <span className="fs-5 price fw-bold btn btn-outline-success p-1 btn-sm">&#8377; {selectedItem.price}/-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedItems.length > 0 && (
        //   <Link to={{ pathname: "/cart", state: 'hello'}}>
               
        //         </Link>
            <div className="bottom-bar" onClick={()=>navigate('/cart', {state: { cartItems: selectedItems}})}>
            <span className="fs-5 d-block">{selectedItems.length} items Added <i className="bi bi-arrow-right-circle-fill"></i></span>
            <span className="fs-6">Add items worth &#8377;89 more to get delivery</span>
        </div>
            )}
        </div>
    );
}

export default FoodItems;
