import {
  useChangeJobSeekerInfoMutation,
  useGetJobSeekerByJobSeekerIdQuery,
} from '@/store/features/jobSeekerSlice'
import { useDeleteSectorInfoMutation } from '@/store/features/sectorSlice'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { jobSeekerUpdateSchema } from '@/utils/jobSeeker'
import { useEffect, useRef, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { Spinner } from 'react-bootstrap'
import FormikContol from '@/components/forms/FormikContol'
import {
  useGetCitiesQuery,
  useGetGenricChoiceQuery,
  useGetNationalityQuery,
} from '@/store/features/choices'

const PutJobSeekerForm = ({ user_id }) => {
  const router = useRouter()
  const sectorRef = useRef(null)
  const [deleteSector, setDeleteSector] = useState([])
  const [jobSector_sector, setJobSector_sector] = useState('')
  const [
    changeJobSeekerInfo,
    { isLoading: jobSeekerIsLoading },
  ] = useChangeJobSeekerInfoMutation()

  const [deleteSectorInfo, {}] = useDeleteSectorInfoMutation()
  const {
    data: jobSeeker,
    isSuccess: isSuccessJobSeekerData,
  } = useGetJobSeekerByJobSeekerIdQuery(user_id ?? skipToken)

  const {
    data: citiesData,
    isLoading: citiesIsLoading,
    isSuccess: citiesIsSuccess,
  } = useGetCitiesQuery(jobSeeker?.data.nationality ?? skipToken)
  const {
    data: sexData,
    isLoading: isLoadingSex,
    isSuccess: isSuccessSex,
  } = useGetGenricChoiceQuery('sex')
  const {
    data: qualicationData,
    isLoading: isLoadingQualication,
    isSuccess: isSuccessQualication,
  } = useGetGenricChoiceQuery('qualication')
  const {
    data: sectorData,
    isLoading: isLoadingSector,
    isSuccess: isSuccessSector,
  } = useGetGenricChoiceQuery('sector')
  const {
    data: nationalityData,
    isLoading: isLoadingNationality,
    isSuccess: isSuccessNationality,
  } = useGetNationalityQuery()


  useEffect(() => {
    return () => {}
  }, [
    jobSeeker,
    deleteSector,
    sexData,
    qualicationData,
    sectorData,
    nationalityData,
    citiesData,
  ])

  return isSuccessJobSeekerData &&
    isSuccessSex &&
    isSuccessQualication &&
    isSuccessSector &&
    citiesIsSuccess &&
    isSuccessNationality ? (
    !jobSeekerIsLoading &&
    !isLoadingSex &&
    !isLoadingQualication &&
    !isLoadingNationality &&
    !citiesIsLoading &&
    !isLoadingSector ? (
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...jobSeeker.data,
          cityArr: citiesData.data,
        }}
        // validationSchema={jobSeekerUpdateSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            changeJobSeekerInfo(values)
              .unwrap()
              .then((payload) => {
                deleteSector.every((sector) => {
                  if (sector?.id !== undefined)
                    return deleteSectorInfo(sector.id)
                })
                router.push(`/dashboard/jobseeker/`)
              })
              .catch((error) => {
                console.log(error)
              })
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ values, errors }) => {
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
                name="user.phone_number"
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
                control="select"
                name="nationality"
                className="nationality"
                label="Nationality:"
                options={nationalityData.data}
              />
              <FormikContol
                control="select"
                name="city"
                className="city"
                label="City:"
                options={values.cityArr}
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
                                  ),
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
                                  ])
                                  remove(index)
                                }}
                              >
                                x
                              </div>
                            )}
                          </div>
                        ))}
                      <div>
                        <div className={'input-container'}>
                          <label htmlFor={'job_sector_sector'}>Sector:</label>
                          <select
                            className={`job_sector_sector`}
                            id={`job_sector_sector`}
                            ref={sectorRef}
                            onChange={(e) =>
                              setJobSector_sector(e.target.value)
                            }
                          >
                            {sectorData.data.map(({ key, value }, index) => (
                              <option key={index} value={key}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div
                          type="button "
                          className="btn btn-outline-success"
                          onClick={() => {
                            let { job_sector } = values
                            let sectorPush = {
                              seeker: +user_id,
                              sector: sectorRef.current.value,
                            }
                            job_sector.forEach((sector) => {
                              if (sector.sector == sectorRef.current.value)
                                sectorRef.current.value = ''
                            })
                            let newSectorList = []
                            for (let x = 0; x < deleteSector.length; x++) {
                              const element = deleteSector[x]
                              if (element?.sector == sectorRef.current.value) {
                                sectorPush = element
                              } else {
                                newSectorList.push(element)
                              }
                            }
                            setDeleteSector(newSectorList)

                            if (sectorRef.current.value != '') push(sectorPush)
                            sectorRef.current.value = ''
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
          )
        }}
      </Formik>
    ) : (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Updating...</span>
      </Spinner>
    )
  ) : (
    <div>Loading...</div>
  )
}

export default PutJobSeekerForm
