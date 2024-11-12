import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Modal from '../../components/Modal';
import styles from './payment.module.css';

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        amount: '',
        paymentMethod: 'upi'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
    }, []);

    // Timer effect
    useEffect(() => {
        let timer;
        if (isModalOpen && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsModalOpen(false);
            setTimeLeft(300); // Reset timer
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isModalOpen, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const fetchUserDetails = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/api/profile', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (!response.ok) throw new Error('Failed to fetch user details');
            const data = await response.json();
            setUserDetails(data);
            if (data.bookingDetails) {
                setPaymentDetails(prev => ({
                    ...prev,
                    amount: data.bookingDetails.feesPerSemester
                }));
            }
        } catch (error) {
            setError('Error loading user details');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTimeLeft(300); // Reset timer
        setIsModalOpen(true);
        setLoading(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeLeft(300); // Reset timer when modal is closed manually
    };

    if (!userDetails?.bookingDetails) {
        return (
            <div className={styles.container}>
                <div className={styles.noBookingMessage}>
                    No active booking found. Please book a room first.
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <BackButton />
            <div className={styles.paymentCard}>
                <div className={styles.cardHeader}>
                    <h2>Payment Details</h2>
                    <p>Complete your semester fee payment</p>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.amountSection}>
                        <h3>Payment Summary</h3>
                        <div className={styles.amountDetails}>
                            <span>Semester Fee:</span>
                            <span>₹{paymentDetails.amount}</span>
                        </div>
                    </div>

                    <div className={styles.paymentInfo}>
                        <p>Payment Method: UPI</p>
                        <p>Click "Pay Now" to scan QR code</p>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.payButton}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : `Pay Now ₹${paymentDetails.amount}`}
                    </button>
                </form>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className={styles.modalContent}>
                    <h2>UPI Payment</h2>
                    <div className={styles.qrCodeContainer}>
                        <img 
                            src="/qrpayment.png"
                            alt="UPI QR Code"
                            className={styles.qrCode}
                        />
                    </div>
                    <div className={styles.upiDetails}>
                        <p>UPI ID: your-upi@bank</p>
                        <p>Amount: ₹{paymentDetails.amount}</p>
                        <div className={styles.timerNote}>
                            Window closes in {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Payment;