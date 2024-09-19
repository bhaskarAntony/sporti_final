import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PastEvents from './PastEvents';
import UpcomingEvents from './UpcomingEvents';
import Updates from './Updates';
import Notifications from './Notifications';
import './style.css';
import { useLanguage } from '../../context/LangaugeContext';

function Recents() {
  const {isKannada} = useLanguage();
  return (
    <Tabs
      defaultActiveKey="recent"
      id="uncontrolled-tab-example"
      className="mb-3 recent-tabs"
    >
      <Tab eventKey="recent" title={isKannada ? 'ಇತ್ತೀಚಿನ ಈವೆಂಟ್‌ಗಳು' : 'Recent Events'}>
        <PastEvents/>
      </Tab>
      <Tab eventKey="upcoming" title={isKannada ? 'ಮುಂಬರುವ ಈವೆಂಟ್‌ಗಳು' : 'Upcoming Events'}>
        <UpcomingEvents/>
      </Tab>
      <Tab eventKey="updates" title={isKannada ? 'ನವೀಕರಣಗಳು' : 'Updates'}>
        <Updates/>
      </Tab>
      <Tab eventKey="notifications" title={isKannada ? 'ಅಧಿಸೂಚನೆಗಳು' : 'Notifications'}>
        <Notifications/>
      </Tab>






    </Tabs>
  );
}

export default Recents;
