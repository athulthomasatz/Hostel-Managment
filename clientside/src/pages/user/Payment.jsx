import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import styles from './payment.module.css';

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        amount: '',
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserDetails();
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Here you would integrate with your payment gateway
            const response = await fetch('http://localhost:5000/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(paymentDetails)
            });

            if (!response.ok) throw new Error('Payment failed');

            // On successful payment
            navigate('/payment-success');
        } catch (error) {
            setError('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
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

                    <div className={styles.formGroup}>
                        <label htmlFor="paymentMethod">Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={paymentDetails.paymentMethod}
                            onChange={handleChange}
                            className={styles.select}
                        >
                            <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="netbanking">Net Banking</option>
                        </select>
                    </div>

                    {paymentDetails.paymentMethod === 'card' && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="nameOnCard">Name on Card</label>
                                <input
                                    type="text"
                                    id="nameOnCard"
                                    name="nameOnCard"
                                    value={paymentDetails.nameOnCard}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="cardNumber">Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handleChange}
                                    maxLength="16"
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="expiryDate">Expiry Date</label>
                                    <input
                                        type="text"
                                        id="expiryDate"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        value={paymentDetails.expiryDate}
                                        onChange={handleChange}
                                        maxLength="5"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="password"
                                        id="cvv"
                                        name="cvv"
                                        value={paymentDetails.cvv}
                                        onChange={handleChange}
                                        maxLength="3"
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <button 
                        type="submit" 
                        className={styles.payButton}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : `Pay ₹${paymentDetails.amount}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment; 