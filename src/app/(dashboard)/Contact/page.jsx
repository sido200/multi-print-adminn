"use client";

import CardContact from "@/components/CardContact/CardContact";
import "./Contact.css";
export default function page() {
  return (
    <div className="dahsboard-lock">
      <h1>Contact</h1>
      <p style={{ marginBottom: "30px" }}>Checker votre boite de contact</p>
      <CardContact />
    </div>
  );
}
