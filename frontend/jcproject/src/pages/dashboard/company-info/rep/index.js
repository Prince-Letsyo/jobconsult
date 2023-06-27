import PutJobForm from '@/components/crud/Job/PutJobForm'
import RegisterJobForm from '@/components/crud/Job/RegisterJobForm'
import RegisterCompanyInfoForm from '@/components/crud/company/RegisterCompanyInfoForm'
import FormContainer from '@/components/forms/FormContainer'
import { selectCurrentUser_id } from '@/store/features/authSlice/jwtAuthSlice'
import { useGetCompanyInfoByCompanyInfoIdQuery } from '@/store/features/companyInfoSlice'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Rep = () => {
  const user_id = useSelector(selectCurrentUser_id)


  const {
    data: companyInfoData,
    isSuccess: isSuccessCompanyInfo,
    isLoading: isLoadingCompanyInfo,
  } = useGetCompanyInfoByCompanyInfoIdQuery(user_id ?? skipToken)

  useEffect(() => {
    return () => {}
  }, [user_id, companyInfoData,])

  return !isLoadingCompanyInfo  ? (
    isSuccessCompanyInfo  ? (
      <div>
        <Link href={`/dashboard/company-info/rep/update/${user_id}/`}>
          {user_id && `Company Rep ${user_id}`}
        </Link>
        <div>
          {isSuccessCompanyInfo ? (
            <div>
              {companyInfoData.data.length != 0 ? (
                <div>
                  <Link href={`/dashboard/company-info/company/`}>
                    <div> {companyInfoData.data.company_name}</div>
                  </Link>
                  <hr />
                  <div>
                    {companyInfoData.data.representative.jobs.length != 0 ? (
                      <>
                        {' '}
                        <div>
                          {companyInfoData.data.representative.jobs.map(
                            (company) => {
                              const { id, title } = company
                              return (
                                <div key={id}>
                                  <p>{title}</p>
                                </div>
                              )
                            },
                          )}
                        </div>
                        <FormContainer title={'Job Update'} tale={''} href={''}>
                          <PutJobForm
                            jobData={
                              {
                                user:companyInfoData.data.representative.user,
                                job:companyInfoData.data.representative.jobs[0]
                            }}
                          />
                        </FormContainer>
                      </>
                    ) : (
                      <FormContainer
                        title={'Job application'}
                        tale={''}
                        href={''}
                      >
                        <RegisterJobForm
                          companyRepId={user_id}
                          company={companyInfoData.data}
                        />
                      </FormContainer>
                    )}
                  </div>
                </div>
              ) : (
                <div>Error</div>
              )}
            </div>
          ) : (
            <p>loading....</p>
          )}
        </div>
      </div>
    ) : (
      <div>
        <FormContainer title={'Company registration'} tale={''} href={''}>
          <RegisterCompanyInfoForm
          />
        </FormContainer>
      </div>
    )
  ) : (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Rep
