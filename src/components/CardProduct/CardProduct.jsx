"use client";
import Image from "next/image";
import productImage from "../../app/assets/product.jpg";
import "./CardProduct.css";
import Popover from "@mui/material/Popover";
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Box, Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { getCategorie } from "@/app/services/categorie";
import { updateProduct } from "@/app/services/produits";
import Swal from "sweetalert2";
import { CiCirclePlus } from "react-icons/ci";
import SwiperProduct from "../SwiperAddProduct/SwiperAddProduct";

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

export default function CardProduct({ product, deleteProduct, fatchProduct }) {
  // State
  const [open2, setOpen2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(product?.category._id);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [imgError, setImgError] = useState("");
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Handlers
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  // Initialize images with existing product images
  useEffect(() => {
    if (product?.images) {
      const initialImages = product.images.map((imageUrl) => ({
        file: null, // Existing image
        url: imageUrl, // URL of the existing image
      }));
      setImages(initialImages);
    }
  }, [product]);

  // Fetch categories
  useEffect(() => {
    getCategorie()
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Update product
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("titlefr", data.titlefr);
    formData.append("titleen", data.titleen);
    formData.append("titlear", data.titlear);
    formData.append("descfr", data.descfr);
    formData.append("descen", data.descen);
    formData.append("descar", data.descar);
    formData.append("category", activeCat);

    const existingUrls = images
      .filter((img) => !img.file)
      .map((img) => img.url);
    formData.append("existingUrls", JSON.stringify(existingUrls));

    const newFiles = images.filter((img) => img.file);
    newFiles.forEach((img) => formData.append("images", img.file));
    newFiles.length !== 0 && existingUrls.length !== 0
      ? updateProduct(product._id, formData)
          .then((response) => {
            // Update the product state and image preview
            fatchProduct();
            handleClose2();
            setImages(
              response.data?.images?.map((url) => ({ file: null, url }))
            );
            Swal.fire({
              title: "Good job!",
              text: "Product updated successfully",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Update error:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          })
      : setImgError("Please add at least 1 image");
  };

  // Popover handling
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // ImageUpload Component
  function ImageUpload() {
    function handleChange(e) {
      const fileList = Array.from(e.target.files);
      setImages((prevImages) => [
        ...prevImages,
        ...fileList.map((file) => ({
          file,
          url: window.URL.createObjectURL(file), // Temporary URL for preview
        })),
      ]);
    }

    function handleDeleteImage(index) {
      // Clean up the object URL for new images
      if (images[index].file) {
        URL.revokeObjectURL(images[index].url);
      }
      // Remove the image from the state
      const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
      setImages(updatedImages);
    }
    console.log(errors);

    return (
      <div className="App">
        <div className="Appplus">
          <label
            htmlFor="inputfileimage"
            className="inputfilecircle pluscircle"
          >
            Ajouter des images{" "}
          </label>
        </div>

        <input
          type="file"
          id="inputfileimage"
          onChange={handleChange}
          multiple
        />

        <SwiperProduct
          onImageChange={setActiveImage}
          onDeleteImage={handleDeleteImage}
          setImages={setImages}
          previews={images.map((img) => img.url)}
        />
      </div>
    );
  }

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
          <div className="left-modal" style={{ gap: "0px" }}>
            <h3>Ajouter des images</h3>
            <div
              className="file2"
              style={{ marginBottom: !imgError && "20px" }}
            >
              <ImageUpload />
            </div>
            {imgError && <p className="pp">{imgError}</p>}
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
            <h3>Informations générales</h3>
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
              {errors.descFr && <p>{errors.descFr.message}</p>}

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
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ul className="crud">
          <li
            onClick={() => {
              deleteProduct(product._id);
              handleClose();
            }}
          >
            Supprimer <FiTrash2 />
          </li>
          <li
            onClick={() => {
              handleOpen2();
              handleClose();
            }}
          >
            Modifier <FiEdit3 />
          </li>
        </ul>
      </Popover>
      <div className="menu" onClick={handleClick}>
        <HiDotsVertical />
      </div>
      <div className="img">
        <img src={product.images[0]} alt="product" />
      </div>
      <h3>{product.titlefr}</h3>
      <h4>Type</h4>
    </div>
  );
}
