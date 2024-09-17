"use client"
import './DashboardHome.css'
import produit from  '../../assets/produit.png'
import { Outfit } from 'next/font/google';
const outfit = Outfit({ subsets: ["latin"] });
import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image';
import { IoClose } from "react-icons/io5";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/material";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height:566,
  bgcolor: 'background.paper',
  border: 'white',
  borderRadius:6,
  p: 6,
  display:'flex',
  gap:5
 
};
import { useState } from 'react';


export default function page() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState('Title for the Products');
  const [description, setDescription] = useState(
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.'
  );
  const [image, setImage] = useState(produit); // Path to your initial image
  const [color, setColor] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        
        setImage(reader.result);
    
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
<IoClose className='close' size={24} onClick={handleClose}/>
        <div className="left-modal">
          <form action="
          ">
             <input
              type="text"
              placeholder='Titre du produit'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className='desc'
              placeholder='Description du produit'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="file">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
         <h3>Drag & drop l’image png du produite</h3>
              <h4 >Drag ou télécharger </h4>
         </div>
          </form>
        </div>
    
        <div className="right-modal">
          <div className="slider-content">
          <div className={`slider slider${color}`}>
  
  <div
    className="left-slide"
    style={{ backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <h2>{title}</h2>
    <p>
    {description}
    </p>
   
      <button className={outfit.className}>
        <span> Explore Products</span>
        <FaArrowRight />
      </button>
 
  </div>
  <div className="right-slide">
    <Image src={image} alt="produit" fill={true}/>
  </div>




</div>
          <div className="color">
<div className="yellow" onClick={()=>setColor(1)}></div>
<div className="bleu" onClick={()=>setColor(2)}></div>
<div className="red" onClick={()=>setColor(3)}></div>
<div className="green" onClick={()=>setColor(4)}></div>
</div>
          </div>
       

<div className="btn">
<button>Crée le slide & publier</button>
</div>
        </div>
        </Box>
      </Modal>
    
     <div className="dahsboard-home">
     <h1>Dashboard</h1>
     <p>Editer vos text et image de produits et visualiser le résultat dans votre Dashboard</p>
 
    <div className="grid-slider">
      
    <div className='slider'>
  
  <div
    className="left-slide"
    style={{ backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <h2>Title for the Products</h2>
    <p>
      In publishing and graphic design, Lorem ipsum is a placeholder text
      commonly used to demonstrate the visual form of a document or a
      typeface without relying on meaningful content. Lorem ipsum may be
      used as a placeholder before the final copy is available.
    </p>
   
      <button className={outfit.className}>
        <span> Explore Products</span>
        <FaArrowRight />
      </button>
 
  </div>
  <div className="right-slide">
    <Image src={produit} alt="produit" />
  </div>




</div>
      <div className='slider'>
  
  <div
    className="left-slide"
    style={{ backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <h2>Title for the Products</h2>
    <p>
      In publishing and graphic design, Lorem ipsum is a placeholder text
      commonly used to demonstrate the visual form of a document or a
      typeface without relying on meaningful content. Lorem ipsum may be
      used as a placeholder before the final copy is available.
    </p>
   
      <button className={outfit.className}>
        <span> Explore Products</span>
        <FaArrowRight />
      </button>
 
  </div>
  <div className="right-slide">
    <Image  src={produit} alt="produit" />
  </div>




</div>
      <div className='slider'>
  
  <div
    className="left-slide"
    style={{ backgroundSize: "cover", backgroundPosition: "center" }}
  >
    <h2>Title for the Products</h2>
    <p>
      In publishing and graphic design, Lorem ipsum is a placeholder text
      commonly used to demonstrate the visual form of a document or a
      typeface without relying on meaningful content. Lorem ipsum may be
      used as a placeholder before the final copy is available.
    </p>
   
      <button className={outfit.className}>
        <span> Explore Products</span>
        <FaArrowRight />
      </button>
 
  </div>
  <div className="right-slide">
    <Image src={produit} alt="produit" />
  </div>




</div>
<div className="slider">
  <div className="add-slide" onClick={handleOpen}>
              <h3>Click ici pour modifier ou ajouter des slide</h3>
              <h4 >Ajouter ici</h4>
  </div>
</div>
    </div>
    </div>
    </>
   
  )
}