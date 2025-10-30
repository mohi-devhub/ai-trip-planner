import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Placestovisit from '../components/Placestovisit';
import Footer from '../components/Footer';



function Viewtrip() {

    const {tripId}= useParams();
    const[trip, setTrip]=useState([]);

    /**
     * Used to get trip data from firestore
     */
    const GetTripData=async()=>{
        const docRef=doc(db, 'AITrips', tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:" ,docSnap.data());
            setTrip(docSnap.data());
    }
    else{
        console.log('No such document');
        toast('No trip found')
    }
}

    useEffect(() => {
        tripId&&GetTripData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripId]);

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/*Information Section*/}
        <InfoSection trip={trip} />


         {/*Recommended Hotels*/}
        <Hotels trip={trip} />

          {/*Daily Plan*/}
        <Placestovisit trip={trip} />


           {/*Footer*/}
        <Footer trip={trip}/>
    </div>
  )
}


export default Viewtrip