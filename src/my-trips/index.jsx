import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

  const navigation=useNavigation();
  const [UserTrips,setUserTrips]=useState([]);
  
  const GetUserTrips=async()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    

    if(!user){
      navigation('/');
      return;
    }

    
    const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal=>[...prevVal,doc.data()]);
        });
  }

  useEffect(() => {
    GetUserTrips()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (

    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 ml-20 mr-20 mt-10'>
      <h2 className='font-bold text-3xl '>MyTrips</h2>

      <div className='grid grid-cols-2   md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10'>
        {UserTrips?.length>0?UserTrips.map((trip,index)=>(
          <UserTripCardItem trip={trip} key={index}/>
          ))
        :[1,2,3,4].map((item,index)=>(
            <div key={index} className='h-[220px] w-full bg-gray-200 animate-pulse rounded-xl'>
            </div>
        ))
          }

      </div>
    </div>
  )
}

export default MyTrips