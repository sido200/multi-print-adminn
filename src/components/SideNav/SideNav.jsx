"use client";
import {
  FiHome,
  FiPieChart,
  FiLayout,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiHelpCircle,
  FiLock,
} from "react-icons/fi";
import { IoSchoolOutline } from "react-icons/io5";
import { LuPencilRuler } from "react-icons/lu";
import { MdChecklist } from "react-icons/md";
import "./SideNav.css";
import { NavLink } from "../NavLink";
import { Box, Modal } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 266,
  bgcolor: "background.paper",
  border: "white",
  borderRadius: 6,
  p: 6,
  display: "flex",
  gap: 5,
};
import { useState } from "react";
import { logoutUser } from "@/app/services/auth";
import { useRouter } from "next/navigation";


export default function SideNav() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter(); 
  const HandelLogout = () => {
    logoutUser()
      .then((res) => {
        router.push("/");
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <nav className="nav-bar">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
          <div className="logout">
            <p>
              Contacter l’équipe de Binnovant afin de <br /> Vous aidez
            </p>
            <button>Contacter l’équipe</button>
            <div className="action">
              <h4 onClick={handleClose}>Annuler</h4>

              <h4 onClick={HandelLogout}> Déconnexion</h4>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="logo">
        <h1>logo</h1>
      </div>
      <ul>
        <NavLink href="/DashboardHome">
          <li>
            <FiHome /> Dashboard
          </li>
        </NavLink>
        <NavLink href="/Analytiques">
          <li>
            <FiPieChart /> Analytiques
          </li>
        </NavLink>
        <NavLink href="/Product">
          <li>
            <FiLayout /> Produit
          </li>
        </NavLink>
        <NavLink href="/Categories">
          <li>
            <FiLayout /> Categories
          </li>
        </NavLink>
      </ul>
      <div className="sub-title">
        <h2>Service</h2>
        <hr />
      </div>
      <ul>
        <NavLink href="/Product">
          <li>
            <IoSchoolOutline /> Page Produit
          </li>
        </NavLink>
        <NavLink href="/Design">
          <li>
            <LuPencilRuler /> Design
          </li>
        </NavLink>
        <NavLink href="/Commande">
          <li>

            <MdChecklist /> Commandes

          </li>
        </NavLink>
      </ul>
      <div className="sub-title">
        <h2>Paramètres</h2>
        <hr />
      </div>
      <ul>
        <NavLink href="/Mode">
          <li>
            <FiAward />
            Modérateur
          </li>
        </NavLink>
        <NavLink href="/Parametre">
          <li>
            <FiBookOpen /> Paramètres
          </li>
        </NavLink>
        <NavLink href="/Admin">
          <li>
            <FiBriefcase /> Compte admin
          </li>
        </NavLink>
      </ul>

      <div className="help" onClick={handleOpen}>
        <FiHelpCircle />
      </div>
    </nav>
  );
}
