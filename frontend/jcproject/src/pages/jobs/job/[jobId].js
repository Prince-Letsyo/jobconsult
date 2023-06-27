import JobApplication from '@/components/views/Jobs/JobApplication'
import {
  selectCurrentUser_id,
  selectCurrentUser_type,
} from '@/store/features/authSlice/jwtAuthSlice'
import { useAddNewJobApplicationMutation } from '@/store/features/jobApplicationSlice'
import { useGetJobSeekerByJobSeekerIdQuery } from '@/store/features/jobSeekerSlice'
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
  const {
    data: seekerData,
    isLoading: seekerIsLoading,
    isSuccess: seekerIsSuccess,
  } = useGetJobSeekerByJobSeekerIdQuery(user_id ?? skipToken)

  useEffect(() => {
    return () => {}
  }, [user_id, user_type, jobId, jobData, seekerData])
  return (
    <div>
      {!jobIsLoading && !seekerIsLoading ? (
        jobIsSuccess && seekerIsSuccess ? (
          <div>
            <div>{jobData.data.title}</div>
            <div>
              {user_type !== jobData.data.publisher.user_type ? (
                  <JobApplication
                    user={{ job: jobData.data.id, seeker: seekerData.data.user.id }}
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
