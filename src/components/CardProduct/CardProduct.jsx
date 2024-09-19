"use client"
import Image from "next/image";
import productImage from "../../app/assets/product.jpg";
import "./CardProduct.css"
import Popover from '@mui/material/Popover';
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { FiTrash2 ,FiEdit3 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Box, Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { getCategorie } from "@/app/services/categorie";
import { updateProduct } from "@/app/services/produits";
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
export default function CardProduct({product,deleteProduct,fatchProduct}) {
  //stat
  const [open2, setOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(product?.category);

  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //function
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  //fatch

useEffect(() => {
  getCategorie()
    .then((res) => {
      setCategories(res.data.categories);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

 
// create
  const onSubmit = (data) => {
    const formData = new FormData();

    // Append all form data fields
    formData.append("titlefr", data.titlefr);
    formData.append("titleen", data.titleen);
    formData.append("titlear", data.titlear);
    formData.append("descfr", data.descfr);
    formData.append("descen", data.descen);
    formData.append("descar", data.descar);
    formData.append("category", activeCat);

    if (data.files && data.files[0]) {
      formData.append("images", data.files);
    }

    updateProduct(product._id,formData)
      .then(() => {
        handleClose2()
        fatchProduct()
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
  
    <div className="card-product">
            <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
          <IoClose className="close" size={24} onClick={handleClose2} />
          <div className="left-modal">
            <h3>Ajouter des images</h3>
            <div className="file2">
              <input type="file" multiple {...register("files")} />
              <h3>Drag & drop l’image png du produite</h3>
              <h4>Drag ou télécharger </h4>
            </div>
            <h3>Categorie de produit</h3>
            <div className="categorie">
              {categories.map((categorie, index) => (
                <div
                  key={index}
                  className={
                    activeCat == categorie._id ? "cat active-cat" : "cat "
                  }
                  onClick={() => setActiveCat(categorie._id)}
                >
                  {categorie.titlefr}
                </div>
              ))}
            </div>
          </div>

          <div className="right-modal">
            <h3>Information générale</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                defaultValue={product?.titlefr}
                placeholder="Titre du produit fr"
                {...register("titlefr", { required: "Title is required" })}
              />
              {errors.titleFr && <p>{errors.titleFr.message}</p>}

              <input
                type="text"
                defaultValue={product?.titleen}
                placeholder="Titre du produit en"
                {...register("titleen", { required: true })}
              />
              {errors.titleEn && <p>This field is required</p>}

              <input
                type="text"
                defaultValue={product?.titlear}
                placeholder="Titre du produit ar"
                {...register("titlear", { required: true })}
              />
              {errors.titleAr && <p>This field is required</p>}

              <textarea
                className="desc2"
                defaultValue={product?.descfr}
                placeholder="Description du produit fr"
                {...register("descfr", { required: true })}
              />
              {errors.descFr && <p>This field is required</p>}

              <textarea
                className="desc2"
                defaultValue={product?.descen}
                placeholder="Description du produit en"
                {...register("descen", { required: true })}
              />
              {errors.descEn && <p>This field is required</p>}

              <textarea
                className="desc2"
                defaultValue={product?.descar}
                placeholder="Description du produit ar"
                {...register("descar", { required: true })}
              />
              {errors.descAr && <p>This field is required</p>}

              <div className="btn">
                <button type="submit">Crée le slide & publier</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
       <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <ul className="crud">
       <li onClick={()=>deleteProduct(product._id)}> Supprimer <FiTrash2/></li>
        <li onClick={handleOpen2}>Modifier <FiEdit3/> </li>
      
       </ul>
       
      </Popover>
      <div className="menu" onClick={handleClick}>
      <HiDotsVertical />
      </div>
    <div className="img">  <img src={product.images[0]} alt="product" /></div>
      <h3>{product.titlefr}</h3>
      <h4>Type</h4>
    </div>
 
  );
}
