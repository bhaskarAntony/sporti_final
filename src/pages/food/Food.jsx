import React, { useState } from 'react'
import './style.css'
import { Tabs, Tab } from 'react-bootstrap'
import FoodItems from './FoodItems'

function Food() {
    const [type, setType] = useState('veg'); // Set default type to 'veg'

    const handleTabSelect = (selectedType) => {
        setType(selectedType); // Update type state when switching tabs
    };

    return (
        <Tabs
            defaultActiveKey="veg"
            id="uncontrolled-tab-example"
            className="mb-3 food-tabs"
            onSelect={handleTabSelect} // Handle tab selection
        >
            <Tab eventKey="veg" title="Veg">
                <FoodItems type={type} />
            </Tab>
            <Tab eventKey="nonveg" title="Non-Veg">
                <FoodItems type={type} />
            </Tab>
        </Tabs>
    );
}

export default Food;
