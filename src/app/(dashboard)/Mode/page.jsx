import Contacter from "@/components/Contacter/Contacter";
import { FiLock } from "react-icons/fi";
export default function page() {
  return (
    <div className="dahsboard-lock">
      <h1>Modérateurs</h1>
      <p>
        Créer des modérateur pour gèrer votre <br /> plateforme et assurer un
        support client optimale
      </p>
      <Contacter />
    </div>
  );
}
