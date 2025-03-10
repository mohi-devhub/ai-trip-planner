import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function Placestovisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-5">Places to visit</h2>

      <div>
        {trip?.tripData?.travelPlan?.itinerary &&
          Object.entries(trip.tripData.travelPlan.itinerary).map(
            ([day, details], index) => (
              <div key={index} className="mt-5">
                <h2 className="font-bold text-lg">{day}</h2>
                <div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-5">
                {details.places?.map((place, index) => (
                  <div key={index} className="my-3">
                    <PlaceCardItem place={place}/>
                  </div>
                ))}
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default Placestovisit;



