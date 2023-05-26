export const finalPushArray = (fromDb, checker) =>
  [
    ...new Map(
      [...fromDb, ...checker].map((obj) => [obj.sector, obj])
    ).values(),
  ].map((a) => a.id);


  export const objToFormData=(values)=>{
    let data = new FormData();
    data.append("representative", values.representative.user.id);
    data.append("company_name", values.company_name);
    data.append("industry", values.industry);
    data.append("number_of_employees", values.number_of_employees);
    data.append("type_of_employer", values.type_of_employer);
    data.append("hear_about", values.hear_about);
    data.append("website", values.website);
    data.append("contact_person", values.contact_person);
    data.append("company_email", values.company_email);
    data.append("company_phone_number", values.company_phone_number);
    data.append("country", values.country);
    data.append("address", values.address);
    data.append("image", values.image);
    return data
  }