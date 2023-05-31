import FormikContol from "@/components/forms/FormikContol";
import { useGetGenricChoiceQuery } from "@/store/features/choices";
import { useGetCompanyInfosQuery } from "@/store/features/companyInfoSlice";
import {
  useAddNewJobRequirementMutation,
  useGetJobRequirementsQuery,
} from "@/store/features/jobRequirementsSlice";
import {
  useAddNewJobResponsibilityMutation,
  useGetJobResponsibilitiesQuery,
} from "@/store/features/jobResponsibilitiesSlice";
import {
  useAddNewJobMutation,
  useMutateJobInfoMutation,
} from "@/store/features/jobsSlice";
import { formDataToObject, objectToFormData } from "@/utils";
import { jobInitials, jobRegisterSchema } from "@/utils/job";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const RegisterJobForm = ({ company }) => {
  const {
    data: companies,
    isLoading: isLoadingCompanies,
    isSuccess: isSuccessCompanies,
    isError: isErrorCompanies,
  } = useGetCompanyInfosQuery();
  const router = useRouter();

  const [addNewJob, { isLoading: isLoadingAddNewJob, data: dataNewJob }] =
    useAddNewJobMutation();
  const [
    mutateJobInfo,
    { isLoading: isLoadingMutateJobInfo, data: dataMutateJobInfo },
  ] = useMutateJobInfoMutation();
  const [
    addNewJobRequirement,
    {
      isLoading: isLoadingAddNewJobRequirement,
      data: dataAddNewJobRequirement,
    },
  ] = useAddNewJobRequirementMutation();

  const [
    addNewJobResponsibility,
    {
      isLoading: isLoadingAddNewJobResponsibility,
      data: dataAddNewJobResponsibility,
    },
  ] = useAddNewJobResponsibilityMutation();

  const {
    data: sectorData,
    isLoading: isLoadingSector,
    isSuccess: isSuccessSector,
  } = useGetGenricChoiceQuery("sector");

  const {
    data: jobTypeData,
    isLoading: isLoadingJobType,
    isSuccess: isSuccessJobType,
  } = useGetGenricChoiceQuery("type_of_job");

  const {
    data: qualicationData,
    isLoading: isLoadingQualication,
    isSuccess: isSuccessQualication,
  } = useGetGenricChoiceQuery("qualication");
  const {
    data: typeEmploymentData,
    isLoading: isLoadingTypeEmployment,
    isSuccess: isSuccessTypeEmployment,
  } = useGetGenricChoiceQuery("type_employment");

  useEffect(() => {
    return () => {};
  }, [sectorData, jobTypeData, qualicationData, typeEmploymentData]);

  return !isLoadingSector &&
    !isLoadingQualication &&
    !isLoadingJobType &&
    !isLoadingTypeEmployment ? (
    isSuccessSector &&
      isSuccessJobType &&
      isSuccessQualication &&
      isSuccessTypeEmployment && (
        <Formik
          initialValues={{
            ...jobInitials,
            publisher: company.representative.user,
            company_name: company.representative.user.id,
            type_of_publisher: "C",
          }}
          // validationSchema={jobRegisterSchema}
          onSubmit={async (values) => {
            try {
              const {
                company_name,
                deadline,
                description,
                experience_length,
                image,
                location,
                minimum_qualification,
                number_of_required_applicantion,
                publisher,
                sector,
                slug,
                title,
                type_of_employment,
                type_of_job,
                type_of_publisher,
                responsibilities,
                requirements,
              } = values;
              const data = objectToFormData({
                company_name,
                deadline,
                description,
                experience_length,
                image,
                location,
                minimum_qualification,
                number_of_required_applicantion,
                publisher,
                sector,
                slug,
                title,
                type_of_employment,
                type_of_job,
                type_of_publisher,
                responsibilities: [],
                requirements: [],
              });
              await addNewJob(data)
                .unwrap()
                .then((payload) => {
                  responsibilities.forEach((responsibility) => {
                    responsibility.job = payload.data.id;
                  });
                  requirements.forEach((requirement) => {
                    requirement.job = payload.data.id;
                  });
                  if (responsibilities.length > 0 || requirements.length > 0) {
                    const patchData = objectToFormData({
                      id: payload.data.id,
                      responsibilities,
                      requirements,
                    });
                    mutateJobInfo(patchData)
                      .unwrap()
                      .then((patchPayload) => console.log(patchPayload))
                      .catch((error) => console.log(error));
                  }
                })
                .catch((error) => console.log(error));
            } catch (error) {}
          }}
        >
          {({ values }) => (
            <Form className="generic-form">
              <FormikContol
                control="input"
                type="text"
                placeholder="Job title"
                name="title"
                label="Job title:"
                className="job-title"
              />
              <FormikContol
                control="input"
                type="text"
                placeholder="Job location"
                name="location"
                label="Job location:"
                className="job-location"
              />
              <FormikContol
                control="textarea"
                name="description"
                label="Description:"
                className="description"
              />
              <FormikContol
                control="select"
                id="sector-select"
                label="Sector:"
                className="sector-job"
                name={`sector`}
                options={sectorData.data}
              />
              <FormikContol
                control="select"
                id="type_of_job"
                label="Job function:"
                className="type_of_job"
                name={`type_of_job`}
                options={jobTypeData.data}
              />
              <FormikContol
                control="select"
                id="minimum_qualification"
                label="Minimum qualification:"
                className="minimum_qualification"
                name={`minimum_qualification`}
                options={qualicationData.data}
              />
              <FormikContol
                control="select"
                id="type_of_employment"
                label="Type of employment:"
                className="type_of_employment"
                name={`type_of_employment`}
                options={typeEmploymentData.data}
              />
              <FormikContol
                control="input"
                type="number"
                name="experience_length"
                label="Year(s) of Experience :"
                className="experience_length"
              />
              <FormikContol
                control="input"
                type="number"
                name="number_of_required_applicantion"
                label="Number of required Applicant:"
                className="number_of_required_applicantion"
              />
              <div>
                <label htmlFor="responsibility-list">Responsibilities</label>
                <FieldArray name="responsibilities" id="responsibility-list">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.responsibilities.length > 0 &&
                        values.responsibilities.map((sector, index) => (
                          <div key={index}>
                            <div>
                              <label htmlFor="responsibilities-select">
                                {" "}
                                Job applicant would be responsible for:{" "}
                              </label>
                              <Field
                                id="responsibilities-select"
                                className="responsibilities-select"
                                name={`responsibilities.${index}.assign`}
                              />
                            </div>
                            {values.responsibilities.length >= 1 && (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => push({ job: null, assign: "" })}
                      >
                        Add Friend
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div>
                <label htmlFor="requirement-list">Requirements</label>
                <FieldArray name="requirements" id="responsibility-list">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.requirements.length > 0 &&
                        values.requirements.map((sector, index) => (
                          <div key={index}>
                            <div>
                              <label htmlFor="requirements-select">
                                Job applicant would be required to :
                              </label>
                              <Field
                                id="requirements-select"
                                className="requirements-select"
                                name={`requirements.${index}.requires`}
                              />
                            </div>
                            {values.requirements.length >= 1 && (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => push({ job: null, requires: "" })}
                      >
                        Add Friend
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <FormikContol
                control="input"
                name="deadline"
                className="deadline"
                type="date"
                label="Deadline:"
              />{" "}
              <FormikContol
                control="file"
                name="image"
                label="Image:"
                className="image"
              />
              <button type="submit" className="job-seeker_btn btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default RegisterJobForm;
