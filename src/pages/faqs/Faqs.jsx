import React from 'react';
import './style.css';
import faqs from '../../data/faqs';
import Feedback from '../../components/feedback/Feedback';
import { useLanguage } from '../../context/LangaugeContext';

function Faqs() {
  const { isKannada } = useLanguage();

  return (
    <div>
      <div className="faqs-page">
        <div className="contact-banner">
          <div className="skew-container">
            <div className="skew-left">
            <h1 className="fs-2 fw-bold">
          {isKannada ? 'ಪ್ರಶ್ನೆಗಳು' : 'FAQ\'s'}
        </h1>

            </div>
            <div className="skew-right d-flex align-items-center">
              <h1 className="fs-2 fw-bold"></h1>
            </div>
          </div>
        </div>

        <div className="container p-3">
          <div className="accordion" id="accordionExample">
            {faqs.map((item, index) => (
              <div key={index}>
                <div className="accordion-item h-100 mb-3">
                  <h2 className="accordion-header h-100">
                    <button
                      className="accordion-button h-100"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${index}`}
                      aria-expanded="true"
                      aria-controls={`collapse-${index}`}
                    >
                      {isKannada ? item.question_ka : item.question_en}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {Array.isArray(isKannada ? item.answer_ka : item.answer_en) ? (
                        (isKannada ? item.answer_ka : item.answer_en).map((subItem, subIndex) => (
                          <div key={subIndex}>
                            <h4>{subItem.SPORTI}</h4>
                            {subItem.description && <p>{subItem.description}</p>}
                            <p>{subItem.contact_number}</p>
                            <p><a href={`mailto:${subItem.email}`}>{subItem.email}</a></p>
                          </div>
                        ))
                      ) : (
                        <p>{isKannada ? item.answer_ka : item.answer_en}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="feedback text-center p-3">
          <i className="bi bi-stars fs-2 text-warning"></i>
          <h1 className="fs-2 fw-bold">{isKannada ? 'ನಮಗೆ ಬರೆಯಿರಿ' : 'WRITE TO US'}</h1>
          <span className="fs-6 subtitle d-block text-center">{isKannada ? 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಲು ಮುಕ್ತವಾಗಿ ಕಳುಹಿಸಿ' : 'FEEL FREE TO SEND US A MESSAGE'}</span>
        </div> */}

        {/* <Feedback /> */}
      </div>
    </div>
  );
}

export default Faqs;
