// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   PropsWithChildren,
// } from "react";
// import { Session } from "@supabase/supabase-js";
// import { supabase } from "../lib/supabase";

// type AuthContextType = {
//   session: Session | null;
//   loading: boolean;
// };

// const AuthContext = createContext<AuthContextType>({
//   session: null,
//   loading: true,
// });

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }: PropsWithChildren) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch the initial session
//     const fetchSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setSession(session);
//       setLoading(false);
//     };

//     fetchSession();

//     // Listen for auth state changes (login, logout)
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     // Cleanup subscription on unmount
//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ session, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   PropsWithChildren,
// } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type User = {
//   id: string;
//   name?: string;
//   email?: string;
// };

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
//   login: (userData: User) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   login: () => {},
//   logout: () => {},
// });

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }: PropsWithChildren) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load saved session from storage on app start
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const savedUser = await AsyncStorage.getItem("user");
//         if (savedUser) {
//           setUser(JSON.parse(savedUser));
//         }
//       } catch (err) {
//         console.error("Error loading user:", err);
//       }
//       setLoading(false);
//     };
//     loadUser();
//   }, []);

//   const login = async (userData: User) => {
//     setUser(userData);
//     await AsyncStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = async () => {
//     setUser(null);
//     await AsyncStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  session: User | null; // Add session for consistency
  loading: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load saved session from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

   const logout = async () => {
     try {
       // Call your backend logout API if needed
       await fetch("https://mec-eatz.onrender.com/api/logout", {
         method: "POST",
         credentials: "include",
       });
     } catch (error) {
       console.error("Logout API error:", error);
     } finally {
       // Always clear local storage regardless of API call success
       setUser(null);
       await AsyncStorage.removeItem("user");
     }
   };

  return (
    <AuthContext.Provider
      value={{
        user,
        session: user, // session is the same as user
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};