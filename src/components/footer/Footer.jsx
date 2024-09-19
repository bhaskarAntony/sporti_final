import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/images/logoDark.svg';
import { useLanguage } from '../../context/LangaugeContext';

function Footer() {
    const { isKannada } = useLanguage();
    return (
        <footer className='p-2 p-md-5'>
            <section className="footer_container d-flex flex-column justify-content-between container-fluid bg-texture" id="footer">
                <div className="row">
                    <div className="col-md-8">
                        <div className="left">
                            <h2 className=''>{isKannada ? 'ಸ್ಪೋರ್ಟಿ' : 'SPORTI'}</h2>
                            <hr />
                            <p className=''>
                                {isKannada
                                    ? 'ಸ್ಪೋರ್ಟಿ ಸಮ್ಮೇಳನಗಳು ಮತ್ತು ತರಬೇತಿ, ವಸತಿ, ಖಾಸಗಿ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುವುದು, ಆಚರಣೆಗಳು ಮತ್ತು ಊಟದ ಅಗತ್ಯವನ್ನು ಪೂರೈಸುತ್ತದೆ. ಸೊಗಸಾದ ಕಾನ್ಫರೆನ್ಸ್ ಕೊಠಡಿಗಳು, ತರಬೇತಿ ಕೊಠಡಿ, ವ್ಯಾಪಕವಾದ ಈವೆಂಟ್ ಹಾಲ್, ಚಲನಚಿತ್ರಗಳು ಮತ್ತು ಸಾಕ್ಷ್ಯಚಿತ್ರಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲು ಅತ್ಯಾಧುನಿಕ ಮಿನಿ ಥಿಯೇಟರ್, ಐಷಾರಾಮಿ ವಸತಿ ಸೌಕರ್ಯಗಳು - ವಿಐಪಿ, ಕುಟುಂಬ ಮತ್ತು ಕಾರ್ಯನಿರ್ವಾಹಕ ಕೊಠಡಿಗಳು, ಪ್ರಭಾವಶಾಲಿ ಒಳಾಂಗಣ ಡೈನಿಂಗ್ ಹಾಲ್ ಮತ್ತು ಹೊರಾಂಗಣ ಬಾರ್ಬೆಕ್ಯೂ, ಉತ್ತಮವಾದ ಮತ್ತು ಗುಣಮಟ್ಟದ ಮೂಲಸೌಕರ್ಯವನ್ನು ಸಹ ಇದು ಹೊಂದಿದೆ. ಫಿಟ್‌ನೆಸ್ ಕಾಪಾಡಿಕೊಳ್ಳಲು ಸುಸಜ್ಜಿತ ಜಿಮ್, ಬ್ಯಾಡ್ಮಿಂಟನ್, ಟೇಬಲ್ ಟೆನಿಸ್ ಮತ್ತು ಬಿಲಿಯರ್ಡ್ಸ್‌ನಂತಹ ಕ್ರೀಡಾ ಮಾರ್ಗಗಳು ಮತ್ತು ವಿಶಾಲವಾದ ಹಾಕಿ ಮೈದಾನ. SPORTI ಯ ಕೇಂದ್ರ ಸ್ಥಾನವು ನಮ್ಮ ಅತಿಥಿಗಳಿಗೆ ಕಡಿಮೆ ಪ್ರಯಾಣದ ಸಮಯದೊಂದಿಗೆ ಪ್ರಮುಖ ಅಧಿಕೃತ ಸ್ಥಳಗಳನ್ನು ತಲುಪಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ ಮತ್ತು ಬೆಂಗಳೂರಿನ ಕಾಸ್ಮೋಪಾಲಿಟನ್ ಸಂಸ್ಕೃತಿಯ ನಂತರದ ಕೆಲಸದ ಸಮಯವನ್ನು ಅನುಭವಿಸುತ್ತದೆ. ಜೀವನ ಅನುಭವವನ್ನು ಹೆಚ್ಚಿಸಲು ಎರಡೂ ಸಂಸ್ಥೆಗಳು ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಅನುಭವ ಮತ್ತು ನಿಷ್ಪಾಪ ಸೇವೆಯನ್ನು ಒದಗಿಸಲು ಬದ್ಧವಾಗಿವೆ.'
                                    : 'SPORTI fulfills the requirement of organizing conferences and training, accommodation, hosting private and public events, celebrations, and dining. It also boasts superior and quality infrastructure featuring elegant Conference rooms, Training room, extensive Event hall, state of the art Mini Theatre for screening movies and documentaries, luxurious accommodation - VIP, Family and Executive rooms, impressive indoor Dining hall and outdoor Barbeque, well equipped Gym for maintaining fitness, sporting avenues like Badminton, Table Tennis and Billiards and also a vast Hockey ground. SPORTI’s central location enables our guests to reach important official destinations with reduced travel time and also experience Bengaluru’s cosmopolitan culture post work hours. Both institutes are committed to providing high-quality experience and impeccable service to enhance the living experience.'}
                            </p>
                            
                            <p className=''>
                                {isKannada
                                    ? 'ಸ್ಪೋರ್ಟಿ - ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆಯನ್ನು 1973 ರಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾಯಿತು ಮತ್ತು ಪೊಲೀಸ್ ಇಲಾಖೆಯ ಅಗತ್ಯತೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರೈಸುತ್ತಿದೆ. ಇದನ್ನು ಮೊದಲು ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಮೆಸ್ ಎಂದು ಕರೆಯಲಾಗುತ್ತಿತ್ತು ಮತ್ತು ಒದಗಿಸುತ್ತಿರುವ ಸೇವೆಗಳ ಗುಣಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸಲು 2019 ರಲ್ಲಿ ಸ್ಪೋರ್ಟಿ ಎಂದು ಮರುನಾಮಕರಣ ಮಾಡಲಾಯಿತು. ಅಂತೆಯೇ, ಹೆಚ್ಚಿನ ಅಧಿಕಾರಿಗಳಿಗೆ ಸೇವೆಗಳು ಮತ್ತು ಕೊಡುಗೆಗಳ ವ್ಯಾಪ್ತಿಯನ್ನು ವಿಸ್ತರಿಸಲು, KSRP ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಸಂಸ್ಥೆಯನ್ನು 2014 ರಲ್ಲಿ ಸ್ಥಾಪಿಸಲಾಯಿತು ಮತ್ತು ನಂತರ ಅದನ್ನು SPORTI-2 ಎಂದು ಮರುನಾಮಕರಣ ಮಾಡಲಾಯಿತು. ಈ ವಿಕಸನವು ಅದರ ಮಧ್ಯಸ್ಥಗಾರರ ವಿಕಸನದ ಅಗತ್ಯಗಳನ್ನು ಪೂರೈಸಲು ಹೊಂದಿಕೊಳ್ಳುವ ಸಂದರ್ಭದಲ್ಲಿ ಅದರ ಕ್ಷೇತ್ರದಲ್ಲಿ ಜ್ಞಾನ ಮತ್ತು ಪರಿಣತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಸಂಸ್ಥೆಯ ಸಮರ್ಪಣೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ. SPORTI 1 ಮತ್ತು SPORTI 2 ಎರಡೂ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿರುವ ಮತ್ತು ನಿವೃತ್ತ ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳಿಗೆ ಮಾತ್ರ ಎಲ್ಲಾ ವಿಶೇಷ ಸೌಲಭ್ಯಗಳಾಗಿವೆ.'
                                    : 'SPORTI - Senior Police Officers Research and Training Institute was established in the year 1973 and has been successfully catering to the needs of the Police department. It was prior known as Senior Police Officer Mess and renamed to SPORTI in 2019 to enhance the quality of services being provided. Similarly, to expand the scope of services and offerings to more officers, KSRP Research and Training Institute was established in 2014 and was renamed as SPORTI-2 subsequently. This evolution reflects the institute\'s dedication to advancing knowledge and expertise in its field while adapting to meet the evolving needs of its stakeholders. Both SPORTI 1 and SPORTI 2 are all exclusive facilities for serving and retired senior police officials only.'}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h1 className="">{isKannada ? 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು' : 'Quick Links'}</h1>
                        <hr />
                        <ul>
                            <li><Link to="/services/sporti1">{isKannada ? 'ಸ್ಪೋರ್ಟಿ-1' : 'SPORTI-1'}</Link></li><hr />
                            <li><Link to="/services/sporti2">{isKannada ? 'ಸ್ಪೋರ್ಟಿ-2' : 'SPORTI-2'}</Link></li><hr />
                            {/* <li><Link to="/login">{isKannada ? 'ಲಾಗಿನ್ ಮಾಡಿ' : 'Login'}</Link></li><hr /> */}
                            <li><Link to="/events&gallery">{isKannada ? 'ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ' : 'Events & Gallery'}</Link></li><hr />
                            <li><Link to="/faqs">{isKannada ? 'FAQ ಗಳು' : 'FAQ\'s'}</Link></li><hr />
                            <li><Link to="/privacy_policy">{isKannada ? 'ಗೌಪ್ಯತಾ ನೀತಿ' : 'Privacy Policy'}</Link></li><hr />
                            <li><Link to="/terms_and-conditions">{isKannada ? 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು' : 'Terms and Conditions'}</Link></li><hr />
                            <li><Link to="/site_map">{isKannada ? 'ಸೈಟ್ ನಕ್ಷೆ' : 'Site Map'}</Link></li><hr />
                            <li><Link to="/help">{isKannada ? 'ಸಹಾಯ' : 'Help'}</Link></li><hr />
                        </ul>
                    </div>



                </div>
                <hr />
                <div className="fs-6 p-2 text-center alert alert-warning">
                    <b>{isKannada ? 'ಹಕ್ಕು ನಿರಾಕರಣೆ:' : 'Disclaimer:'}</b> 
                    {isKannada 
                        ? 'ಕರ್ನಾಟಕದ ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳಿಗೆ ಮಾತ್ರ ಸ್ಪೋರ್ಟಿ ಈವೆಂಟ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಬಹುದು' 
                        : 'SPORTI events accessible for Senior Police Officers  of Karnataka only'}
                </div>
                <div className="text-center">
                <span className="fs-6">
                &copy;{isKannada ? 'ಹಕ್ಕುಸ್ವಾಮ್ಯಗಳು' : 'Copyrights'} {new Date().getFullYear()}
                </span>

                </div>
            </section>
        </footer>
    );
}

export default Footer;
