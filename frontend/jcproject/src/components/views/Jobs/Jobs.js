import {
  selectCurrentUser_id,
  selectCurrentUser_type,
} from '@/store/features/authSlice/jwtAuthSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Jobs = ({ jobApprovalList, homePage }) => {
  const user_id = useSelector(selectCurrentUser_id)
  const user_type = useSelector(selectCurrentUser_type)
  useEffect(() => {
    return () => {}
  }, [user_id, user_type])
  return !homePage ? (
    <div>
      {jobApprovalList.map((application) => {
        const { job } = application
        const { title, id, publisher } = job
        console.log({ job })
        console.log({ publisher })

        let route = ''
        if (user_id && user_type === 'seeker') {
          route = `/jobs/job/${id}`
        } else if (
          user_type === publisher.user_type &&
          +user_id === publisher.id
        ) {
          route = '/account/log-in'
        } else route = '/account/log-in'

        return (
          <div key={application.id}>
            <Link href={route}>{title}</Link>
          </div>
        )
      })}
    </div>
  ) : (
    <div>generic</div>
  )
}

export default Jobs
