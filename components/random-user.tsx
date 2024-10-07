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
  const [user, setUser] = useState<User | null>(null); // State to manage the fetched user
  const [loading, setLoading] = useState<boolean>(false); // State to manage the loading state
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [appreciationVisible, setAppreciationVisible] =
    useState<boolean>(false); // State to manage appreciation message visibility

  // Function to fetch a random user
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
        description: fetchedUser.login.uuid, // Using UUID as a placeholder for description
      };
      setUser(newUser);
    } catch (err) {
      setError("Failed to fetch user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a random user when the component mounts
  useEffect(() => {
    fetchRandomUser();
  }, []);

  // Function to handle appreciation button click
  const handleAppreciate = () => {
    setAppreciationVisible(true);
    setTimeout(() => setAppreciationVisible(false), 2000); // Hide after 2 seconds
  };

  // JSX return statement rendering the Random User UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 text-foreground">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Random User Generator</h1>
      <p className="text-gray-700 mb-8 text-lg text-center">
        Click the button below to fetch a random user profile.
      </p>
      <Button
        onClick={fetchRandomUser}
        className="mb-6 px-6 py-3 font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition"
      >
        Fetch New User
      </Button>
      {loading && (
        <div className="flex items-center justify-center space-x-2 mb-6">
          <ClipLoader size={30} className="w-8 h-8 text-blue-500" />
          <span className="text-blue-600 font-medium">Loading...</span>
        </div>
      )}
      {error && <div className="text-red-500 text-lg mb-6">{error}</div>}
      {user && (
        <Card className="border-0 shadow-xl rounded-lg overflow-hidden max-w-sm relative bg-white transform hover:scale-105 transition-all duration-300 ease-in-out">
          <CardHeader className="h-36 bg-gradient-to-r from-green-400 to-teal-500 relative">
            <Image
              src={user.image}
              alt={user.name}
              width={90}
              height={90}
              className="rounded-full border-4 border-white shadow-md absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
            />
          </CardHeader>
          <CardContent className="p-6 pt-16 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center justify-center space-x-2">
              <UserIcon className="text-teal-500" />
              <span>{user.name}</span>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2 flex items-center justify-center space-x-2">
              <MailIcon className="text-teal-400" />
              <span>{user.email}</span>
            </CardDescription>
            <div className="text-sm text-gray-600 mt-4 flex items-center justify-center space-x-2">
              <MapPinIcon className="text-teal-400" />
              <span>{user.address}</span>
            </div>
            <div className="text-sm text-gray-600 mt-4 flex items-center justify-center space-x-2">
              <InfoIcon className="text-teal-400" />
              <span>{user.description}</span>
            </div>
            <Button
              variant="outline"
              className="mt-6 px-4 py-2 border border-teal-400 text-teal-500 hover:bg-teal-100 transition"
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
                  {/* Footer section */}
                  <footer className="mt-4 text-sm text-muted-foreground">
        Created By Ismail Ahmed Shah
      </footer>

    </div>
  );
};

export default RandomUser;