import React, { useRef } from 'react'
import TextError from './TextError'
import { ErrorMessage, useField } from 'formik'
import Preview from './Preview'

const MutipleDocFiles = ({ label, accept, ...rest }) => {
  const fileRef = useRef(null)
  const [field, form, setFieldValue] = useField(rest)
  const { setValue } = setFieldValue
  const { value, name } = field

  const deleteHandle = (key) => {
    const removeFile = value[key]

    let newFilesList = new DataTransfer()
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== removeFile) newFilesList.items.add(value[i])
    }
    fileRef.current.files = newFilesList.files

    setValue(fileRef.current.files)
  }
  
  return (
    <div className="input-container">
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          ref={fileRef}
          hidden
          type="file"
          id={name}
          name={name}
          multiple
          accept={accept && accept}
          onChange={(e) => {
            setValue(e.currentTarget.files)
          }}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
      <div className={'d-flex row'}>
        <div>
          {Object.entries(value).map(([key, file]) => {
            return (
              <div key={key} className="d-flex">
                <Preview doc={true} file={file} />
                <p className="px-4" onClick={() => deleteHandle(key)}>
                  x
                </p>
              </div>
            )
          })}
        </div>
        <p
          onClick={() => {
            fileRef.current.click()
          }}
          className="upload-btn btn btn-outline-primary"
        >
          Upload
        </p>
      </div>
    </div>
  )
}

export default MutipleDocFiles
