import React from 'react';
import './style.css';
import i1 from '../../assets/images/aboutus/smwaus_2.jpg';
import team from '../../data/team';
import membersData from '../../data/members';
import { useLanguage } from '../../context/LangaugeContext';
import aboutImage from '../../assets/images/aboutus/about_us_banner.jpg'
import { Helmet } from 'react-helmet';

function About() {
  const { isKannada } = useLanguage();

  return (
    <div className='about'>
      <Helmet>
      <title>About SPORTI - Senior Police Officers Research and Training Institute</title>
    <meta name="description" content="Learn about SPORTI, established in 1973, dedicated to serving the Karnataka Police with quality training, accommodation, and event facilities." />
    <meta name="keywords" content="About SPORTI, Senior Police Officers Research and Training Institute, police training, history of SPORTI, services for police officers, Karnataka Police, committee members" />

      </Helmet>
      <div className="contact-banner ">
        <img src={aboutImage} alt="" className="w-100 about-image" />
      </div>
       <div className="skew-container">
          <div className="skew-left">
            <h1 className="fs-2 fw-bold">{isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'ABOUT US'}</h1>
          </div>
          <div className="skew-right d-flex align-items-center">
            <h1 className="fs-2 fw-bold"></h1>
          </div>
        </div>

      <div className="container py-5">
        <div className="text-center">
          <i className="bi bi-stars fs-2 text-warning"></i>
          <span className="fs-6 subtitle d-block text-center">{isKannada?'ಸ್ಪೋರ್ಟಿ':'SPORTI'}</span>
          <h1 className="fs-2 fw-bold title">
            {isKannada ? 'ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆ' : 'Senior Police Officers Research and Training Institute'}
          </h1>
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-md-9 mb-3">
            <div className="about-left">
              <p className="fs-6 text-secondary mt-4">
                {isKannada ? 
                  `ಸ್ಪೊರ್ಟಿ - ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆಯನ್ನು 1973 ರಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾಯಿತು ಮತ್ತು ಪೊಲೀಸ್ ಇಲಾಖೆಯ ಅಗತ್ಯತೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರೈಸುತ್ತಿದೆ. ಇದನ್ನು ಈ ಹಿಂದೆ ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಮೆಸ್ ಎಂದು ಕರೆಯಲಾಗುತ್ತಿತ್ತು ಮತ್ತು ಒದಗಿಸುತ್ತಿರುವ ಸೇವೆಗಳ ಗುಣಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸಲು 2019 ರಲ್ಲಿ SPORTI ಎಂದು ಮರುನಾಮಕರಣ ಮಾಡಲಾಯಿತು.`
                  : 
                  `SPORTI - Senior Police Officers Research and Training Institute was established in the year 1973 and has been successfully catering to the needs of the Police department. It was previously known as the Senior Police Officer Mess and renamed to SPORTI in 2019 to enhance the quality of services being provided.`
                }
              </p>
              <p className="fs-6 text-secondary mt-4">
                {isKannada ? 
                  `SPORTI ಸಮ್ಮೇಳನಗಳು ಮತ್ತು ತರಬೇತಿ, ವಸತಿ, ಖಾಸಗಿ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುವುದು, ಆಚರಣೆಗಳು ಮತ್ತು ಊಟದ ಅಗತ್ಯವನ್ನು ಪೂರೈಸುತ್ತದೆ. ಸೊಗಸಾದ ಕಾನ್ಫರೆನ್ಸ್ ಕೊಠಡಿಗಳು, ಅತ್ಯಾಧುನಿಕ ಮಿನಿ-ಥಿಯೇಟರ್, ಐಷಾರಾಮಿ ವಸತಿ, ಸುಸಜ್ಜಿತ ಜಿಮ್, ಬ್ಯಾಡ್ಮಿಂಟನ್ ಮತ್ತು ಟೇಬಲ್ ಟೆನ್ನಿಸ್‌ನಂತಹ ಕ್ರೀಡಾ ಮಾರ್ಗಗಳು ಮತ್ತು ವಿಶಾಲವಾದ ಹಾಕಿ ಮೈದಾನವನ್ನು ಒಳಗೊಂಡಿರುವ ಉನ್ನತ ಮತ್ತು ಗುಣಮಟ್ಟದ ಮೂಲಸೌಕರ್ಯವನ್ನು ಇದು ಹೊಂದಿದೆ. SPORTI ಯ ಕೇಂದ್ರ ಸ್ಥಾನವು ನಮ್ಮ ಅತಿಥಿಗಳಿಗೆ ಕಡಿಮೆ ಪ್ರಯಾಣದ ಸಮಯದೊಂದಿಗೆ ಪ್ರಮುಖ ಅಧಿಕೃತ ಸ್ಥಳಗಳನ್ನು ತಲುಪಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ ಮತ್ತು ಬೆಂಗಳೂರಿನ ಕಾಸ್ಮೋಪಾಲಿಟನ್ ಸಂಸ್ಕೃತಿಯ ನಂತರದ ಕೆಲಸದ ಸಮಯವನ್ನು ಅನುಭವಿಸುತ್ತದೆ.` 
                  : 
                  `SPORTI fulfills the requirement of organizing conferences and training, accommodation, hosting private and public events, celebrations, and dining. It boasts superior and quality infrastructure featuring elegant conference rooms, a state-of-the-art mini-theater, luxurious accommodation, a well-equipped gym, sporting avenues like Badminton and Table Tennis, and a vast Hockey ground. SPORTI's central location enables our guests to reach important official destinations with reduced travel time and also experience Bangalore’s cosmopolitan culture post work hours.`
                }
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-3">
            <div className="about-left">
              <img src={i1} alt="" className="w-100 mt-3" />
              <img src='./images/sporti2/About_Us_SPORTI_2.jpg' alt="" className="w-100 mt-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="light p-2 ">
        <div className="ourteam container">
          <div className="text-center">
            <i className="bi bi-stars fs-2 text-warning"></i>
            <h1 className="f2 fw-bold title">{isKannada ? 'ಸ್ಪೋರ್ಟಿಯ ಕೋರ್ ಕಮಿಟಿ' : 'Core Committee of SPORTI'}</h1>
            <span className="f6 subtitle d-block">
              {isKannada ? 
                'ಸ್ಪೋರ್ಟಿಯು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್‌ನ ವಿವಿಧ ಘಟಕಗಳ ಹಿರಿಯ ಅಧಿಕಾರಿಗಳನ್ನು ಒಳಗೊಂಡ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿಯನ್ನು ಹೊಂದಿದೆ. ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್‌ನ ಎಲ್ಲಾ ಹಿರಿಯ ಸದಸ್ಯರಿಗೆ ಗುಣಮಟ್ಟದ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಒದಗಿಸಲು ಅವರು ಶ್ರಮಿಸುತ್ತಿದ್ದಾರೆ. ಸ್ಪೋರ್ಟಿಯ ವಿವಿಧ ಚಟುವಟಿಕೆಗಳನ್ನು ಚರ್ಚಿಸಲು, ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಿರ್ಣಯಿಸಲು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ತಂಡವು ಪ್ರತಿ ತಿಂಗಳ ಕೊನೆಯ ಶುಕ್ರವಾರದಂದು ಸಭೆ ಸೇರುತ್ತದೆ.' 
                : 
                'SPORTI has a working committee comprising senior officers from various units of Karnataka State Police. They strive to provide quality facilities and services to all senior members of Karnataka State Police. The team meets on the last Friday of every month to discuss various activities of SPORTI, assess feedback, and take measures to enhance the services.'
              }
            </span>
          </div>
          <div className="row">
            {team.map((item, index) => (
              <div key={index} className="col-12 col-md-4 mb-4">
                <div className="profile-card p-2 rounded-3">
                  <img src={item.profile} alt={item.name} className="w-100 mb-3 rounded-3" />
                  <div className="card-body">
                    <h5 className="card-title f6 mt-3">{isKannada ? item.name_ka : item.name_en}</h5>
                    <p className="card-text f6 text-secondary">{isKannada ? item.role_ka : item.role_en}</p>
                    <p className="card-text f6">{isKannada ? item.desc_ka : item.desc_en}</p>
                    {item.contact && <p className="card-text f6">Contact: {item.contact}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="commity-members p-2 p-md-5">
        <div className="text-center py-4">
          <h3 className="fs4 subtitle">{isKannada?'ಸ್ಪೋರ್ಟಿ':'SPORTI'}</h3>
          <h1 className="title fs2 fw-bold">
            {isKannada ? 'ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆ ಸಮಿತಿಯ ಸದಸ್ಯರ ವಿವರಗಳು' : 'Senior Police Officers Research and Training Institute Committee Members Details'}
          </h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>{isKannada?'ಎಸ್.ಐ.ನಂ':'SI.No'}</th>
              <th>{isKannada ? 'ಹೆಸರು' : 'Name'}</th>
              <th>{isKannada ? 'ಸ್ಪೋರ್ಟಿ' : 'SPORTI'}</th>
            </tr>
          </thead>
          <tbody>
            {membersData.map((item, index) => (
              <tr key={index}>
                <td className="f6">{index + 1}</td>
                <td className="f6" title={`${isKannada ? item.name_ka : item.name_en}, ${isKannada ? item.role_ka : item.role_en}`}>
                  {isKannada ? item.name_ka : item.name_en}
                  <br />
                  {isKannada ? item.role_ka : item.role_en}
                </td>
                <td className="f6" title={isKannada ? item.desc_ka : item.desc_en}>
                  {isKannada ? item.desc_ka : item.desc_en}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;
