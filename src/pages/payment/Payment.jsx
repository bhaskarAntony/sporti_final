import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../components/popups/DialogContext';
import Loading from '../../components/popups/Loading';
import { useLanguage } from '../../context/LangaugeContext';

const translations = {
    en: {
        title: 'SPORTI service booking details',
        description: 'Your booking request has been sent. It usually takes less than 24 hours to review the request. SMS will be sent to registered mobile number regarding booking details.',
        username: 'Username',
        email: 'Email',
        service: 'Service',
        totalAmount: 'Total Amount',
        noteTitle: 'Note',
        noteContent: 'You can pay money through online or offline once the admin confirms your service request. Once confirmed, you will get an SMS message. If you have already received an SMS, your application has been verified and you can pay the money. If not, please visit later and check your application status using your application number. If your application is rejected, you will also receive an SMS notification. This process will happen within 24 working hours. For further information, please contact the SPORTI team.',
        goBack: 'Go back to home',
    },
    kn: {
        title: 'SPORTI ಸೇವೆ ಬುಕ್ಕಿಂಗ್ ವಿವರಗಳು',
        description: 'ನಿಮ್ಮ ಬುಕ್ಕಿಂಗ್ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಲಾಗಿದೆ. ವಿನಂತಿಯನ್ನು ವಿಮರ್ಶಿಸಲು ಸಾಮಾನ್ಯವಾಗಿ 24 ಗಂಟೆಗಳಿಗೆ ಕಡಿಮೆ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ. ಬುಕ್ಕಿಂಗ್ ವಿವರಗಳನ್ನು ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ SMS ಕಳುಹಿಸಲಾಗುವುದು.',
        username: 'ಬಳಕೆದಾರ ಹೆಸರು',
        email: 'ಇಮೇಲ್',
        service: 'ಸೇವೆ',
        totalAmount: 'ಒಟ್ಟು ಮೊತ್ತ',
        noteTitle: 'ಸೂಚನೆ',
        noteContent: 'ನಿಮ್ಮ ಸೇವಾ ವಿನಂತಿಯನ್ನು ಆಡಳಿತಗಾರರು ದೃಢೀಕರಿಸಿದ ನಂತರ ನೀವು ಹಣವನ್ನು ಆನ್‌ಲೈನ್ ಅಥವಾ ಆಫ್‌ಲೈನ್ ಮೂಲಕ ಪಾವತಿಸಬಹುದು. ದೃಢೀಕರಣವಾದ ನಂತರ, ನೀವು SMS ಸಂದೇಶವನ್ನು ಪಡೆಯುತ್ತೀರಿ. ನೀವು SMS ಅನ್ನು ಈಗಾಗಲೇ ಪಡೆದಿದ್ದರೆ, ನಿಮ್ಮ ಅರ್ಜಿ ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟಿದೆ ಮತ್ತು ನೀವು ಹಣವನ್ನು ಪಾವತಿಸಬಹುದು. ಇಲ್ಲದಿದ್ದರೆ, ದಯವಿಟ್ಟು ನಂತರ ಭೇಟಿ ನೀಡಿ ಮತ್ತು ನಿಮ್ಮ ಅರ್ಜಿ ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಿಕೊಂಡು ನಿಮ್ಮ ಅರ್ಜಿ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ. ನಿಮ್ಮ ಅರ್ಜಿಯನ್ನು ತಿರಸ್ಕರಿಸಿದರೆ, ನಿಮಗೆ SMS ಅಧಿಸೂಚನೆಯನ್ನು ಸಹ ಪಡೆಯುತ್ತೀರಿ. ಈ ಪ್ರಕ್ರಿಯೆ 24 ಕೆಲಸದ ಗಂಟೆಗಳ ಒಳಗೆ ಸಂಭವಿಸುತ್ತದೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ, ದಯವಿಟ್ಟು SPORTI ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.',
        goBack: 'ಮನೆಗೆ ಹಿಂತಿರುಗಿ',
    }
};

const Payment = () => {
    const { applicationNo } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isKannada } = useLanguage() // Assuming 'language' is 'en' or 'kn'
    var t = {}
    if(isKannada){
       t =  translations['kn']
    }else{
        t= translations['en'] 
    }
    const { openDialog } = useDialog();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch booking data
        axios.get(`https://sporti-backend-live-3.onrender.com/api/sporti/service/booking/${applicationNo}`)
            .then(response => {
                setBooking(response.data.booking);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [applicationNo]);

    const generateHash512 = (text) => {
        const hash = CryptoJS.SHA512(text);
        return hash.toString(CryptoJS.enc.Hex);
    };

    const createPaymentForm = () => {
        if (!booking) return;

        const requestData = {
            K1USRID: 'K1SPOTIUSER',
            K1PWD: '39d16932b27ba15a4c77fd09f8817b2dbce0089dfd45b602fdad8881127002560c5249a77c9dce96fc88a035a1393553ca80f1196b2f89a27b701525533fc55c',
            Name: booking.username,
            AppNo: booking.applicationNo,
            Email: booking.email,
            Phone: booking.phoneNumber,
            ProductInfo: booking.serviceName,
            AmountPaid: booking.totalCost,
            DeptAccountCode:"SPORTI1"
        };

        const requestDataString = `K1USRID=${requestData.K1USRID}|K1PWD=${requestData.K1PWD}|Name=${requestData.Name}|AppNo=${requestData.AppNo}|Phone=${requestData.Phone}|Email=${requestData.Email}|ProductInfo=${requestData.ProductInfo}|AmountPaid=${requestData.AmountPaid}|DeptAccountCode=${requestData.DeptAccountCode} `;
        console.log(requestDataString);
        
        
        
        const checksum = generateHash512(requestDataString);
        console.log(checksum);
        const formValue = `${requestDataString}|CheckSum=${checksum}|ReturnURL=https://www.sporti.ksp.gov.in/payment/success/${booking.applicationNo}`;

        console.log(formValue);
        

        const form = document.createElement('form');
        form.id = 'FormPost';
        form.method = 'post';
        form.action = 'https://koneportal.cmsuat.co.in:1443/SPORTI/Index/UXhBakNVanVwTFRWM3IremdWSjV5dz09';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.id = 'SPORTIFormData';
        input.name = 'SPORTIFormData';
        input.value = formValue;
        form.appendChild(input);

        document.body.appendChild(form);
        if (booking.status != 'pending' || booking.status != 'rejected') {
            // form.submit();
            localStorage.setItem('applicationNo', booking.applicationNo)
        } else {
            openDialog('Error', t.description, true);
        }
    };

    const OfflinePay = () => {
        openDialog('success', 'You can pay the payment offline.');
        navigate('/');
    };

    if (loading) return <Loading />;
    if (error) return <p>{openDialog('Error', 'Something went wrong. Please refresh the page to try again.', true)}</p>;

    return (
        <div className='p-2 p-md-4 payment'>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card border-0 rounded-0 w-100 p-0">
                        <div className="bg-main p-3 text-center">
                            <h1 className='fs-3 text-light'>{t.title}</h1>
                            <p className="fs-6 text-light text-center">{t.description}</p>
                        </div>
                        <div className="p-3">
                            <ul className="list-group rounded-1">
                                <li className="list-group-item"><p className='fs-5'><b>{t.username}:</b> {booking.username}</p></li>
                                <li className="list-group-item"><p className='fs-5'><b>{t.email}:</b> {booking.email}</p></li>
                                <li className="list-group-item"><p className='fs-5'><b>{t.service}:</b> {booking.serviceName}</p></li>
                                <li className="list-group-item"><p className='fs-5'><b>{t.totalAmount}</b> {booking.totalCost}</p></li>
                            </ul>
                        </div>
                        <div className="d-flex gap-3 flex-nowrap justify-content-end p-2">
                            <button className='btn btn-success rounded-1 m-1' onClick={createPaymentForm}>Pay</button>
                            <Link to="/" className='btn btn-danger rounded-1 m-1'>{t.goBack}</Link>
                        </div>
                        <div className="bg-main text-light p-3">
                            <p className="fs-5 text-center">{t.noteTitle}</p>
                            <p className="fs-6 text-center">{t.noteContent}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
