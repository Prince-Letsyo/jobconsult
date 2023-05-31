import FormikContol from "@/components/forms/FormikContol";
import { useRegisterNewUserMutation } from "@/store/features/authSlice";
import {
  useAddNewJobSeekerMutation,
  useMutateJobSeekerInfoMutation,
} from "@/store/features/jobSeekerSlice";
import { useAddNewSectorMutation } from "@/store/features/sectorSlice";
import {
  jobSeekerInitials,
  jobSeekerSignUpSchema,
  makeUnique,
} from "@/utils/jobSeeker";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetGenricChoiceQuery } from "@/store/features/choices";

const RegisterJobSeekerForm = () => {
  const [webUrl, setWebUrl] = useState("");
  const router = useRouter();

  const [registerNewUser, { isLoading, error: myError }] =
    useRegisterNewUserMutation();
  const [isUserData, setIsUserData] = useState(true);
  const [
    addNewJobSeeker,
    { isLoading: jobSeekerIsLoading, error: jobSeekerError },
  ] = useAddNewJobSeekerMutation();
  const [
    addNewSector,
    { isLoading: isLoadingAddNewSector, data: dataAddNewSector },
  ] = useAddNewSectorMutation();
  const [
    mutateJobSeekerInfo,
    { isLoading: isLoadingMutateJobInfo, data: dataMutateJobInfo },
  ] = useMutateJobSeekerInfoMutation();

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
    setWebUrl(`${window.location.origin}/account/verification/`);
    return () => {};
  }, [sexData, qualicationData, sectorData]);

  return isSuccessSex && isSuccessQualication && isSuccessSector ? (
    !isLoadingSex && !isLoadingQualication && !isLoadingSector && (
      <Formik
        initialValues={jobSeekerInitials}
        validationSchema={jobSeekerSignUpSchema}
        onSubmit={async (values, actions) => {
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
          try {
            const {
              email,
              passwordOne,
              first_name,
              last_name,
              middle_name,
              gender,
              phone_number,
            } = user;
            await registerNewUser({
              email,
              password: passwordOne,
              first_name,
              last_name,
              middle_name,
              gender,
              phone_number,
              user_type: "seeker",
              redirect_url: webUrl,
            })
              .unwrap()
              .then((payload) => {
                console.log(payload);
                addNewJobSeeker({
                  user: {
                    id: payload.data.user_id,
                    email,
                    first_name,
                    last_name,
                    middle_name,
                    gender,
                    phone_number,
                  },
                  date_of_birth,
                  nationality,
                  location,
                  high_qualification,
                  years_of_experience,
                  available,
                  job_sector: [],
                })
                  .unwrap()
                  .then((jobPayload) => {
                    let done = false;
                    let sectorList = [];
                    const clean_job_sector = makeUnique(job_sector, false);

                    clean_job_sector.forEach(async (sector) => {
                      sector.sector != "" &&
                        (await addNewSector({
                          seeker: jobPayload.data.user.id,
                          sector: sector.sector,
                        })
                          .unwrap()
                          .then((sectorPayload) => {
                            sectorList.push(sectorPayload.data);
                            done = sectorList.length == clean_job_sector.length;
                            done &&
                              mutateJobSeekerInfo({
                                user: jobPayload.data.user,
                                job_sector: sectorList,
                              })
                                .unwrap()
                                .then(() => {
                                  actions.resetForm({ values: "" });
                                  router.push("/account/log-in");
                                })
                                .catch((error) => console.log(error))
                                .finally();
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
              control="input"
              name="user.passwordOne"
              className="passwordOne"
              type="password"
              label="Password:"
              placeholder=""
            />
            <FormikContol
              control="input"
              name="user.passwordTwo"
              className="passwordTwo"
              type="password"
              label="Confirm password:"
              placeholder=""
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
                          {sector.sector != "" && (
                            <>
                              <div className="display-container">
                                {sectorData.data.map(
                                  (item, index) =>
                                    item.key == sector.sector && (
                                      <p key={index}>{item.value}</p>
                                    )
                                )}
                              </div>
                              {values.job_sector.length >= 2 && (
                                <div
                                  type="button"
                                  className="btn btn-outline-danger"
                                  onClick={() => remove(index)}
                                >
                                  x
                                </div>
                              )}
                            </>
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
                          console.log(values)
                          job_sector.forEach((sector) => {
                            if (sector.sector == job_sector_sector && sector.sector!==undefined)
                              job_sector_sector = "";
                          });
                          if (job_sector_sector != "")
                            push({
                              seeker: null,
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
              Submit
            </button>
          </Form>
        )}
      </Formik>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default RegisterJobSeekerForm;
