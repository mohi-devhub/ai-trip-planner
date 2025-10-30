import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel, index }) {
  const [photoUrl, setPhotoUrl] = useState();

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[4].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  useEffect(() => {
    hotel && GetPlacePhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div
        className="hover:scale-105 transition-all cursor-pointer"
        key={index}
      >
        <img src={photoUrl || "/placeholder.jpg"} alt="Hotel" className="rounded-xl h-[180px] w-full object-cover" />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰{hotel?.price}</h2>
          <h2 className="text-sm">⭐{hotel?.rating} stars</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;

