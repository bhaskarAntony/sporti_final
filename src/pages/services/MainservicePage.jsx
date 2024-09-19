import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Services from './Services'
import servicesData from '../../data/services'

function MainservicePage() {
  return (
    <Tabs
    defaultActiveKey="veg"
    id="uncontrolled-tab-example"
    className="mb-3 food-tabs"
    // Handle tab selection
>
    <Tab eventKey="veg" title="Sporti 1">
        {/* <FoodItems type={type} /> */}
        <Services data={servicesData.sporti1}/>
    </Tab>
    <Tab eventKey="nonveg" title="Sporti 2">
    <Services data={servicesData.sporti2}/>
    </Tab>
</Tabs>
  )
}

export default MainservicePage