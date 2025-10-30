import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-3">Hotel Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
