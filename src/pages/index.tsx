import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const TOKEN = Cookies.get("jwt");
    if(TOKEN){
      router.push("/profile")
    }
    else{
      router.push("/login")
    }
  },[router]);

  return null;
}
