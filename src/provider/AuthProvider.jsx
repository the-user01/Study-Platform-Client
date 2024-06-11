import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // code taken
    const [token, setToken] = useState(null)
    const [justLoggedIn, setJustLoggedIn] = useState(false)

    /* *** Register User ****/
    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)

            // code taken 
            .then(result => {
                setJustLoggedIn(true);
                return result;
            })
    }

    /* *** User Login *****/
    const signIn = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)

            // code taken 
            .then(result => {
                setJustLoggedIn(true);
                return result;
            })
    }

    /* *******  Google Sign In ********  */
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider)

            // code taken 
            .then(result => {
                setJustLoggedIn(true);
                return result;
            })
    }


    /***** Github signIn ****/
    const githubProvider = new GithubAuthProvider();

    const githubSignIn = () => {
        setLoader(true);
        return signInWithPopup(auth, githubProvider)

        // code taken 
        .then(result => {
            setJustLoggedIn(true);
            return result;
        })
    }


    /* *** User Profile Update **** */

    const updateUser = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        })
    }

    /* **** User Sign Out **** */
    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }


    /* *** Observing the user **** */

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)

                            // code taken
                            setToken(res.data.token)
                        }
                    })

                    // code taken
                    .catch(error => {
                        console.error("Faialed to fatch token: ", error);
                        localStorage.removeItem("access-token");
                        setToken(null);
                    });
            }
            else {
                localStorage.removeItem('access-token');

                // code taken 
                setToken(null);
            }
            setLoader(false);
        })

        return () => {
            unSubscribe()
        }

    }, [axiosPublic])


    const authInfo = {
        user,
        loader,
        token,
        justLoggedIn,
        setJustLoggedIn,
        createUser,
        signIn,
        googleSignIn,
        githubSignIn,
        updateUser,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,

}

export default AuthProvider;