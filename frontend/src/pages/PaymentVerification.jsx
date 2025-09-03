import React, { useState, useCallback, useRef } from 'react';
import api from '../api/api';
import { CLASS_LEVELS, SECTIONS } from '../constants/AdminConstants';

// Helper function to safely render properties that might be objects with { _id, name }
const renderSafeString = (value) => {
    if (typeof value === 'object' && value !== null && (
      Object.prototype.hasOwnProperty.call(value, '_id') ||
      Object.prototype.hasOwnProperty.call(value, 'name') ||
      Object.prototype.hasOwnProperty.call(value, 'fullName') ||
      Object.prototype.hasOwnProperty.call(value, 'subjectName') ||
      Object.prototype.hasOwnProperty.call(value, 'title') ||
      Object.prototype.hasOwnProperty.call(value, 'studentId')
    )) {
      return value.name || value.fullName || value.subjectName || value.title || value.studentId || 'N/A';
    }
    return value || 'N/A';
  };

const getUniqueSectionsForClassLevel = (users, classLevel) => {
    return SECTIONS.filter(section => {
      return users.some(user => user.classLevel === classLevel && (user.section === section || (user.section === 'senior' && section === 'Senior') || (user.section === 'junior' && section === 'Junior')));
    }).sort();
  };

function PaymentVerification({ setGlobalFeedback, setGlobalError, authUser }) {
  const [paymentSearchTerm, setPaymentSearchTerm] = useState('');
  const [selectedPaymentSearchClassLevel, setSelectedPaymentSearchClassLevel] = useState('');
  const [selectedPaymentSearchSubClassLevel, setSelectedPaymentSearchSubClassLevel] = useState('');
  const [availablePaymentSearchSubClassLevels, setAvailablePaymentSearchSubClassLevels] = useState([]);
  const [foundPayment, setFoundPayment] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [paymentSearchLoading, setPaymentSearchLoading] = useState(false);
  const receiptRef = useRef();
  const statementRef = useRef();

  const handlePrintSingleReceipt = useCallback(() => {
    if (receiptRef.current) {
      document.body.classList.add('printing-active');
      receiptRef.current.classList.add('show-for-print');
      window.print();
      setTimeout(() => {
        receiptRef.current.classList.remove('show-for-print');
        document.body.classList.remove('printing-active');
      }, 500);
    }
  }, []);

  const handlePrintStatement = useCallback(() => {
    if (statementRef.current) {
      document.body.classList.add('printing-active');
      statementRef.current.classList.add('show-for-print');
      window.print();
      setTimeout(() => {
        statementRef.current.classList.remove('show-for-print');
        document.body.classList.remove('printing-active');
      }, 500);
    }
  }, []);

  const updatePaymentStatus = async (paymentId, newStatus) => {
    setGlobalError('');
    setGlobalFeedback('');
    try {
      const response = await api.put(`/payments/${paymentId}/status`, {
        status: newStatus,
        adminNotes: `Payment confirmed by ${authUser.role} (${authUser.fullName})`
      });
      const updatedPayment = response.data.payment;
      if (foundPayment && foundPayment._id === updatedPayment._id) {
        setFoundPayment(updatedPayment);
      }
      setFilteredPayments(prev => prev.map(p =>
        p._id === updatedPayment._id ? updatedPayment : p
      ));
      if (newStatus === 'successful') {
        setGlobalFeedback('Payment status updated to SUCCESSFUL! Preparing receipt...');
        setFoundPayment(updatedPayment);
        setTimeout(() => {
          handlePrintSingleReceipt();
        }, 100);
      } else {
        setGlobalFeedback(`Payment status updated to ${newStatus.toUpperCase()}.`);
      }
    } catch (err) {
      setGlobalError(err.response?.data?.message || `Failed to update payment status to ${newStatus}.`);
      console.error('Update payment status error:', err.response?.data || err.message);
    }
  };

  const handlePaymentSearch = async (e) => {
    e.preventDefault();
    setPaymentSearchLoading(true);
    setGlobalError('');
    setFoundPayment(null);
    setFilteredPayments([]);
    setGlobalFeedback('');
    const isTermSearch = paymentSearchTerm.trim() !== '';
    const isFilterSearch = selectedPaymentSearchClassLevel !== '' || selectedPaymentSearchSubClassLevel !== '';
    if (!isTermSearch && !isFilterSearch) {
      setGlobalError('Please enter a Student ID/Payment Code OR select a Class Level/Section to search.');
      setPaymentSearchLoading(false);
      return;
    }
    try {
      let paymentsToSet = [];
      if (isTermSearch && !isFilterSearch) {
        const response = await api.get(`/payments/search?term=${encodeURIComponent(paymentSearchTerm.trim())}`);
        if (response.data && response.data.payment) {
          setFoundPayment(response.data.payment);
          paymentsToSet = [];
          if (response.data.payment && response.data.payment.status !== 'pending') {
            setGlobalFeedback(`Note: This payment is already ${response.data.payment.status}.`);
          }
        } else {
          setGlobalError('No payment found for the provided search term.');
        }
      } else if (isFilterSearch) {
        const filterParams = new URLSearchParams();
        if (selectedPaymentSearchClassLevel) filterParams.append('classLevel', selectedPaymentSearchClassLevel);
        if (selectedPaymentSearchSubClassLevel) filterParams.append('section', selectedPaymentSearchSubClassLevel);
        const filterQueryString = filterParams.toString();
        const endpoint = `/payments${filterQueryString ? `?${filterQueryString}` : ''}`;
        const response = await api.get(endpoint);
        paymentsToSet = response.data;
        setFoundPayment(null);
      } else {
        setGlobalError('Please use either a specific search term or filters, not both at once.');
        setPaymentSearchLoading(false);
        return;
      }
      setFilteredPayments(paymentsToSet);
      if (paymentsToSet.length === 0 && !foundPayment) {
        setGlobalError('No payments found for the selected criteria.');
      }
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Failed to find payments. Check console for details.');
      console.error('Payment search error:', err.response?.data || err.message);
      setFoundPayment(null);
      setFilteredPayments([]);
    } finally {
      setPaymentSearchLoading(false);
    }
  };

  return (
    <div className="payment-verification">
      <section className="adminSection">
        <h2 className="sectionHeader">Payment Verification</h2>
        <div className="filterContainer">
          <form onSubmit={handlePaymentSearch} className="flex-row">
            <div className="formGroup">
              <label htmlFor="paymentSearchTerm">Search by Student ID / Payment Code:</label>
              <input
                type="text"
                id="paymentSearchTerm"
                value={paymentSearchTerm}
                onChange={(e) => setPaymentSearchTerm(e.target.value)}
                placeholder="Student ID or Payment Code"
                className="input"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="paymentSearchClassLevel">Class Level:</label>
              <select
                id="paymentSearchClassLevel"
                value={selectedPaymentSearchClassLevel}
                onChange={(e) => setSelectedPaymentSearchClassLevel(e.target.value)}
                className="select"
              >
                <option value="">All</option>
                {CLASS_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="paymentSearchSubClassLevel">Section:</label>
              <select
                id="paymentSearchSubClassLevel"
                value={selectedPaymentSearchSubClassLevel}
                onChange={(e) => setSelectedPaymentSearchSubClassLevel(e.target.value)}
                disabled={!selectedPaymentSearchClassLevel}
                className="select"
              >
                <option value="">All</option>
                {availablePaymentSearchSubClassLevels.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="button primary">Search Payments</button>
          </form>
        </div>
        {paymentSearchLoading && <p className="loadingMessage">Searching for payments...</p>}
        {/* Single Payment View */}
        {foundPayment && (
          <div className="paymentCard">
            <h3 className="cardHeader">Payment Details</h3>
            <div className="paymentDetailsGrid">
              <p><strong>Payment Code:</strong> {foundPayment.paymentCode}</p>
              <p><strong>Student ID:</strong> {foundPayment.studentId}</p>
              <p><strong>Student Name:</strong> {foundPayment.fullName}</p>
              <p><strong>Amount:</strong> ₦{foundPayment.amount?.toFixed(2) ?? 'N/A'}</p>
              <p><strong>Status:</strong> <span className={`statusPill ${foundPayment.status}`}>{foundPayment.status?.toUpperCase() ?? 'N/A'}</span></p>
              <p><strong>Date Initiated:</strong> {new Date(foundPayment.dateInitiated).toLocaleString()}</p>
            </div>
            {foundPayment.status === 'pending' && (
              <button
                onClick={() => updatePaymentStatus(foundPayment._id, 'successful')}
                className="button primary fullWidth"
              >
                Mark as Successful
              </button>
            )}
            <button onClick={handlePrintSingleReceipt} className="button secondary fullWidth">Print Receipt</button>
          </div>
        )}
        {/* Multiple Payments View */}
        {filteredPayments.length > 0 && (
          <div className="tableContainer">
            <h3 className="cardHeader">Payments for Selected Criteria</h3>
            <button onClick={handlePrintStatement} className="button secondary fullWidth printStatementButton">Print Statement</button>
            <table className="dataTable">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Full Name</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => (
                  <tr key={payment._id}>
                    <td>{payment.studentId}</td>
                    <td>{payment.fullName}</td>
                    <td>₦{payment.amount?.toFixed(2) ?? 'N/A'}</td>
                    <td><span className={`statusPill ${payment.status}`}>{payment.status?.toUpperCase() ?? 'N/A'}</span></td>
                    <td>{new Date(payment.dateInitiated).toLocaleDateString()}</td>
                    <td className="actionsCell">
                      {payment.status === 'pending' && (
                        <button
                          onClick={() => updatePaymentStatus(payment._id, 'successful')}
                          className="actionButton primary"
                        >
                          Mark Successful
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* The printable components (hidden by default) */}
        <div className="printable-content" ref={receiptRef}>
          {foundPayment && (
            <div className="receipt">
              <div className="receiptHeader">
                <h2>CBT Payment Receipt</h2>
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="receiptDetails">
                <p><strong>Payment Code:</strong> {foundPayment.paymentCode}</p>
                <p><strong>Student Name:</strong> {foundPayment.fullName}</p>
                <p><strong>Student ID:</strong> {foundPayment.studentId}</p>
                <p><strong>Amount Paid:</strong> ₦{foundPayment.amount?.toFixed(2) ?? 'N/A'}</p>
                <p><strong>Status:</strong> {foundPayment.status?.toUpperCase() ?? 'N/A'}</p>
              </div>
              <p className="receiptFooter">Thank you for your payment.</p>
            </div>
          )}
        </div>
        <div className="printable-content" ref={statementRef}>
          {filteredPayments.length > 0 && (
            <div className="paymentStatement">
              <div className="statementHeader">
                <h2>CBT Payments Statement</h2>
                <p>For Class Level: {selectedPaymentSearchClassLevel || 'All'}</p>
                <p>Section: {selectedPaymentSearchSubClassLevel || 'All'}</p>
                <p>Generated: {new Date().toLocaleDateString()}</p>
              </div>
              <table className="statementTable">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Full Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map(payment => (
                    <tr key={payment._id}>
                      <td>{payment.studentId}</td>
                      <td>{payment.fullName}</td>
                      <td>₦{payment.amount?.toFixed(2) ?? 'N/A'}</td>
                      <td>{payment.status?.toUpperCase() ?? 'N/A'}</td>
                    <td>{new Date(payment.dateInitiated).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PaymentVerification;
