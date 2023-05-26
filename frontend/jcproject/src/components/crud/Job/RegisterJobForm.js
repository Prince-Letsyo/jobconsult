import FormikContol from "@/components/forms/FormikContol";
import { useGetGenricChoiceQuery } from "@/store/features/api";
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
import { useGetUserByUserIdQuery } from "@/store/features/userSlice";
import { jobInitials, jobRegisterSchema } from "@/utils/job";
import { Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const RegisterJobForm = ({ companyRepId }) => {
  const {
    data: companies,
    isLoading: isLoadingCompanies,
    isSuccess: isSuccessCompanies,
    isError: isErrorCompanies,
  } = useGetCompanyInfosQuery();
  const router = useRouter();
  const { data: userData } = useGetUserByUserIdQuery(companyRepId);

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
            type_of_publisher: userData?.user_type,
          }}
          validationSchema={jobRegisterSchema}
          onSubmit={async (values, actions) => {
            const {
              company_name,
              deadline,
              description,
              experience_length,
              publisher,
              title,
              location,
              sector,
              type_of_job,
              minimum_qualification,
              type_of_employment,
              number_of_required_applicantion,
              responsibilities,
              requirements,
              slug,
              type_of_publisher,
            } = values;
            try {
              await addNewJob({
                company_name,
                deadline,
                description,
                experience_length,
                title,
                location,
                sector,
                type_of_job,
                minimum_qualification,
                type_of_employment,
                number_of_required_applicantion,
                slug,
                type_of_publisher,
                publisher: userData?.id,
              }).unwrap();

              responsibilities.forEach(async (responsibility) => {
                await addNewJobResponsibility({
                  job: dataNewJob.id,
                  assign: responsibility.assign,
                }).unwrap();
              });
              requirements.forEach(async (requirement) => {
                await addNewJobRequirement({
                  job: dataNewJob.id,
                  assign: requirement.assign,
                }).unwrap();
              });
              const {
                isLoading: isLoadingGetJobResponsibilities,
                data: dataGetJobResponsibilities,
              } = await useGetJobResponsibilitiesQuery(
                "getJobResponsibilities"
              ).unwrap();
              const {
                isLoading: isLoadingGetJobRequirements,
                data: dataGetJobRequirements,
              } = await useGetJobRequirementsQuery(
                "getJobRequirements"
              ).unwrap();

              await mutateJobInfo({
                id: dataNewJob.id,
                responsibilities: dataGetJobResponsibilities.map(
                  (responsibility) => dataNewJob.id == responsibility.job
                ),
                requirements: dataGetJobRequirements.map(
                  (requirement) => dataNewJob.id == requirement.job
                ),
              }).unwrap();
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
              />
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
