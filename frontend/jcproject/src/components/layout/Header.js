import { useGetUsersQuery } from '@/store/features/userSlice';
import React from 'react'

const Header = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");
  return (
    <div>Header</div>
  )

  
}

export default Header