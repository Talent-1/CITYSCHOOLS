import React from 'react';

function StudentProfile({ authUser, setGlobalFeedback, setGlobalError }) {
  // This is a placeholder component.
  // We will add features like:
  // - Displaying the student's personal details (name, email, class level, etc.)
  // - Allowing the student to update their password
  // - Displaying any profile images or avatars
  // - Maybe a feature for updating their contact information
  return (
    <div className="student-profile">
      <section className="studentSection">
        <h2 className="sectionHeader">My Profile</h2>
        <div className="form">
          <div className="formGroup">
            <label>Full Name:</label>
            <input type="text" value={authUser.fullName} disabled className="input" />
          </div>
          <div className="formGroup">
            <label>Student ID:</label>
            <input type="text" value={authUser.studentId} disabled className="input" />
          </div>
          <div className="formGroup">
            <label>Class Level:</label>
            <input type="text" value={authUser.classLevel} disabled className="input" />
          </div>
          <div className="formGroup">
            <label>Department:</label>
            <input type="text" value={authUser.areaOfSpecialization || 'N/A'} disabled className="input" />
          </div>
        </div>
      </section>
      <section className="studentSection">
        <h2 className="sectionHeader">Change Password</h2>
        <form>
          <div className="formGroup">
            <label>New Password:</label>
            <input type="password" className="input" />
          </div>
          <div className="formGroup">
            <label>Confirm Password:</label>
            <input type="password" className="input" />
          </div>
          <button type="submit" className="button primary">Update Password</button>
        </form>
      </section>
    </div>
  );
}

export default StudentProfile;
