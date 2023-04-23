import React, { useEffect, useState } from "react";

const Preview = ({ file }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

//   useEffect(() => {
//     return () => {};
//   }, [preview]);

  return (
    <div>
      {preview ? (
        <img src={preview} alt={file.name} width="50px" />
      ) : (
        <p>...</p>
      )}
    </div>
  );
};

export default Preview;
