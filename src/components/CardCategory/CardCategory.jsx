"use client";
import Image from "next/image";
import productImage from "../../app/assets/product.jpg";
import "./CardCategory.css";
import Popover from "@mui/material/Popover";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
export default function CardProduct({ handleOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="cat-card-product">
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
        <ul className="cat-crud">
          <li>
            {" "}
            Supprimer <FiTrash2 />
          </li>
          <li onClick={handleOpen}>
            Modifier <FiEdit3 />{" "}
          </li>
        </ul>
      </Popover>
      <div className="cat-menu" onClick={handleClick}>
        <HiDotsVertical />
      </div>

      <h3>Category Name</h3>
      <h4>Anglais/عربي</h4>
    </div>
  );
}
