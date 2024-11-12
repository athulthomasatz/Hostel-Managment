import React from 'react';
import Navbar from './Navbar';
import styles from './contactAndMore.module.css';

const ContactAndMore = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Contact & More Information</h1>
        
        <section className={styles.contactSection}>
          <h2>Contact Us</h2>
          <p>If you have any questions or concerns, please don't hesitate to reach out to us:</p>
          <ul>
            <li>Email: info@hostelmanagementsystem.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 University Street, Cityville, State 12345</li>
          </ul>
        </section>
        
        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqItem}>
            <h3>What are the check-in and check-out times?</h3>
            <p>Check-in time is 2:00 PM and check-out time is 11:00 AM.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Is Wi-Fi available in the hostel?</h3>
            <p>Yes, we provide free Wi-Fi access to all our residents.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>Are meals included in the hostel fee?</h3>
            <p>No, meals are not included in the standard hostel fee. However, we have a cafeteria on-site where you can purchase meals.</p>
          </div>
        </section>
        
        <section className={styles.rulesSection}>
          <h2>Hostel Rules</h2>
          <ul>
            <li>Quiet hours are from 10:00 PM to 6:00 AM.</li>
            <li>No smoking is allowed inside the building.</li>
            <li>Guests must be signed in at the front desk.</li>
            <li>Keep common areas clean and tidy.</li>
            <li>Report any maintenance issues promptly.</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default ContactAndMore; 