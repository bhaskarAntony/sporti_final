import React from 'react';
import './style.css';
import { useLanguage } from '../../context/LangaugeContext';

function Privacy() {
    const { isKannada } = useLanguage();

    const privacyPolicyText = {
        en: {
            collectionOfInformation: 'Collection of Information:',
            useOfInformation: 'Use of Information:',
            dataRetention: 'Data Retention:',
            dataSecurity: 'Data Security:',
            userRights: 'User Rights:',
            cookiesAndTracking: 'Cookies and Tracking Technologies:',
            thirdPartyLinks: 'Third-Party Links:',
            childrensPrivacy: "Children's Privacy:",
            changesToPrivacyPolicy: 'Changes to the Privacy Policy:',
            contactInformation: 'Contact Information:',
            privacyPolicyContent: [
                {
                    title: 'Collection of Information:',
                    content: 'We may collect personal information from users, including but not limited to names, email addresses, phone numbers, and browsing data, when users voluntarily provide this information through forms on our website or through other means such as cookies or tracking technologies.'
                },
                {
                    title: 'Use of Information:',
                    content: 'We may use the collected information to provide services, improve our products, communicate with users, and for marketing purposes. We may also share the information with trusted third parties who assist us in operating our website or providing services to users.'
                },
                {
                    title: 'Data Retention:',
                    content: 'We will retain the collected information for as long as necessary to fulfill the purposes for which it was collected or as required by law. Users can request the deletion of their information by contacting us using the contact information provided below.'
                },
                {
                    title: 'Data Security:',
                    content: 'We implement appropriate technical and organizational measures to protect the collected information from unauthorized access, loss, or misuse. However, please note that no method of data transmission over the internet or electronic storage is completely secure and we cannot guarantee absolute security.'
                },
                {
                    title: 'User Rights:',
                    content: 'Users have the right to access, correct, or delete their personal information. Users can also request information about the types of personal information we have collected and the purposes for which it has been used. Requests can be made using the contact information provided below.'
                },
                {
                    title: 'Cookies and Tracking Technologies:',
                    content: 'We may use cookies, web beacons, and other tracking technologies to collect information about users\' browsing behavior, preferences, and usage patterns. Users can manage their cookie preferences through their browser settings.'
                },
                {
                    title: 'Third-Party Links:',
                    content: 'Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third parties. We encourage users to review the privacy policies of any third-party websites or services they visit.'
                },
                {
                    title: "Children's Privacy:",
                    content: 'Our website is not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete it as soon as possible.'
                },
                {
                    title: 'Changes to the Privacy Policy:',
                    content: 'We may update or revise this Privacy Policy from time to time, and any changes will be posted on our website. Users are encouraged to review the Privacy Policy periodically for any updates or changes.'
                },
                {
                    title: 'Contact Information:',
                    content: 'If users have any questions, concerns, or requests regarding their privacy or this Privacy Policy, they can contact us at mobile: +91 8277945903, Email: sportikarnataka@gmail.com'
                }
            ]
        },
        kn: {
            collectionOfInformation: 'ಮಾಹಿತಿಯ ಸಂಗ್ರಹ:',
            useOfInformation: 'ಮಾಹಿತಿಯ ಬಳಕೆ:',
            dataRetention: 'ಡೇಟಾ ಉಳಿಸುವಿಕೆ:',
            dataSecurity: 'ಡೇಟಾ ಭದ್ರತೆ:',
            userRights: 'ಬಳಕೆದಾರರ ಹಕ್ಕುಗಳು:',
            cookiesAndTracking: 'ಕುಕೀಗಳು ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್ ತಂತ್ರಗಳು:',
            thirdPartyLinks: 'ಮೂರ್ತಿಯ ಲಿಂಕ್‌ಗಳು:',
            childrensPrivacy: 'ಮಕ್ಕಳ ಗೌಪ್ಯತೆ:',
            changesToPrivacyPolicy: 'ಗೌಪ್ಯತೆ ನೀತಿಯ ಬದಲಾವಣೆಗಳು:',
            contactInformation: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ:',
            privacyPolicyContent: [
                {
                    title: 'ಮಾಹಿತಿಯ ಸಂಗ್ರಹ:',
                    content: 'ಬಳಕೆದಾರರು ತಮ್ಮ ಹೆಸರು, ಇಮೇಲ್ ವಿಳಾಸಗಳು, ಫೋನ್ ಸಂಖ್ಯೆಗಳು, ಬ್ರೌಜಿಂಗ್ ಡೇಟಾ ಹಾಗೂ ಇತರ ಹಾರಾಟುಗಳ ಮೂಲಕ ಈ ಮಾಹಿತಿಯನ್ನು ಸ್ವಂತವಾಗಿ ನಮೂದಿಸುವ ಹಾಗೂ ಫಾರ್ಮ್‌ಗಳ ಮೂಲಕ ಅಥವಾ ಕುಕೀಗಳು ಅಥವಾ ಟ್ರ್ಯಾಕಿಂಗ್ ತಂತ್ರಗಳ ಮೂಲಕ ನೀಡಲಾಗಿದೆ.'
                },
                {
                    title: 'ಮಾಹಿತಿಯ ಬಳಕೆ:',
                    content: 'ನಾವು ಸಂಗ್ರಹಿಸಿದ ಮಾಹಿತಿಯನ್ನು ಸೇವೆಗಳ ಒದಗಿಸಲು, ನಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ಮೆರವಣಿಗೆಗೆ ಮತ್ತು ಬಳಕೆದಾರರೊಂದಿಗೆ ಸಂವಾದ ನಡೆಸಲು ಬಳಸುತ್ತೇವೆ. ನಾವು ನಂಬಿಕೆಯಿಂದ ಮೂಲಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಒದಗಿಸುವ ನಿಟ್ಟಿನಲ್ಲಿ ಮಾಹಿತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದು.'
                },
                {
                    title: 'ಡೇಟಾ ಉಳಿಸುವಿಕೆ:',
                    content: 'ನಾವು ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಲು ಅಗತ್ಯವಿರುವ ಕಾಲದವರೆಗೂ ಅಥವಾ ಕಾನೂನು ಅಗತ್ಯದಂತೆ ಡೇಟಾವನ್ನು ಉಳಿಸಲಿರುವಂತೆ. ಬಳಕೆದಾರರು ತಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಅಳಿಸಲು ಕೆಳಗಿನ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಬಳಸುವ ಮೂಲಕ ನಮಗೆ ಹೇಳಿದ್ದಾರೆ.'
                },
                {
                    title: 'ಡೇಟಾ ಭದ್ರತೆ:',
                    content: 'ಅನಧಿಕೃತ ಪ್ರವೇಶ, ಹಾನಿ ಅಥವಾ ದುರ್ವಾಸನೆಯಿಂದ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಿದ ಬೀಗತಂತ್ರಗಳನ್ನು ಪೂರ್ವಿಕ ತಾಂತ್ರಿಕ ಮತ್ತು ಸಂಘಟನಾ ಕಾರ್ಯನಿರ್ವಹಣೆ ಅನ್ನು ಅಳವಡಿಸುತ್ತೇವೆ. ಆದರೆ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಇಂಟರ್ನೆಟ್ ಮೇಲೆ ಡೇಟಾ ಸಂಚರಣೆಯ ಯಾವುದೇ ವಿಧವಾದ ತಂತ್ರವು ಸಂಪೂರ್ಣವಾಗಿ ಭದ್ರವಾಗಿಲ್ಲ ಮತ್ತು ನಾವು ಸಂಪೂರ್ಣ ಭದ್ರತೆಯನ್ನು ಖಚಿತಪಡಿಸಲಾಗುವುದಿಲ್ಲ.'
                },
                {
                    title: 'ಬಳಕೆದಾರರ ಹಕ್ಕುಗಳು:',
                    content: 'ಬಳಕೆದಾರರಿಗೆ ತಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಲು, ಸರಿಪಡಿಸಲು ಅಥವಾ ಅದನ್ನು ಅಳಿಸಲು ಹಕ್ಕುಗಳಿವೆ. ಬಳಕೆದಾರರು ಯಾವ ಪ್ರಕಾರದ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ನಾವು ಸಂಗ್ರಹಿಸಿದ್ದೇವೆ ಮತ್ತು ಅದು ಬಳಸಲಾಗಿದೆ ಎಂದು ಪ್ರಕಟಿಸಲು ಅವರು ವಿನಂತಿ ಮಾಡಬಹುದು. ಕೆಳಗಿನ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಬಳಸಿ ವಿನಂತಿ ಮಾಡಬಹುದು.'
                },
                {
                    title: 'ಕುಕೀಗಳು ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್ ತಂತ್ರಗಳು:',
                    content: 'ಬಳಕೆದಾರರ ಬ್ರೌಜಿಂಗ್ ವರ್ತನೆ, ಆದಾಗಲೇ ನಮಗೆ ಗೊತ್ತಾಗಿರುವ ಪ್ರಾಥಮಿಕ ಮಾಹಿತಿ ಮತ್ತು ಬಳಕೆದಾರರ ಬ್ರೌಜಿಂಗ್ ಪಟ್ಟಿಗಳನ್ನು ಸಂಗ್ರಹಿಸಲು ಕುಕೀಗಳು, ವೆಬ್ ಬೀಕನ್ಸ್ ಮತ್ತು ಇತರ ಟ್ರ್ಯಾಕಿಂಗ್ ತಂತ್ರಗಳನ್ನು ಬಳಸಬಹುದು. ಬಳಕೆದಾರರು ತಮ್ಮ ಕುಕೀ ಇಷ್ಟಾಂತಿನಲ್ಲಿ ಅನುಸ್ಥಾಪನೆಯನ್ನು ಮೇಲೆಮಾಡಬಹುದು.'
                },
                {
                    title: 'ಮೂರ್ತಿಯ ಲಿಂಕ್‌ಗಳು:',
                    content: 'ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಮೂರ್ತಿಯ ವೆಬ್‌ಸೈಟ್ ಅಥವಾ ಸೇವೆಗಳ ಲಿಂಕ್‌ಗಳನ್ನು ಹೊಂದಿದೆ. ನಾವು ಆ ಮೂರ್ತಿಯ ವಿಧಾನಗಳ ಗೌಪ್ಯತೆ ಪದ್ಧತಿಗಳನ್ನು ಹೊಂದಿಲ್ಲ. ಬಳಕೆದಾರರು ಅವರು ಭೇಟಿಯಾಗುವ ಯಾವುದೇ ಮೂರ್ತಿಯ ವೆಬ್‌ಸೈಟ್‌ಗಳ ಅಥವಾ ಸೇವೆಗಳ ಗೌಪ್ಯತೆ ನೀತಿಗಳನ್ನು ಸಮೀಕ್ಷಿಸುವುದನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತೇವೆ.'
                },
                {
                    title: 'ಮಕ್ಕಳ ಗೌಪ್ಯತೆ:',
                    content: 'ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಹದಿನೆಂಟು ವಯಸ್ಸಿನ ಹೆಚ್ಚಿನ ಮಕ್ಕಳಿಗೆ ಉದ್ದೇಶಿತವಾಗಿದೆ ಮತ್ತು ನಾವು ಅಜ್ಞಾತವಾಗಿ ಮಕ್ಕಳಿಂದ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಬಹುದು. ನಾವು ಆ ಮಕ್ಕಳಿಂದ ಅಜ್ಞಾತವಾಗಿ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಿದರೆ, ಅದನ್ನು ಬೇಗನೆ ಅಳಿಸಲು ಹೆಚ್ಚು ಹೆಚ್ಚು ಹಂಚಿಕೊಳ್ಳುವುದಕ್ಕೆ ಹೆಚ್ಚು ಹೆಚ್ಚು ಕದರಿಸಲು ನಾವು ಹೆಚ್ಚು ಕರವಂತಿಯಾಗಿರುತ್ತೇವೆ.'
                },
                {
                    title: 'ಗೌಪ್ಯತೆ ನೀತಿಯ ಬದಲಾವಣೆಗಳು:',
                    content: 'ನಾವು ಸಮಯಕ್ಕಾಗಿ ಕೊಂಡಾಡಲು ಈ ಗೌಪ್ಯತೆ ನೀತಿಯನ್ನು ನವೀಕರಿಸಲು ಅಥವಾ ಸರಿಪಡಿಸಲು ಅಥವಾ ಅದನ್ನು ಮೆರೆಸಲು ಹೊಸ ಮಾಹಿತಿಯನ್ನು ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪೋಸ್ಟ್ ಮಾಡಲಾಗುತ್ತದೆ. ಬಳಕೆದಾರರು ಯಾವುದೇ ಅಪ್‌ಡೇಟ್‌ಗಳು ಅಥವಾ ಬದಲಾವಣೆಗಳ ನಿಮಾತೆಗೆ ಗೌಪ್ಯತೆ ನೀತಿಯನ್ನು ಪ್ರಕ್ಟಾಯಿಸಲು ಹೊಂದಲಿಕ್ಕಾಗಿ ಅಭಿವೃದ್ಧಿ ಮಾಡಲಾಗುತ್ತದೆ.'
                },
                {
                    title: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ:',
                    content: `ಬಳಕೆದಾರರು ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು, ಆತಂಕಗಳು, ಅಥವಾ ಅವರ ಗೌಪ್ಯತೆ ಅಥವಾ ಈ ಗೌಪ್ಯತೆ ನೀತಿಯ ಬಗ್ಗೆ ಯಾವುದೇ ವಿನಂತಿಗಳಿಗೆ ಸಂಪರ್ಕ ಮಾಡಬಹುದು <br /> <br /> mobile : <a href="tel:+91 8277945903" className='nav-link text-primary'>+91 8277945903</a> <br />  Email : <a href="mailto:sportikarnataka@gmail.com" className='nav-link text-primary'>sportikarnataka@gmail.com</a></p>`
                }
            ]
        }
    };

    const renderPrivacyContent = () => {
        const content = privacyPolicyText[isKannada ? 'kn' : 'en'];

        return (
            <>
                <div className='privacy'>
                    <div className="contact-banner about-banner">
                        <div className="skew-container">
                            <div className="skew-left">
                                <h1 className="fs-2 fw-bold">{isKannada ? 'ಗೌಪ್ಯತೆ ನೀತಿ' : 'Privacy Policy'}</h1>
                            </div>
                            <div className="skew-right d-flex align-items-center">
                                <h1 className="fs-2 fw-bold"></h1>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 p-md-5">
                        {content.privacyPolicyContent.map((section, index) => (
                            <div key={index}>
                                <h2 className="fs-4 fw-bold">{section.title}</h2>
                                <p className="fs-6 text-secondary">{section.content}</p>
                                <br />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };
    

    return renderPrivacyContent();
}

export default Privacy;
