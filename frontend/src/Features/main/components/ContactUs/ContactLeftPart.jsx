import React, { useState } from "react";
import "../../styles/ContactUs/ContactLeftPart.scss";

import { useAddContactDetails } from "../../Hooks/Contact/useContact";

const ContactLeftPart = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const {
    mutate: addContact,
    isPending,
  } = useAddContactDetails();

  // ==========================================
  // FORM SUBMIT
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      username,
      email,
      subject,
      message,
    };

    addContact(contactData, {
      onSuccess: () => {
        // Form clear
        setUsername("");
        setEmail("");
        setSubject("");
        setMessage("");
      },
    });
  };

  return (
    <div className="contact-left-section">

      {/* Form */}
      <form
        className="auth-form contact-form"
        onSubmit={handleSubmit}
      >

        {/* Name */}
        <div className="form-group">
          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>


        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>


        {/* Subject */}
        <div className="form-group">
          <label>Subject</label>

          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>


        {/* Message */}
        <div className="form-group">
          <label>Message</label>

          <textarea
            placeholder="Type your message....."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="send-btn"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>

      </form>

    </div>
  );
};

export default ContactLeftPart;