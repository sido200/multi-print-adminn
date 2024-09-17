import { FiLock } from "react-icons/fi";
import "./Contacter.css"
import Link from "next/link";
export default function Contacter() {
  return (
    <div className="center">
    <FiLock color="rgba(221, 221, 221, 1)" size={161}/>
    <p>Contacter l’équipe de Binnovant afin de <br /> développer se module</p>
 <Link target="blank" href='https://www.binnovant.com/#contact'>   <button>Contacter l’équipe</button></Link>
  </div>
  )
}