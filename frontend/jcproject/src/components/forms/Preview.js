import React, { useEffect, useState } from 'react'

const Preview = ({ doc, file }) => {
  const [preview, setPreview] = useState(null)
  if (!doc) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreview(reader.result)
    }
  }

  return (
    <div>
      {doc ? (
        <div>
          <p>{file.name}</p>
        </div>
      ) : preview ? (
        <img src={preview} alt={file.name} width="50px" />
      ) : (
        <p>...</p>
      )}
    </div>
  )
}

export default Preview
