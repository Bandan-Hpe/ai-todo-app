
import Image from 'next/image';
import React from 'react'
import { auth } from '../../../auth';

const UserProfile = async () => {
    const session = await auth();
  return (
    <div><Image src={session?.user?.image} width={24} height={24} alt="" className='rounded'/></div>
  )
}

export default UserProfile;