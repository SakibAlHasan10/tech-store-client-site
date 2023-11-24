import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../Config/firebase/firebase.config";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [loadRoom, setLoadRoom] = useState([]);
  const [reviewCount, setReviewCount] = useState([]);
  const [theme, setTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // sign up with email
  const signUpWithEmail = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sign in with email
  const signInWIthEmail = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // user state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      if (currentUser) {
        // TODO: add sever site
        axios
          .post("", loggedUser, {
            withCredentials: true,
          })
          .then(() => {
            // console.log(res.data)
          });
      } else {
        axios
          .post("https://travel-zoo-server.vercel.app/logout", loggedUser, {
            withCredentials: true,
          })
          .then(() => {
            // console.log(res.data)
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);

  // logout
  const logout = () => {
    return signOut(auth);
  };

  const authInfo = {
    theme,
    isLoading,
    user,
    setTheme,
    signInWithGoogle,
    signUpWithEmail,
    signInWIthEmail,
    logout,
    startDate,
    setStartDate,
    loadRoom,
    setLoadRoom,
    reviewCount,
    setReviewCount,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
