import React from 'react';
import './style.css';
import sitemapdata from '../../data/sitemap';
import { useLanguage } from '../../context/LangaugeContext';

function SiteMap() {
    const { isKannada } = useLanguage();

    return (
        <div className='sitemap'>
            <div className="contact-banner about-banner">
                <div className="skew-container">
                    <div className="skew-left">
                        <h1 className="fs-2 fw-bold">Sitemap</h1>
                    </div>
                    <div className="skew-right d-flex align-items-center">
                        <h1 className="fs-2 fw-bold"></h1>
                    </div>
                </div>
            </div>

            <div className="help-table p-3 p-md-5">
                <table className='table striped'>
                    <thead>
                        <tr>
                            <th>Document Type</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sitemapdata.map((item, index) => (
                                <tr key={index}>
                                    <td className='lead'>{isKannada ? item.kn_title : item.en_title}</td>
                                    <td>
                                        <a href={item.link} className="lead bg-transparent d-block">
                                            {isKannada ? `ಬೇಟಿ ${item.kn_title}` : `Visit ${item.en_title}`}
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SiteMap;
