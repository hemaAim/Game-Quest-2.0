import { useState, useEffect } from "react"
import { app } from "../firabase.config";
import { getAuth, updateProfile, User } from "firebase/auth"
import { useRouter } from "next/navigation"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firabase.config";
import { useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import Image from "next/image";
import { Orbitron } from "next/font/google";



type UserProps = 
{ 
   email: string, 
   nome: string, 
   password: string
}


