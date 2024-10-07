"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import { MailIcon, MapPinIcon, UserIcon, InfoIcon } from "lucide-react";

interface User {
  name: string;
  email: string;
  address: string;
  image: string;
  description: string;
}

const RandomUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appreciationVisible, setAppreciationVisible] =
    useState<boolean>(false);

  const fetchRandomUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const fetchedUser = data.results[0];
      const newUser: User = {
        name: `${fetchedUser.name.first} ${fetchedUser.name.last}`,
        email: fetchedUser.email,
        address: `${fetchedUser.location.street.number} ${fetchedUser.location.street.name}, ${fetchedUser.location.city}, ${fetchedUser.location.country}`,
        image: fetchedUser.picture.large,
        description: fetchedUser.login.uuid,
      };
      setUser(newUser);
    } catch (err) {
      setError("Failed to fetch user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const handleAppreciate = () => {
    setAppreciationVisible(true);
    setTimeout(() => setAppreciationVisible(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide text-center">
        Random User Generator
      </h1>
      <p className="text-lg mb-8 text-center text-gray-200">
        Click the button below to fetch a random user profile.
      </p>
      <Button
        onClick={fetchRandomUser}
        className="bg-white text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300 px-6 py-3 rounded-full mb-6 shadow-lg"
      >
        Fetch New User
      </Button>
      {loading && (
        <div className="flex items-center justify-center mb-6">
          <ClipLoader className="w-8 h-8 mr-2" color="white" />
          <span>Loading...</span>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {user && (
        <Card className="border-0 shadow-xl rounded-xl overflow-hidden max-w-sm relative bg-white text-gray-800">
          <CardHeader className="h-36 bg-gradient-to-r from-green-400 to-blue-400 relative">
            <Image
              src={user.image}
              alt={user.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
            />
          </CardHeader>
          <CardContent className="p-6 pt-12 text-center">
            <CardTitle className="text-2xl font-bold flex items-center justify-center">
              <UserIcon className="mr-2 text-blue-600" /> {user.name}
            </CardTitle>
            <CardDescription className="text-gray-600 flex items-center justify-center mt-2">
              <MailIcon className="mr-2 text-blue-600" /> {user.email}
            </CardDescription>
            <div className="text-gray-600 text-sm mt-4 flex items-center justify-center">
              <MapPinIcon className="mr-2 text-blue-600" /> {user.address}
            </div>
            <div className="text-gray-600 text-sm mt-4 flex items-center justify-center">
              <InfoIcon className="mr-2 text-blue-600" /> {user.description}
            </div>
            <Button
              variant="outline"
              className="mt-6 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 px-4 py-2 rounded-md"
              onClick={handleAppreciate}
            >
              Appreciate
            </Button>
          </CardContent>
          <CSSTransition
            in={appreciationVisible}
            timeout={300}
            classNames="appreciation"
            unmountOnExit
          >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90">
              <h2 className="text-3xl font-bold text-black animate-bounce">
                ❤️ Thank you ✨
              </h2>
            </div>
          </CSSTransition>
        </Card>
      )}
      <div className="mt-10 text-center text-gray-300">
  <p className="text-base">
    Created By{" "}
    <span className="font-semibold">
      Ismail Ahmed Shah
    </span>
  </p>
</div>

    </div>
  );
};

export default RandomUser;
