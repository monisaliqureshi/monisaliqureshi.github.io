import React, { useEffect, useState } from "react";
import "./Contact.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { getContactPageData } from "../../portfolio";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    getContactPageData().then((res) => {
      if (res?.contactSection && res.contactSection.title) {
        setContactInfo({
          title: res.contactSection.title,
          subtitle: res.contactSection.description,
          number: "+1234567890", // Replace or extend backend to send this
          email_address: "monisaliqureshi@gmail.com", // Same
        });
      }
    });
  }, []);

  if (!contactInfo) {
    return (
      <div className="main contact-margin-top" id="contact">
        <p>Loading contact info...</p>
      </div>
    );
  }

  return (
    <div className="main contact-margin-top" id="contact">
      <div className="contact-div-main">
        <div className="contact-header">
          <h1 className="heading contact-title">{contactInfo.title}</h1>
          <p className="subTitle contact-subtitle">{contactInfo.subtitle}</p>

          <div className="contact-text-div">
            <a className="contact-detail" href={"tel:" + contactInfo.number}>
              {contactInfo.number}
            </a>
            <br />
            <br />
            <a
              className="contact-detail-email"
              href={"mailto:" + contactInfo.email_address}
            >
              {contactInfo.email_address}
            </a>
            <br />
            <br />
            <SocialMedia />
          </div>
        </div>
        <div className="contact-image-div">
          <img alt="" src={require("../../assests/images/contactMail.png")} />
        </div>
      </div>
    </div>
  );
}
