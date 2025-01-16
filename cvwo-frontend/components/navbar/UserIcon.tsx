// import { LuUser } from 'react-icons/lu';
// import Image from 'next/image';
// import { fetchProfileImage } from '@/utils/actions';
// async function UserIcon() {
//   const profileImage = await fetchProfileImage();
//   if (profileImage) {
//     return <Image src={profileImage} alt='profile' width={24} height={24} className='rounded-full object-cover' />;
//   } else {
//     return <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />;
//   }
// }
// export default UserIcon;

'use client';

import { LuUser } from 'react-icons/lu';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

// This is the component that displays the user's profile image or a default icon if the user does not have a profile image.
function UserIcon() {
  const { user } = useUser();

  if (user && user.imageUrl) {
    return <Image src={user.imageUrl} alt='profile' width={24} height={24} className='rounded-full object-cover' />;
  } else {
    return <LuUser className='w-6 h-6 bg-primary rounded-full text-white' />;
  }
}

export default UserIcon;
