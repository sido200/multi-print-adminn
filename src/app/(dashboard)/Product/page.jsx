"use client"
import CardProduct from "@/components/CardProduct/CardProduct"
import "./Product.css"
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height:666,
  bgcolor: 'background.paper',
  border: 'white',
  borderRadius:6,
  p: 6,
  display:'flex',
  gap:5
 
};
import { useState } from 'react';
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
      <Box sx={style} className="box">
      <IoClose className='close' size={24} onClick={handleClose}/>
        <div className="left-modal">
          <h3>Ajouter des images</h3>
        <div className="file2">
         <input type="file" />
         <h3>Drag & drop l’image png du produite</h3>
              <h4 >Drag ou télécharger </h4>
         </div>
         <h3>Categorie de produit</h3>
         <div className="categorie">
          <div className="cat">
          Etiquettes bouteille d’eau
          </div>
          <div className="cat">
          Etiquettes boite
          </div>
          <div className="cat">
          Etiquettes conserve
          </div>
          <div className="cat">
          Etiquettes t-shirt
          </div>
          <div className="cat active-cat">
          Etiquettes wassim
          </div>
         </div>
        </div>
    
        <div className="right-modal">
        <h3>Information générale</h3>
        <form action="
          ">
            <input type="text" placeholder='Titre du produite' />
            <textarea type="text" className='desc2' placeholder='Description du produite' />
       
          </form>
       

<div className="btn">
<button>Crée le slide & publier</button>
</div>
        </div>
        </Box>
      </Modal>
    <div className="dahsboard-Product">
    <h1>Produits</h1>
    <p>Ajouter supprimer ou modifier vos <br /> produits</p>
    <button className="add-product" onClick={handleOpen}>
      Ajouter un produit
    </button>

   <div className="grid-product">
<CardProduct handleOpen={handleOpen}/>
<CardProduct handleOpen={handleOpen}/>
<CardProduct handleOpen={handleOpen}/>
<CardProduct handleOpen={handleOpen}/>
<CardProduct handleOpen={handleOpen}/>
<CardProduct handleOpen={handleOpen}/>
<CardProduct handleOpen={handleOpen}/>
<CardProduct handleOpen={handleOpen}/>
   </div>
   </div>
   </>
  )
}