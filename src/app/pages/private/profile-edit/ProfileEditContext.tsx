// src/pages/admin/ProfileEditContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProfileModel } from "../../../models/ProfileModel";

// Define the shape of the context
interface ProfileEditContextProps {
  profile: ProfileModel;
  setProfile: React.Dispatch<React.SetStateAction<ProfileModel>>;
}

// Create the context with default values
const ProfileEditContext = createContext<ProfileEditContextProps | undefined>(
  undefined
);

// Custom hook to use the ProfileEditContext
const useProfileEdit = (): ProfileEditContextProps => {
  const context = useContext(ProfileEditContext);
  if (!context) {
    throw new Error("useProfileEdit must be used within a ProfileEditProvider");
  }
  return context;
};

// Provider component
const ProfileEditProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize profile with default empty strings
  const [profile, setProfile] = useState<ProfileModel>(new ProfileModel());

  return (
    <ProfileEditContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileEditContext.Provider>
  );
};

export { ProfileEditProvider, useProfileEdit };
