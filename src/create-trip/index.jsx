import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
    onSuccess: async (codeResp) => {
      console.log(codeResp); // Access token is logged here
      await GetUserProfile(codeResp); // Fetch user profile after login
    },
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      formData?.noOfDays > 10 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the fields accurately", { type: "error" });
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();

    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID,
    });
    setLoading(false);
    navigate('/view-trip/'+docID);

  };

  const GetUserProfile = async (tokenInfo) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        },
      }
    );
    console.log(response); 
    localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in local storage
    setOpenDialog(false); // Close the dialog
    OnGenerateTrip(); // Proceed to generate the trip
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    toast("Failed to fetch user profile. Please try again.", { type: "error" });
  }
};
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 ml-20 mr-20 mt-10">
      <h2 className="font-bold text-3xl">
        Get Started with Your Dream Tripᯓ ✈︎
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        To help our AI craft the perfect itinerary for you, simply enter a few
        basic details about your trip. Once you’ve entered these details, our AI
        will work its magic to create a personalized travel plan just for you!
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl mt-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are your planning for trip?
          </h2>
          <Input
            placeholder={"We support max 10 days"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">Select Your Budget</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer 
              rounded-lg hover:shadow-lg
              ${formData?.budget == item.title && "shadow-lg border-black "}
              `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          How Many People Are Traveling?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer 
                rounded-lg hover:shadow-lg
                ${
                  formData?.traveler == item.people && "shadow-lg border-black "
                }
                `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Sign in to continue</DialogTitle>
      <DialogDescription asChild>
        <div>
          <img src="/logo.svg" alt="Logo" />
          <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
          <Button
            onClick={login}
            className="w-full mt-5 flex gap-4 items-center"
          >
            <FcGoogle className="h-7 w-7" />
            Sign in with Google
          </Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  );
}
export default CreateTrip;
