"use client";
import "./DashboardHome.css";
import produit from "../../assets/produit.png";
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import { FaRegTrashCan } from "react-icons/fa6";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createPub, getpub, deletePubs } from "@/app/services/pub";
import Swal from "sweetalert2";
import { HiDotsVertical } from "react-icons/hi";
import { BASE_API_URL } from "@/config/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 566,
  bgcolor: "background.paper",
  border: "white",
  borderRadius: 6,
  p: 6,
  display: "flex",
  gap: 5,
};
export default function page() {
  //stat
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(produit); // Path to your initial image
  const [color, setColor] = useState("yellow");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [title, setTitle] = useState("Title for the Products");
  const [pubs, setPubs] = useState([]);
  const [description, setDescription] = useState(
    "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
  );

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  const handleOpen = () => setOpen(true);

  const handleClick2 = (event, id) => {
    setAnchorEl2({ anchor: event.currentTarget, id });
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const fatchPub = () => {
    getpub()
      .then((res) => {
        setPubs(res.data.pubs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});
  const handleClose = () => {
    setOpen(false);
    reset();
  }; // Reset form when modal closes

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

  //create

  const handledelete = (id) => {
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
        deletePubs(id)
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            fatchPub();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    // Append all form data fields
    formData.append("titlefr", data.titlefr);
    formData.append("titleen", data.titleen);
    formData.append("titlear", data.titlear);
    formData.append("descriptionfr", data.descfr);
    formData.append("descriptionen", data.descen);
    formData.append("descriptionar", data.descar);
    formData.append("color", color);
    if (data.file && data.file[0]) {
      formData.append("image", data.file[0]);
    }
    createPub(formData)
      .then(() => {
        handleClose();
        fatchPub();

        Swal.fire({
          title: "Good job!",
          text: "create Pub successfully",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  useEffect(() => {
    fatchPub();
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IoClose className="close" size={24} onClick={handleClose} />
          <div className="left-modal">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-title">
                <input
                  type="text"
                  placeholder="Titre du produit (Français)"
                  {...register("titlefr", { required: true })}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.titlefr && (
                  <span className="error">Ce champ est requis</span>
                )}

                <input
                  type="text"
                  placeholder="Titre du produit (Anglais)"
                  {...register("titleen")}
                />
              </div>

              <input
                type="text"
                placeholder="Titre du produit (Arabe)"
                {...register("titlear")}
              />

              <div className="input-title">
                <textarea
                  className="desc"
                  placeholder="Description du produit (Français)"
                  {...register("descfr", { required: true })}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.descfr && (
                  <span className="error">Ce champ est requis</span>
                )}

                <textarea
                  className="desc"
                  placeholder="Description du produit (Anglais)"
                  {...register("descen")}
                />
              </div>

              <textarea
                className="desc"
                placeholder="Description du produit (Arabe)"
                {...register("descar")}
              />

              <div className="file">
                <input
                  type="file"
                  accept="image/*"
                  {...register("file")}
                  onChange={handleFileChange}
                />
                <h3>Drag & drop l’image png du produit</h3>
                <h4>Drag ou télécharger</h4>
              </div>
              <div className="btn position">
                <button type="submit">Créer le slide & publier</button>
              </div>
            </form>
          </div>

          <div className="right-modal">
            <div className="slider-content">
              <div className={`slider slider${color}`}>
                <div
                  className="left-slide"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h2>{title}</h2>
                  <p>{description}</p>

                  <button className={outfit.className}>
                    <span> Explore Products</span>
                    <FaArrowRight />
                  </button>
                </div>
                <div className="right-slide">
                  <Image src={image} alt="produit" fill={true} />
                </div>
              </div>
              <div className="color">
                <div
                  className="yellow"
                  onClick={() => setColor("yellow")}
                ></div>
                <div className="bleu" onClick={() => setColor("bleu")}></div>
                <div className="red" onClick={() => setColor("red")}></div>
                <div className="green" onClick={() => setColor("green")}></div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <div className="dahsboard-home">
        <h1>Dashboard</h1>
        <p>
          Editer vos text et image de produits et visualiser le résultat dans
          votre Dashboard
        </p>

        <div className="grid-slider" style={{ position: "relative" }}>
          {pubs.map((pub, index) => (
            <>
              <div className={`slider slider${pub.color}`} key={index}>
                <div
                  className="left-slide"
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h2>{pub.titlefr}</h2>
                  <p>{pub.descriptionfr}</p>

                  <button className={outfit.className}>
                    <span>Explore Products</span>
                    <FaArrowRight />
                  </button>
                </div>
                <div className="right-slide">
                  <img src={BASE_API_URL.replace("/api/v1", "/images/") + pub.image.split("/")[pub.image.split("/").length - 1]} alt="produit" />

                </div>
                <div className="action-btn">
                  <button
                    aria-describedby={id2}
                    variant="contained"
                    onClick={(event) => handleClick2(event, pub._id)} // Pass the ID of the item
                  >
                    <HiDotsVertical />
                  </button>
                  <Popover
                    id={id2}
                    open={open2 && pub._id === anchorEl2?.id} // Ensure the popover is open only for this item
                    anchorEl={anchorEl2?.anchor} // Correctly reference the anchor
                    onClose={handleClose2}
                    anchorOrigin={{
                      vertical: "bottom",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "__Outfit_cfacd3",
                        cursor: "pointer",
                        display: "flex",
                        padding: "10px ",
                        alignItems: "center",
                      }}
                      sx={{ p: 2 }}
                      onClick={() => {
                        handledelete(pub._id); // Delete specific pub by ID
                        handleClose2();
                      }}
                    >
                      <FaRegTrashCan style={{ marginRight: "10px" }} />
                      Supprimer la pub
                    </span>
                  </Popover>
                </div>
              </div>
            </>
          ))}

          <div className="slider">
            <div className="add-slide" onClick={handleOpen}>
              <h3>Click ici pour modifier ou ajouter des slide</h3>
              <h4>Ajouter ici</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
