  import React from 'react'
  import { Tab, Tabs } from 'react-bootstrap'
  import Faqs from './Faqs'
  import faqs from '../../data/faqs'

  function MainFaqPage() {
    return (
      <div>
            <Tabs
              defaultActiveKey="veg"
              id="uncontrolled-tab-example"
              className="mb-3 food-tabs"
              // Handle tab selection
          >
              <Tab eventKey="veg" title="Sporti 1">
                  <Faqs data={faqs.sporti1}/>
              </Tab>
              <Tab eventKey="nonveg" title="Sporti 2">
              <Faqs data={faqs.sporti2}/>
              </Tab>
          </Tabs>
      </div>
    )
  }

  export default MainFaqPage