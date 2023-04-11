import {
  useChangeUserInfoMutation,
  useGetUserByUserIdQuery,
} from "@/store/features/userSlice";
import {
  useChangeJobSeekerInfoMutation,
  useGetJobSeekerByJobSeekerIdQuery,
  useMutateJobSeekerInfoMutation,
} from "@/store/features/jobSeekerSlice";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import {
  jobSeekerInitials,
  jobSeekerSignUpSchema,
  jobSeekerUpdateSchema,
  makeUnique,
} from "@/utils/jobSeeker";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Spinner } from "react-bootstrap";
import {
  selectAllSectors,
  useAddNewSectorMutation,
  useDeleteSectorInfoMutation,
  useGetSectorBySectorIdQuery,
  useGetSectorsQuery,
} from "@/store/features/sectorSlice";
import { useSelector } from "react-redux";
import { finalPushArray } from "@/utils/";
import Select from "@/utils/selectDb.json";

const PutJobSeekerForm = ({ user_id }) => {
  const router = useRouter();

  const [
    changeUserInfo,
    { isLoading: isLoadingChangeUserInfo, data: userData, error: myError },
  ] = useChangeUserInfoMutation();
  const [
    changeJobSeekerInfo,
    {
      isLoading: jobSeekerIsLoading,
      data: jobSeekerData,
      error: jobSeekerError,
    },
  ] = useChangeJobSeekerInfoMutation();

  const { data: userDate, isSuccess: isSuccessUserData } =
    useGetUserByUserIdQuery(user_id ?? skipToken);

  const { data: jobSeeker, isSuccess: isSuccessJobSeekerData } =
    useGetJobSeekerByJobSeekerIdQuery(user_id ?? skipToken);

  const [
    mutateJobSeekerInfo,
    { isLoading: isLoadingMutateJobInfo, data: dataMutateJobInfo },
  ] = useMutateJobSeekerInfoMutation();

  const {
    data: SectorListData,
    isSuccess: isSuccessSectorListData,
    isLoading: isLoadingSectorListData,
  } = useGetSectorsQuery(user_id ?? skipToken);
  const [
    addNewSector,
    { isLoading: isLoadingAddNewSector, data: dataAddNewSector },
  ] = useAddNewSectorMutation(user_id ?? skipToken);

  const [
    deleteSectorInfo,
    { isSuccess: isSccuessDelSector, isLoading: isLoadingDelSector },
  ] = useDeleteSectorInfoMutation();

  useEffect(() => {
    return () => {};
  }, [jobSeeker, userDate, SectorListData, isSccuessDelSector]);

  return isSuccessUserData && isSuccessJobSeekerData && SectorListData ? (
    !isLoadingChangeUserInfo &&
    !jobSeekerIsLoading &&
    !isLoadingSectorListData ? (
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...jobSeeker.data,
          job_sector: SectorListData.data,
          user: {
            ...userDate.data,
          },
          job_sector_sector: "",
        }}
        validationSchema={jobSeekerUpdateSchema}
        onSubmit={async (values, { resetForm }) => {
          const {
            user,
            date_of_birth,
            nationality,
            location,
            high_qualification,
            years_of_experience,
            available,
            job_sector,
          } = values;

          const {
            id,
            email,
            first_name,
            gender,
            last_name,
            middle_name,
            phone_number,
          } = user;
          try {
            await changeUserInfo({
              id,
              email,
              first_name,
              gender,
              last_name,
              middle_name,
              phone_number,
            })
              .unwrap()
              .then((payload) => {
                changeJobSeekerInfo({
                  user: payload.data.id,
                  date_of_birth,
                  nationality,
                  location,
                  high_qualification,
                  years_of_experience,
                  available,
                })
                  .unwrap()
                  .then((jobSeekerPayload) => {
                    let done = false;
                    let sectorList = [];
                    let unique = new Map();
                    job_sector.forEach((a) => {
                      let added = false;
                      SectorListData.data.forEach((b) => {
                        if (b.sector == a.sector && a.id !== undefined) {
                          unique.set(a.sector, a);
                          added = true;
                        }
                      });
                      !unique.get(a.sector) && unique.set(a.sector, a);
                    });
                    const job_sector_db = [...unique.values()];
                    const clean_job_sector = makeUnique(job_sector_db, true);
                    clean_job_sector.forEach(async (sector, index) => {
                      sector.sector != undefined &&
                        (await addNewSector({
                          seeker: jobSeekerPayload.data.user,
                          sector: sector.sector,
                        })
                          .unwrap()
                          .then((sectorPayload) => {
                            sectorList.push(sectorPayload.data);
                            done = sectorList.length == clean_job_sector.length;
                            done &&
                              mutateJobSeekerInfo({
                                user: jobSeekerPayload.data.user,
                                job_sector: finalPushArray(
                                  job_sector_db,
                                  sectorList
                                ),
                              })
                                .unwrap()
                                .then((p) => {
                                  router.push(`/dashboard/jobseeker/`);
                                })
                                .catch((error) => console.log(error))
                                .finally(() => resetForm({ values: "" }));
                          })
                          .catch((error) => console.log(error)));
                    });
                  })
                  .catch((error) => console.log(error));
              });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values }) => (
          <Form>
            <Field name="user.email">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="email"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="user.first_name">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="first_name">First name:</label>
                  <input
                    type="text"
                    placeholder="First name"
                    id="first_name"
                    className="first_name"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="user.last_name">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="last_name">Last name:</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    id="last_name"
                    className="last_name"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="user.middle_name">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="middle_name">Middle name:</label>
                  <input
                    type="text"
                    placeholder="Middle name"
                    id="middle_name"
                    className="middle_name"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>

            <div className="input-container">
              <label htmlFor="gender">Gender:</label>
              <Field
                id="gender"
                className="gender"
                name="user.gender"
                component="select"
              >
                <option value="">......select......</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Field>
            </div>
            <Field name="user.phone_number">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="phone_number">Phone number:</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    id="phone_number"
                    className="phone_number"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="date_of_birth">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="date_of_birth">Date of birth</label>
                  <input
                    type="date"
                    placeholder="Date of birth"
                    id="date_of_birth"
                    className="date_of_birth"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="nationality">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="nationality">Nationality:</label>
                  <input
                    type="text"
                    placeholder="Nationality:"
                    id="nationality"
                    className="nationality"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="location">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="location">Location:</label>
                  <input
                    type="text"
                    placeholder="Location:"
                    id="location"
                    className="location"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <div className="input-container">
              <label htmlFor="high_qualification"> Qualification:</label>
              <Field
                component="select"
                id="high_qualification"
                className="high_qualification"
                name="high_qualification"
              >
                <option value="">......select......</option>
                <option value="degree">Degree</option>
                <option value="diploma">Diploma</option>
                <option value="wassce-ssce">WASSCE / SSCE</option>
                <option value="hnd">HND</option>
                <option value="mba-msc">MBA / MSc</option>
                <option value="mbbs">MBBS</option>
                <option value="mphil-phd">MPhil / PhD</option>
                <option value="nce">NCE</option>
                <option value="ond">OND</option>
                <option value="others">Others</option>
                <option value="vocational">Vocational</option>
              </Field>
            </div>

            <Field name="years_of_experience">
              {({ field, form: { touched, errors }, meta }) => (
                <div className="input-container">
                  <label htmlFor="years_of_experience">Experience:</label>
                  <input
                    type="number"
                    placeholder="Experience:"
                    id="years_of_experience"
                    className="years_of_experience"
                    {...field}
                  />
                  {meta.touched && meta.error && (
                    <div className="error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
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
                            {Select.sector.map(
                              (item, index) =>
                                item.key == sector.sector && (
                                  <p key={index}>{item.value}</p>
                                )
                            )}
                          </div>
                          {values.job_sector.length >= 2 && (
                            <div>
                              <div
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => {
                                  if (sector.id != undefined) {
                                    deleteSectorInfo(sector.id)
                                      .unwrap()
                                      .then((payload) => {
                                        remove(index);
                                      });
                                  } else remove(index);
                                }}
                              >
                                x
                              </div>
                              {isLoadingDelSector && (
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">
                                    Updating...
                                  </span>
                                </Spinner>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    <div>
                      <label htmlFor="sector-select">Sector:</label>
                      <Field
                        component="select"
                        id="sector-select"
                        className="high_qualification"
                        name={`job_sector_sector`}
                      >
                        <option value="">......select......</option>
                        {Select.sector.map((item, index) => (
                          <option value={item.key}>{item.value}</option>
                        ))}
                      </Field>
                      <div
                        type="button "
                        className="btn btn-outline-success"
                        onClick={() => {
                          values.job_sector_sector.length !== 0 &&
                            push({
                              seeker: null,
                              sector: values.job_sector_sector,
                            });
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
        )}
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
