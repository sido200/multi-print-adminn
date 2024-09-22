"use client";
import CardNewsletter from "@/components/CardNewsletter/CardNewsletter";
import { FiLock } from "react-icons/fi";
import "./Newsletter.css";
export default function page() {

  return (
    <div className="dahsboard-lock">
      <h1>Newsletters</h1>
      <p style={{ marginBottom: "30px" }}>
        Envoyez des newsletters à vos abonnés ou gérez les listes <br />
        d’abonnés directement depuis le tableau de bord.
      </p>
     
      <CardNewsletter />
    </div>
  );
}
