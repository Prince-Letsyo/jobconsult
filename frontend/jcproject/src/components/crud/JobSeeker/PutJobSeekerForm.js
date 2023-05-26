import {
  useChangeJobSeekerInfoMutation,
  useGetJobSeekerByJobSeekerIdQuery,
} from "@/store/features/jobSeekerSlice";
import { useDeleteSectorInfoMutation } from "@/store/features/sectorSlice";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { jobSeekerUpdateSchema } from "@/utils/jobSeeker";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Spinner } from "react-bootstrap";
import FormikContol from "@/components/forms/FormikContol";
import { useGetGenricChoiceQuery } from "@/store/features/api";

const PutJobSeekerForm = ({ user_id }) => {
  const router = useRouter();
  const [deleteSector, setDeleteSector] = useState([]);

  const [
    changeJobSeekerInfo,
    {
      isLoading: jobSeekerIsLoading,
      data: jobSeekerData,
      error: jobSeekerError,
    },
  ] = useChangeJobSeekerInfoMutation();

  const [deleteSectorInfo, {}] = useDeleteSectorInfoMutation();
  const { data: jobSeeker, isSuccess: isSuccessJobSeekerData } =
    useGetJobSeekerByJobSeekerIdQuery(user_id ?? skipToken);

  const {
    data: sexData,
    isLoading: isLoadingSex,
    isSuccess: isSuccessSex,
  } = useGetGenricChoiceQuery("sex");
  const {
    data: qualicationData,
    isLoading: isLoadingQualication,
    isSuccess: isSuccessQualication,
  } = useGetGenricChoiceQuery("qualication");
  const {
    data: sectorData,
    isLoading: isLoadingSector,
    isSuccess: isSuccessSector,
  } = useGetGenricChoiceQuery("sector");

  useEffect(() => {
    return () => {};
  }, [jobSeeker, deleteSector, sexData, qualicationData, sectorData]);

  return isSuccessJobSeekerData &&
    isSuccessSex &&
    isSuccessQualication &&
    isSuccessSector ? (
    !jobSeekerIsLoading &&
    !isLoadingSex &&
    !isLoadingQualication &&
    !isLoadingSector ? (
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...jobSeeker.data,
          job_sector_sector: "",
        }}
        validationSchema={jobSeekerUpdateSchema}
        onSubmit={async (values, { resetForm ,},) => {
          try {
            changeJobSeekerInfo(values)
              .unwrap()
              .then((payload) => {
                deleteSector.every((sector) => {
                  if (sector.id !== undefined)
                    return deleteSectorInfo(sector.id);
                });
                router.push(`/dashboard/jobseeker/`);
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, errors }) => {
          console.log(errors);
          return (
            <Form className="generic-form">
              <FormikContol
                control="input"
                type="email"
                placeholder="example@gmail.com"
                name="user.email"
                label="Email:"
                className="email"
              />
              <FormikContol
                control="input"
                name="user.first_name"
                className="first_name"
                type="text"
                label="First name:"
                placeholder="John"
              />
              <FormikContol
                control="input"
                name="user.last_name"
                className="last_name"
                type="text"
                label="Last name:"
                placeholder="Doe"
              />
              <FormikContol
                control="input"
                name="user.middle_name"
                className="middle_name"
                type="text"
                label="Middle name:"
                placeholder="Yaw"
              />
              <FormikContol
                control="select"
                name="user.gender"
                className="gender"
                label="Gender:"
                placeholder="Gender"
                options={sexData.data}
              />
              <FormikContol
                control="input"
                name="phone_number"
                className="phone_number"
                type="tel"
                label="Phone number:"
                placeholder="+233454646458"
              />
              <FormikContol
                control="input"
                name="date_of_birth"
                className="date_of_birth"
                type="date"
                label="Date of birth:"
                placeholder=""
              />
              <FormikContol
                control="input"
                name="nationality"
                className="nationality"
                type="text"
                label="Nationality:"
                placeholder="eg. Ghana"
              />
              <FormikContol
                control="input"
                name="location"
                className="location"
                type="text"
                label="Location:"
                placeholder="eg. Accra"
              />
              <FormikContol
                control="select"
                name="high_qualification"
                label="Qualification:"
                className="high_qualification"
                options={qualicationData.data}
              />
              <FormikContol
                control="input"
                name="years_of_experience"
                className="years_of_experience"
                type="number"
                label="Experience:"
                placeholder=""
              />
              <div>
                <label htmlFor="available">Available: </label>
                <Field type="checkbox" name="available" id="available" />
              </div>
              <div className="select-container">
                <label htmlFor="job_sector" className="job_sector">
                  Which sectors do you want to work in?
                </label>
                <FieldArray name="job_sector">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.job_sector.length > 0 &&
                        values.job_sector.map((sector, index) => (
                          <div key={index} className="select-input-container">
                            <div className="input-container">
                              {sectorData.data.map(
                                (item, index) =>
                                  item.key === sector.sector && (
                                    <p key={index}>{item.value}</p>
                                  )
                              )}
                            </div>
                            {values.job_sector.length >= 2 && (
                              <div
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  setDeleteSector((preState) => [
                                    ...preState,
                                    values.job_sector[index],
                                  ]);
                                  remove(index);
                                }}
                              >
                                x
                              </div>
                            )}
                          </div>
                        ))}
                      <div>
                        <FormikContol
                          control="select"
                          name={`job_sector_sector`}
                          label="Sector:"
                          className={`job_sector_sector`}
                          options={sectorData.data}
                        />
                        <div
                          type="button "
                          className="btn btn-outline-success"
                          onClick={() => {
                            let { job_sector_sector, job_sector } = values;
                            job_sector.forEach((sector) => {
                              if (sector.sector == job_sector_sector)
                                job_sector_sector = "";
                            });
                            if (job_sector_sector != "")
                              push({
                                seeker: +user_id,
                                sector: job_sector_sector,
                              });
                            values.job_sector_sector = "";
                          }}
                        >
                          Add Sector
                        </div>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
              <button type="submit" className="job-seeker_btn btn btn-primary">
                Update
              </button>
            </Form>
          );
        }}
      </Formik>
    ) : (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Updating...</span>
      </Spinner>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default PutJobSeekerForm;
