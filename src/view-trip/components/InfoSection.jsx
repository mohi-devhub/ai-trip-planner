import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react'
import { IoShareSocial } from "react-icons/io5";


function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl]=useState();

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }

    await GetPlaceDetails(data).then(resp=>{console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
      setPhotoUrl(PhotoUrl);
    })

  }

  useEffect(() => {
    trip&&GetPlacePhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[trip])

  return (
    <div>
      <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl'/>
      <div className='flex justify-between items-center '>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>📅{trip.userSelection?.noOfDays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>💸{trip.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg'>✈️No of Travelers: {trip.userSelection?.traveler} </h2>
          </div>
        </div>
        <Button variant="outline"><IoShareSocial /></Button>
      </div>
    </div>
  )
}

export default InfoSection