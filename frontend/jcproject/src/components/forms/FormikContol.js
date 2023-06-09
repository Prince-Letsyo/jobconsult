import React from "react";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import File from "./File";

const FormikContol = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "file":
      return <File {...rest} />;
    case "date":
    case "radio":
    case "checkbox":

    default:
      return null;
  }
};

export default FormikContol;
