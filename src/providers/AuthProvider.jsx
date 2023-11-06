import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        return signOut(auth);
    }
    const googleSign = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('user', currentUser)
            setLoading(false);
            if(currentUser){
                const loggedUser = {
                    email: currentUser.email
                }
               
                fetch(" https://car-doctor-server-bpwwszfl3-abu-hosains-projects.vercel.app/jwt", {
                    method: "POST",
                    headers:{
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(loggedUser)
                })
                .then(res => res.json())
                .then(data => {
                    console.log("jwt response", data)
                    localStorage.setItem('car-access-token', data.token)
                    
                })
            }else{
                localStorage.removeItem('car-access-token');
            }
        });
        return () => {
            return unsubscribe()
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSign,
        logOut
    }
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;