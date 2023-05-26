import React, { useEffect, useState } from "react";

const Preview = ({ file }) => {
  const [preview, setPreview] = useState(null);
  if (typeof file !== "string") {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <div>
      {preview || typeof file == "string"  ? (
        <img
          src={preview??file}
          alt={typeof file == "string" ? file.name : "company logo"}
          width="50px"
        />
      ) : (
        <p>...</p>
      )}
    </div>
  );
};

export default Preview;
