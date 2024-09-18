"use client";
import CardCategory from "@/components/CardCategory/CardCategory";
import "./Categories.css";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 666,
  bgcolor: "background.paper",
  border: "white",
  borderRadius: 6,
  p: 6,
  display: "flex",
  gap: 5,
};
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function page() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="cat-box">
          <IoClose className="cat-close" size={24} onClick={handleClose} />

          <div className="cat-right-modal">
            <h3>Information générale</h3>
            <form
              action="
          "
            >
              <input type="text" placeholder="Titre du Catégorie en français" />
              <input type="text" placeholder="Titre du Catégorie en anglais" />
              <input type="text" placeholder="Titre du Catégorie en arabe" />
            </form>

            <div className="cat-btn">
              <button>Créer la catégorie & publier</button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="cat-dahsboard-Product">
        <h1>Catégories</h1>
        <p>
          Ajouter, supprimer ou modifier vos <br /> Catégories
        </p>
        <button className="cat-add-product" onClick={handleOpen}>
          Ajouter une Catégorie
        </button>

        <div className="cat-grid-product">
          <CardCategory handleOpen={handleOpen} />
          <CardCategory handleOpen={handleOpen} />
          <CardCategory handleOpen={handleOpen} />
          <CardCategory handleOpen={handleOpen} />
          <CardCategory handleOpen={handleOpen} />
          <CardCategory handleOpen={handleOpen} />
          <CardCategory handleOpen={handleOpen} />
        </div>
      </div>
    </>
  );
}
