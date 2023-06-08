import JobApplication from '@/components/views/Jobs/JobApplication'
import {
  selectCurrentUser_id,
  selectCurrentUser_type,
} from '@/store/features/authSlice/jwtAuthSlice'
import { useAddNewJobApplicationMutation } from '@/store/features/jobApplicationSlice'
import { useGetJobByJobIdQuery } from '@/store/features/jobsSlice'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const JobPage = () => {
  const user_id = useSelector(selectCurrentUser_id)
  const user_type = useSelector(selectCurrentUser_type)
  const { jobId } = useRouter().query

  const [addNewJobApplication, {}] = useAddNewJobApplicationMutation()
  const {
    data: jobData,
    isLoading: jobIsLoading,
    isSuccess: jobIsSuccess,
  } = useGetJobByJobIdQuery(+jobId ?? skipToken)

  useEffect(() => {
    return () => {}
  }, [user_id, user_type, jobId, jobData])
  return (
    <div>
      {!jobIsLoading ? (
        jobIsSuccess ? (
          <div>
            <div>{jobData.data.title}</div>
            <div>
              {user_type !== jobData.data.publisher.user_type ? (
                <JobApplication
                  user={{ job: jobData.data.id, seeker: user_id }}
                />
              ) : (
                <div>sdfshfsgh</div>
              )}
            </div>
          </div>
        ) : (
          <div>error</div>
        )
      ) : (
        <div>l</div>
      )}
    </div>
  )
}

export default JobPage
