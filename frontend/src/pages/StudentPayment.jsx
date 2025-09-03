import React from 'react';

function StudentPayments({ authUser, setGlobalFeedback, setGlobalError }) {
  // This is a placeholder component.
  // We will add features like:
  // - A list of all payments made by the student
  // - Payment status (e.g., pending, successful, failed)
  // - The ability to view or download a receipt for each payment
  return (
    <div className="student-payments">
      <section className="studentSection">
        <h2 className="sectionHeader">My Payments</h2>
        <p>Here you'll be able to view all your payment history, including status and receipts.</p>
        <div className="tableContainer">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Payment Code</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">No payments found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default StudentPayments;
