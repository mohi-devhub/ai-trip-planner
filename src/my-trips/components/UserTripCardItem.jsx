import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all '>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='object-cover rounded-xl h-[220px] w-full'/>
        <div>
            <h2 className='font-bold text-md'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-700'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem