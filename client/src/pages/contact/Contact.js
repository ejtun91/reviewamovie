import "./contact.scss";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contactWrapper">
        <span className="contactTitle">Contact Us</span>
        <form className="contactForm">
          <label htmlFor="name">Name:</label>
          <input type="text" className="contactInput" id="name" />
          <label htmlFor="email">Email:</label>
          <input type="email" className="contactInput" id="email" />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            className="contactInput"
            id="subject"
            name="subject"
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="messageInput"
            name="message"
          ></textarea>
          <button type="submit" className="contactBtn">
            Send
          </button>
        </form>
        <div className="descContact">
          <span className="forbidMessage">
            Please note that any contact messages that are requesting movies
            will be ignored.
          </span>
          <span className="sendTo">
            If you wish to donate, you can buy me a coffee on this{" "}
            <em
              style={{
                cursor: "pointer",
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              page
            </em>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
