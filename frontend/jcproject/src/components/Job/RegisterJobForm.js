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

const RegisterJobForm = () => {
  const {
    data: companies,
    isLoading: isLoadingCompany,
    isSuccess: isSuccessCompany,
    isError: isErrorCompany,
    error: errorCompany,
  } = useGetCompanyInfosQuery("getCompanyInfos");
  const router = useRouter();
  const { userId } = router.query;
  const { data: userData } = useGetUserByUserIdQuery(userId);

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

  return (
    <Formik
      initialValues={{ ...jobInitials, type_of_publisher: userData.user_type }}
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
          } = await useGetJobRequirementsQuery("getJobRequirements").unwrap();

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
        <Form>
          <Field name="title">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="title">Job title:</label>
                <input
                  type="text"
                  placeholder="Job title"
                  id="title"
                  className="title"
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
              <div>
                <label htmlFor="location">Job location:</label>
                <input
                  type="text"
                  placeholder="Job location"
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
          <Field name="description">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="description">description:</label>
                <textarea id="description" className="description" {...field} />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <div>
            <label htmlFor="sector-select">Company Name:</label>
            <Field
              component="select"
              id="sector-select"
              className="sector-job"
              name={`sector`}
            >
              <option value="">......select......</option>
              {companies?.length &&
                companies.map((company, index) => (
                  <option value={company.id}>{company.company_name}</option>
                ))}
            </Field>
          </div>
          <div>
            <label htmlFor="sector-select">Sector:</label>
            <Field
              component="select"
              id="sector-select"
              className="sector-job"
              name={`sector`}
            >
              <option value="">......select......</option>
              <option value="advertising-media-communications">
                Advertising, Media & Communications
              </option>
              <option value="agriculture-fishing-forestry">
                Agriculture, Fishing & Forestry
              </option>
              <option value="automotive-aviation">Automotive & Aviation</option>
              <option value="banking-finance-insurance">
                Banking, Finance & Insurance
              </option>
              <option value="construction">Construction</option>
              <option value="education">Education</option>
              <option value="enforcement-security">
                Enforcement & Security
              </option>
              <option value="entertainment-events-sport">
                Entertainment, Events & Sport
              </option>
              <option value="government">Government</option>
              <option value="healthcare">Healthcare</option>
              <option value="hospitality-hotel">Hospitality & Hotel</option>
              <option value="it-telecoms">IT & Telecoms</option>
              <option value="law-compliance">Law & Compliance</option>
              <option value="manufacturing-warehousing">
                Manufacturing & Warehousing
              </option>
              <option value="mining-energy-metals">
                Mining, Energy & Metals
              </option>
              <option value="ngo-npo-charity">NGO, NPO & Charity</option>
              <option value="real-estate">Real Estate</option>
              <option value="recruitment">Recruitment</option>
              <option value="retail-fashion-fmcg">
                Retail, Fashion & FMCG
              </option>
              <option value="shipping-logistics">Shipping & Logistics</option>
              <option value="tourism-travel">Tourism & Travel</option>
            </Field>
          </div>
          <div>
            <label htmlFor="type_of_job">Job function:</label>
            <Field
              component="select"
              id="type_of_job"
              className="type_of_job"
              name="type_of_job"
            >
              <option value="">......select......</option>
              <option value="accounting-auditing-finance">
                Accounting Auditing & Finance
              </option>
              <option value="admin-office">Admin & Office</option>
              <option value="building-architecture">
                Building & Architecture
              </option>
              <option value="community-social-services">
                Community & Social Services
              </option>
              <option value="consulting-strategy">Consulting & Strategy</option>
              <option value="creative-design">Creative & Design</option>
              <option value="customer-service-support">
                Customer Service & Support
              </option>
              <option value="driver-transport-services">
                Driver & Transport Services
              </option>
              <option value="engineering-technology">
                Engineering & Technology
              </option>
              <option value="estate-agent-property-management">
                Estate Agents & Property Management
              </option>
              <option value="farming-agriculture">Farming & Agriculture</option>
              <option value="food-services-catering">
                Food Services & Catering
              </option>
              <option value="health-safety">Health & Safety</option>
              <option value="hospitality-leisure">Hospitality & Leisure</option>
              <option value="legal-services">Legal Services</option>
              <option value="management-business-development">
                Management & Business Development
              </option>
              <option value="marketing-communications">
                Marketing & Communications
              </option>
              <option value="medical-pharmaceutical">
                Medical & Pharmaceutical
              </option>
              <option value="product-project-management">
                Product & Project Management
              </option>
              <option value="quality-control-assurance">
                Quality Control & Assurance
              </option>
              <option value="research-teaching-training">
                Research, Teaching & Training
              </option>
              <option value="sales">Sales</option>
              <option value="software-data">Software & Data</option>
              <option value="supply-chain-procurement">
                Supply Chain & Procurement
              </option>
              <option value="trades-services">Trades & Services</option>
            </Field>
          </div>
          <Field name="deadline">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="deadline">Deadline: </label>
                <input
                  type="date"
                  placeholder="deadline"
                  id="deadline"
                  className="deadline"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <div>
            <label htmlFor="minimum_qualification">
              Minimum qualification:
            </label>
            <Field
              component="select"
              id="minimum_qualification"
              className="minimum_qualification"
              name="minimum_qualification"
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
          <Field name="experience_length">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="experience_length">
                  Year(s) of Experience :
                </label>
                <input
                  type="number"
                  id="experience_length"
                  className="experience_length"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field name="number_of_required_applicantion">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
                <label htmlFor="number_of_required_applicantion">
                  Number of required Applicant:
                </label>
                <input
                  type="number"
                  id="number_of_required_applicantion"
                  className="number_of_required_applicantion"
                  {...field}
                />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>

          <div>
            <label htmlFor="minimum_qualification"> Qualification:</label>
            <Field
              component="select"
              id="minimum_qualification"
              className="minimum_qualification"
              name="minimum_qualification"
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
                            <button type="button" onClick={() => remove(index)}>
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
                            <button type="button" onClick={() => remove(index)}>
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
          <Field name="years_of_experience">
            {({ field, form: { touched, errors }, meta }) => (
              <div>
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
        </Form>
      )}
    </Formik>
  );
};

export default RegisterJobForm;
