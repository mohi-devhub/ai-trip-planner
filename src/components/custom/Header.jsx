import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";



function Header() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
    onSuccess: async (codeResp) => {
      console.log(codeResp); // Access token is logged here
      await GetUserProfile(codeResp); // Fetch user profile after login
    },
    onError: (error) => console.log(error),
  });

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
      window.location.reload(); 
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      toast("Failed to fetch user profile. Please try again.", { type: "error" });
    }
  };

  return (
    <div className="p-4 shadow-sm flex justify-between items-center w-full px=5 pb-5">
      <img src="/logo.svg" />
      <div>{user ? <div className="flex items-center gap-4">
        <a href="/create-trip">
        <Button variant="outline" className="rounded-full">+ Create Trip</Button>
        </a>

        <a href="/my-trips">
        <Button variant="outline" className="rounded-full">My Trips</Button>
        </a>
        
        <Popover>
        <PopoverTrigger><img src={user?.picture || "/placeholder.jpg"} className="h-[35px] w-[35px] rounded-full"/></PopoverTrigger>
        <PopoverContent className="size-auto" ><h2 className="cursor-pointer"onClick={()=>{
          googleLogout();
          localStorage.clear();
          window.location.reload();

        }}>Logout</h2></PopoverContent>
      </Popover>

      </div> : <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>}</div>
      
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

export default Header;
