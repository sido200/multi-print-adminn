import Contacter from "@/components/Contacter/Contacter";
import { FiLock } from "react-icons/fi";
export default function page() {
  return (
    <div className="dahsboard-lock">
      <h1>Analytiques</h1>
      <p>
        Checker les statistiques générales de votre <br /> site et de vos
        commandes
      </p>
      <Contacter />
    </div>
  );
}
