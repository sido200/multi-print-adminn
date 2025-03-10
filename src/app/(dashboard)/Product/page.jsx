"use client";
import CardProduct from "@/components/CardProduct/CardProduct";
import "./Product.css";
import Modal from "@mui/material/Modal";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  createProduct,
  deleteProducts,
  getProducts,
} from "@/app/services/produits";
import { getCategorie } from "@/app/services/categorie";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SwiperProduct from "@/components/SwiperAddProduct/SwiperAddProduct";
import DropZone from "@/components/DropZone/DropZone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 666,
  bgcolor: "background.paper",
  border: "white",
  borderRadius: 6,
  height: 666,
  bgcolor: "background.paper",
  border: "white",
  borderRadius: 6,
  p: 6,
  display: "flex",
  gap: 5,
  display: "flex",
  gap: 5,
  zIndex: 2,
};
export default function page() {
  //stat
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imgError, setImgError] = useState("");
  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //function
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //fatch
  const fatchProduct = () => {
    getProducts()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //delete
  const handledeleteProduct = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducts(id)
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fatchProduct();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message,
            });
          });
      }
    });
  };
  // call api
  useEffect(() => {
    fatchProduct();
  }, []);
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
    setIsLoading(true);
    // Append all form data fields
    formData.append("titlefr", data.titlefr);
    formData.append("titleen", data.titleen);
    formData.append("titlear", data.titlear);
    formData.append("descfr", data.descfr);
    formData.append("descen", data.descen);
    formData.append("descar", data.descar);
    formData.append("category", activeCat);
    images.forEach((image) => {
      formData.append("images", image.file);
    });

    createProduct(formData)
      .then(() => {
        handleClose();
        fatchProduct();
        setIsLoading(false);
        reset();
        setImages([]);

        Swal.fire({
          title: "Good job!",
          text: "create Product successfully",
          icon: "success",
        });
      })
      .catch(() => {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  function ImageUpload() {
    function handleChange(e) {
      const fileList = Array.from(e.target.files);
      const totalImages = images.length + fileList.length;

      if (totalImages > 3) {
        Swal.fire({
          icon: "warning",
          title: "Limit Reached",
          text: "You can only upload a maximum of 3 images.",
        });
        return;
      }

      setImages((prevImages) => [
        ...prevImages,
        ...fileList.map((file) => ({
          file,
          url: window.URL.createObjectURL(file),
        })),
      ]);
    }
    function handleDeleteImage(index) {
      URL.revokeObjectURL(images[index].url);
      const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
      setImages(updatedImages);
    }

    return (
      <div className="App">
        <div className="Appplus">
          <label
            htmlFor="inputfileimage"
            className="inputfilecircle pluscircle"
          >
            Ajouter une image
          </label>
        </div>

        <input
          type="file"
          id="inputfileimage"
          onChange={handleChange}
          multiple
        />

        <SwiperProduct
          previews={images.map((img) => img.url)}
          setImages={setImages}
          onDeleteImage={handleDeleteImage}
        />
      </div>
    );
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="box">
          <IoClose className="close" size={24} onClick={handleClose} />
          <div className="left-modal">
            <h3>Ajouter des images</h3>

            <div className="file2">
              <ImageUpload />
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
                placeholder="Titre du produit fr"
                {...register("titlefr", { required: "Title is required" })}
              />
              {errors.titleFr && <p>{errors.titleFr.message}</p>}

              <input
                type="text"
                placeholder="Titre du produit en"
                {...register("titleen", { required: true })}
              />
              {errors.titleEn && <p>This field is required</p>}

              <input
                type="text"
                placeholder="Titre du produit ar"
                {...register("titlear", { required: true })}
              />
              {errors.titleAr && <p>This field is required</p>}

              <textarea
                className="desc2"
                placeholder="Description du produit fr"
                {...register("descfr", { required: true })}
              />
              {errors.descFr && <p>This field is required</p>}

              <textarea
                className="desc2"
                placeholder="Description du produit en"
                {...register("descen", { required: true })}
              />
              {errors.descEn && <p>This field is required</p>}

              <textarea
                className="desc2"
                placeholder="Description du produit ar"
                {...register("descar", { required: true })}
              />
              {errors.descAr && <p>This field is required</p>}

              <div className="btn">
                <button type="submit">Créer le slide & publier</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <div className="dahsboard-Product">
        <h1>Produits</h1>
        <p>
          Ajouter supprimer ou modifier vos <br /> produits
        </p>
        <button className="add-product" onClick={handleOpen}>
          Ajouter un produit
        </button>

        <div className="grid-product">
          {products?.map((product, index) => (
            <CardProduct
              key={index}
              product={product}
              handleOpen={handleOpen}
              deleteProduct={handledeleteProduct}
              fatchProduct={fatchProduct}
            />
          ))}
        </div>
      </div>
    </>
  );
}
