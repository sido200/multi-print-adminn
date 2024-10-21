import React from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa6";

function ImageUpload({ height, width, onDrop, preview }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
      <div
        className="image-upload-container"
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? "#4caf50" : "#ccc"}`,
          borderRadius: "10px",
          // padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDragActive ? "#f0fff0" : "transparent",
          transition: "border-color 0.3s, background-color 0.3s",
          height,
          width,
        }}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ) : (
          <div>
            <FaUpload size={50} color={isDragActive ? "#4caf50" : "#aaa"} />
            <p
              style={{
                margin: "10px 0",
                color: isDragActive ? "#4caf50" : "#777",
              }}
            >
              {isDragActive
                ? "Drop the image here"
                : "Drag & Drop or Click to Upload an Image"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
