import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      if (resp?.data?.places?.[0]?.photos?.[4]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          '{NAME}',
          resp.data.places[0].photos[4].name
        );
        setPhotoUrl(PhotoUrl);
      }
    });
  };

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-2 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer">
        <img
          src={photoUrl || '/placeholder.jpg'}
          alt="place"
          className="rounded-xl w-[130px] h-[130px] object-cover"
        />
        <div>
          <h2 className="font-bold text-md">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
          <h2 className="text-sm text-blue-900 mt-5">⌛{place.timeTravel}</h2>
          {/* <Button size="sm"><FaMapLocationDot /></Button> */}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
