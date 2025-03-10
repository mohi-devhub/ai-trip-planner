export const SelectTravelesList = [
    {   
        id: 1,
        title: 'Just Me',
        desc: 'A sole traveler in exploration',
        icon: '🚶',
        people: '1 person'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'A romantic getaway for two',
        icon: '👩🏻‍❤️‍👨🏻',
        people: '2 people'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A fun trip for the whole family',
        icon: '👨‍👩‍👧‍👦',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'An adventure with friends',
        icon: '🫂',
        people: '5 to 10 people'
    }
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Budget-friendly options',
        icon: '💸',
        range: '$'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balanced cost and comfort',
        icon: '💵',
        range: '$$'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium and luxurious options',
        icon: '💰',
        range: '$$$'
    }
];

export const AI_PROMPT='Generate Travel Plan for Location:{location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details. Place Image Url. Geo Coordinates ticket Pricing ,rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'