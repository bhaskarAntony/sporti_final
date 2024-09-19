import React, { useState } from 'react'
import './style.css'
import { Tabs, Tab } from 'react-bootstrap'
import Contact from './Contact';
import contactInfo from '../../data/contactinfo';

function MainContact() {


    return (
        <Tabs
            defaultActiveKey="veg"
            id="uncontrolled-tab-example"
            className="mb-3 food-tabs"
            // Handle tab selection
        >
            <Tab eventKey="veg" title="Sporti 1">
                {/* <FoodItems type={type} /> */}
                <Contact data={contactInfo.sporti1}/>
            </Tab>
            <Tab eventKey="nonveg" title="Sporti 2">
            <Contact data={contactInfo.sporti2}/>
            </Tab>
        </Tabs>
    );
}

export default MainContact;
