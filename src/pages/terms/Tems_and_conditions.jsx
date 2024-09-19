import React, { useContext } from 'react';
import './style.css';
import { useLanguage } from '../../context/LangaugeContext';
import DOMPurify from 'dompurify';

function TermsAndConditions() {
  const { isKannada } = useLanguage();

  const termsContent = isKannada
  ? {
      header: 'ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು',
      intro: 'SPORTI (ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್) ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳ ಪ್ರವೇಶ ಮತ್ತು ಬಳಕೆ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಬಳಸುವುದರೊಂದಿಗೆ, ನೀವು ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳಿಗೆ ಬದ್ಧರಾಗಿರುತ್ತೀರಿ. ನೀವು ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳಿಗೆ ಒಪ್ಪಿಕೊಳ್ಳದಿದ್ದರೆ, ನೀವು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಬಳಸಲು ಅನುಮತಿಸದು.',
      accessUseHeading: '1. ಪ್ರವೇಶ ಮತ್ತು ಬಳಕೆ',
      accessUse: `1.1 ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳಿಗೆ ಪ್ರವೇಶವನ್ನು ಅನುಮೋದಿತ ವ್ಯಕ್ತಿಗಳಿಗೆ ಮಾತ್ರ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. <br />
                  1.2 ನೀವು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಪ್ರವೇಶಿಸಿ ಬಳಸುವುದರ ವೇಳೆ ಎಲ್ಲಾ ಸಂಸ್ಥೆಯ ನೀತಿಗಳು, ವಿಧಾನಗಳು, ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಪಾಲಿಸಬೇಕು. <br />
                  1.3 ನೀವು ನಿಮ್ಮ ಕ್ರಿಯೆಗಳು ಅಥವಾ ನಿವೃತ್ತಿಯಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ಹಾನಿಗಾಗಿ ಹೊಣೆಗಾರರಾಗಿರುತ್ತೀರಿ. <br />
                  1.4 ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳಿಗೆ ನಿಮ್ಮ ಪ್ರವೇಶವನ್ನು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ, ಯಾವುದೇ ಕಾರಣಕ್ಕೆ, ನಿಮ್ಮ ಪ್ರವೇಶವನ್ನು ರದ್ದುಗೊಳಿಸಲು ಅಥವಾ ತಾತ್ಕಾಲಿಕವಾಗಿ ಅಮಾನತು ಮಾಡಬಹುದು. <br />
                  1.5 ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಪಾಲಿಸುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಸೌಲಭ್ಯಗಳ ಸುರಕ್ಷತೆ ಮತ್ತು ಸರಿಯಾದ ಕಾರ್ಯನಿರ್ವಹಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ನಿಮ್ಮ ಬಳಕೆಯನ್ನು ಸಂಸ್ಥೆ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಬಹುದು. <br />
                  1.6 ನೀವು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಯಾವುದೇ ಅಕ್ರಮ ಉದ್ದೇಶಕ್ಕಾಗಿ ಅಥವಾ ಇತರರ ಹಕ್ಕುಗಳನ್ನು ಉಲ್ಲಂಘಿಸುವ ರೀತಿಯಲ್ಲಿ ಬಳಸಬಾರದು. <br />
                  1.7 ನೀವು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳು ಅಥವಾ ನೆಟ್ವರ್ಕ್‌ಗಳ ಕಾರ್ಯಾಚರಣೆಯನ್ನು ವ್ಯತ್ಯಯಗೊಳಿಸಬಾರದು. <br />
                  1.8 ನೀವು ಯಾವುದೇ ಅಹಿತಕರ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸಲು ಅಥವಾ ಯಾವುದೇ ರೂಪದ ಸ್ಪಾಮ್‌ಗಳನ್ನು ನಡೆಸಲು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಬಳಸಬಾರದು. <br />
                  1.9 ನೀವು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳು ಅಥವಾ ನೆಟ್ವರ್ಕ್‌ಗಳಿಗೆ, ಅಥವಾ ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿರುವ ಯಾವುದೇ ಇತರ ವ್ಯವಸ್ಥೆಗೆ ಅಥವಾ ನೆಟ್ವರ್ಕ್‌ಗೆ ಅನುಮೋದಿತ ಪ್ರವೇಶವನ್ನು ಪಡೆಯಲು ಪ್ರಯತ್ನಿಸಬಾರದು. <br />
                  1.10 ನೀವು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳು ಅಥವಾ ನೆಟ್ವರ್ಕ್‌ಗಳನ್ನು ಹಾನಿಗೊಳಿಸುವ, ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುವ, ಹೆಚ್ಚುಭಾರಗೊಳಿಸುವ, ಅಥವಾ ಹಾನಿಗೊಳಿಸಲು ಯಾವುದೇ ಚಟುವಟಿಕೆಯನ್ನು ನಡೆಸಲು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಬಳಸಬಾರದು.`,
      liabilityHeading: '2. ಹೊಣೆಗಾರಿಕೆ',
      liability: `2.1 ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳ ಬಳಕೆಯಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ವ್ಯಕ್ತಿ ಅಥವಾ ಆಸ್ತಿ ಸಂಬಂಧಿತ ಯಾವುದೇ ಗಾಯ, ನಷ್ಟ ಅಥವಾ ಹಾನಿಗೆ ಸಂಸ್ಥೆ ಹೊಣೆಗಾರಿಯಲ್ಲ. <br />
                  2.2 ನೀವು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳ ಬಳಕೆಯಿಂದ, ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಉಲ್ಲಂಘಿಸುವುದು, ಅಥವಾ ಯಾವುದೇ ಅನ್ವಯಕ ಕಾನೂನು ಅಥವಾ ನಿಯಮವನ್ನು ಉಲ್ಲಂಘಿಸುವುದರಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ದಾವೆ, ಬೇಡಿಕೆ, ಅಥವಾ ಹಾನಿಯಿಂದ ಸಂಸ್ಥೆಯನ್ನು ಮತ್ತು ಅದರ ಅಧಿಕಾರಿಗಳು, ನಿರ್ದೇಶಕರು, ಉದ್ಯೋಗಿಗಳು, ಏಜೆಂಟ್‌ಗಳು, ಮತ್ತು ಸಹಾಯಕರನ್ನು ಪರಿಹಾರ ಮಾಡಲು ಒಪ್ಪಿಕೊಳ್ಳುತ್ತೀರಿ. <br />
                  2.3 ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳು ಅಥವಾ ನೆಟ್ವರ್ಕ್‌ಗಳ ವ್ಯತ್ಯಾಯ ಅಥವಾ ವೈಫಲ್ಯದಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ನಷ್ಟ ಅಥವಾ ಹಾನಿಗೆ ಸಂಸ್ಥೆ ಹೊಣೆಗಾರಿಯಲ್ಲ.`,
      intellectualPropertyHeading: '3. ಬೌದ್ಧಿಕ ಆಸ್ತಿ',
      intellectualProperty: `3.1 ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳಲ್ಲಿ ಎಲ್ಲಾ ಬೌದ್ಧಿಕ ಆಸ್ತಿ ಹಕ್ಕುಗಳು, ಟ್ರೆಡ್‌ಮಾರ್ಕ್‌ಗಳು, ಕಾಪಿರೈಟ್‌ಗಳು, ಪೇಟೆಂಟ್‌ಗಳು, ಮತ್ತು ಟ್ರೇಡ್ ಸೀಕ್ರೆಟ್‌ಗಳು ಸೇರಿ, ಸಂಸ್ಥೆ ಅಥವಾ ಅದರ ಪರವಾನಿಗೆ ಪಡೆದವರಿಂದ ಹೊಂದಲಾಗಿದೆ. <br />
                            3.2 ನೀವು ಸಂಸ್ಥೆಯ ಸ್ಪಷ್ಟವಾದ ಲಿಖಿತ ಅನುಮತಿ ಇಲ್ಲದೆ ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಅಥವಾ ಅದರಲ್ಲಿ ಯಾವುದೇ ವಿಷಯವನ್ನು ವಾಣಿಜ್ಯ ಉದ್ದೇಶಕ್ಕಾಗಿ ಬಳಸಬಾರದು. <br />
                            3.3 ನೀವು ಸಂಸ್ಥೆಯ ಸ್ಪಷ್ಟವಾದ ಲಿಖಿತ ಅನುಮತಿ ಇಲ್ಲದೆ ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳನ್ನು ಅಥವಾ ಅದರಲ್ಲಿ ಯಾವುದೇ ವಿಷಯವನ್ನು ಪರಿವರ್ತಿಸಲು, ಪ್ರತಿಪಾದಿಸಲು, ಹಂಚಲು, ಪ್ರದರ್ಶಿಸಲು, ಅಥವಾ ಅದಕ್ಕಾಗಿ ಉತ್ಪನ್ನಗಳನ್ನು ರಚಿಸಲು ಅನುವಾದಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.`,
      terminationHeading: '4. ಅಂತ್ಯ',
      termination: `4.1 ಸಂಸ್ಥೆ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ, ಯಾವುದೇ ಕಾರಣಕ್ಕಾಗಿ ನಿಮ್ಮ ಸೌಲಭ್ಯಗಳ ಪ್ರವೇಶವನ್ನು ರದ್ದುಮಾಡಬಹುದು. <br />
                    4.2 ರದ್ದುಮಾಡಿದ ನಂತರ, ನೀವು ತಕ್ಷಣವೇ ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳ ಎಲ್ಲಾ ಬಳಕೆಯನ್ನು ನಿಲ್ಲಿಸಬೇಕು ಮತ್ತು ಸಂಸ್ಥೆಗೆ ಸೇರಿದ ಯಾವುದೇ ಸಾಮಗ್ರಿಗಳನ್ನು ಹಿಂತಿರುಗಿಸಬೇಕು.`,
      governingLawHeading: '5. ನಿಯಂತ್ರಕ ಕಾನೂನು',
      governingLaw: `5.1 ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಸಂಸ್ಥೆಯಿರುವ ಸ್ಥಳದ ಕಾನೂನಿಗಳೊಂದಿಗೆ ನಿಯಂತ್ರಿತವಾಗಿರುತ್ತದೆ ಮತ್ತು ವ್ಯಾಖ್ಯಾನಿಸಲಾಗುತ್ತದೆ. <br />
                     5.2 ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳ ಸಂಬಂಧ ಉಂಟಾಗುವ ಯಾವುದೇ ವಿವಾದವನ್ನು ಸಂಸ್ಥೆಯಿರುವ ಸ್ಥಳದ ನ್ಯಾಯಾಲಯಗಳಲ್ಲಿ ವಿಶೇಷವಾಗಿ ಪರಿಹರಿಸಲಾಗುತ್ತದೆ.`,
      entireAgreementHeading: '6. ಸಂಪೂರ್ಣ ಒಪ್ಪಂದ',
      entireAgreement: '6.1 ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು ಸಂಸ್ಥೆಯ ಸೌಲಭ್ಯಗಳ ಪ್ರವೇಶ ಮತ್ತು ಬಳಕೆಯ ಸಂಬಂಧಿತ ನಿಮ್ಮ ಮತ್ತು ಸಂಸ್ಥೆಯ ನಡುವಿನ ಸಂಪೂರ್ಣ ಒಪ್ಪಂದವನ್ನು ರಚಿಸುತ್ತದೆ.',
    }
  : {
      header: 'Terms and Conditions',
      intro: 'The following terms and conditions govern the access and use of the facilities of the SPORTI (the Institute). By accessing and using the Institute\'s facilities, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you may not use the Institute\'s facilities.',
      accessUseHeading: '1. Access and Use',
      accessUse: `1.1 Access to the Institute's facilities is restricted to authorized individuals only. <br />
                  1.2 You must comply with all Institute policies, procedures, and guidelines when accessing and using the Institute's facilities. <br />
                  1.3 You are responsible for any damage to the Institute's facilities caused by your actions or omissions. <br />
                  1.4 The Institute reserves the right to revoke or suspend your access to the facilities at any time, without notice and for any reason, including but not limited to violation of these terms and conditions. <br />
                  1.5 The Institute may monitor your use of the facilities to ensure compliance with these terms and conditions and to ensure the security and proper functioning of the facilities. <br />
                  1.6 You must not use the Institute's facilities for any unlawful purpose or in a manner that violates the rights of others. <br />
                  1.7 You must not interfere with or disrupt the operation of the Institute's facilities or networks. <br />
                  1.8 You must not use the Institute's facilities to send unsolicited messages or engage in any form of spamming. <br />
                  1.9 You must not attempt to gain unauthorized access to the Institute's facilities or networks, or to any other system or network connected to the Institute's facilities. <br />
                  1.10 You must not use the Institute's facilities to engage in any activity that could damage, disable, overburden, or impair the Institute's facilities or networks, or any other system or network connected to the Institute's facilities.`,
      liabilityHeading: '2. Liability',
      liability: `2.1 The Institute is not responsible for any injury, loss, or damage to any person or property resulting from the use of the Institute's facilities. <br />
                  2.2 You agree to indemnify and hold the Institute and its officers, directors, employees, agents, and affiliates harmless from any claim, demand, or damage, including reasonable attorneys' fees, arising out of your use of the Institute's facilities, your violation of these terms and conditions, or your violation of any applicable law or regulation. <br />
                  2.3 The Institute is not liable for any loss or damage arising from any interruption or failure of the Institute's facilities or networks, or any other system or network connected to the Institute's facilities.`,
      intellectualPropertyHeading: '3. Intellectual Property',
      intellectualProperty: `3.1 All intellectual property rights in the Institute's facilities, including but not limited to trademarks, copyrights, patents, and trade secrets, are owned by the Institute or its licensors. <br />
                            3.2 You may not use any of the Institute's intellectual property for commercial purposes without the Institute's prior written consent. <br />
                            3.3 You may not modify, reproduce, distribute, display, or create derivative works from any content or materials provided through the Institute's facilities without the Institute's prior written consent.`,
      terminationHeading: '4. Termination',
      termination: `4.1 The Institute may terminate your access to the facilities at any time, for any reason. <br />
                    4.2 Upon termination, you must immediately cease all use of the Institute's facilities and return any materials or property belonging to the Institute.`,
      governingLawHeading: '5. Governing Law',
      governingLaw: `5.1 These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the Institute is located. <br />
                     5.2 Any disputes arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of the jurisdiction in which the Institute is located.`,
      entireAgreementHeading: '6. Entire Agreement',
      entireAgreement: '6.1 These terms and conditions constitute the entire agreement between you and the Institute with respect to the subject matter hereof and supersede all prior agreements and understandings, whether written or oral, relating to such subject matter.',
    };

    const sanitizedContent = {
      intro: DOMPurify.sanitize(termsContent.intro),
      accessUse: DOMPurify.sanitize(termsContent.accessUse),
      liability: DOMPurify.sanitize(termsContent.liability),
      intellectualProperty: DOMPurify.sanitize(termsContent.intellectualProperty),
      termination: DOMPurify.sanitize(termsContent.termination),
      governingLaw: DOMPurify.sanitize(termsContent.governingLaw),
      entireAgreement: DOMPurify.sanitize(termsContent.entireAgreement),
    };
  
    return (
      <div className="container">
        <h2 className="header">{termsContent.header}</h2>
        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent.intro }} />
          <h4>{termsContent.accessUseHeading}</h4>
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent.accessUse }} />
          <h4>{termsContent.liabilityHeading}</h4>
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent.liability }} />
          <h4>{termsContent.intellectualPropertyHeading}</h4>
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent.intellectualProperty }} />
          <h4>{termsContent.terminationHeading}</h4>
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent.termination }} />
          <h4>{termsContent.governingLawHeading}</h4>
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent.governingLaw }} />
          <h4>{termsContent.entireAgreementHeading}</h4>
          <p dangerouslySetInnerHTML={{ __html: sanitizedContent.entireAgreement }} />
        </div>
      </div>
    );
  }
  
  export default TermsAndConditions;