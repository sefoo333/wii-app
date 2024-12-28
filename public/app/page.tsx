"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "./_config/confg";
import { doc, setDoc } from "firebase/firestore";
import { closeSnackbar, enqueueSnackbar, SnackbarProvider } from 'notistack';

export default function Home() {
  let [seepassword, setPassword] = useState(true)
  let [Email, setEmail] = useState(false)
  let [signup, setchange] = useState(true)







  let [email2, setEmail2] = useState("");
  let [password2, setPassword2] = useState("");
  let [name, setName] = useState("");

  useEffect(() => {
    const authy = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("wow")
        setTimeout(() => {
          window.open("/home", "_parent")
        }, 1500)
      } else {
        console.log("error")
      }
      console.log(user);
    })
    return () => {
      authy()
    }
  }, [])



  const signUp = async () => {
    createUserWithEmailAndPassword(auth, email2, password2).then((res) => {
      console.log(res)
      const log = async () => {
        await setDoc(doc(db, "users", `${res.user.uid}`), {
          userId: res.user.uid,
          userName: res.user.displayName,
          userImage: res.user.photoURL,
          userForms: []
        })
      }
      log()
    })
  }
  const signIn = async () => {
    try {
      signInWithEmailAndPassword(auth, email2, password2).then((user) => {
        console.log(user)
      })
    } catch {
      const test = enqueueSnackbar('The Email or password is invalid', {
        variant: 'error',
        persist: true
      })

      setTimeout(() => {
        closeSnackbar(test)
      }, 3000)
    }
  }


  const authByGoogle = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((res) => {
      console.log(res)

      const log = async () => {
        await setDoc(doc(db, "users", `${res.user.uid}`), {
          userId: res.user.uid,
          userName: res.user.displayName,
          userImage: res.user.photoURL,
          userForms: []
        })

      }
      log()
    })
  }
  const authBygithub = async () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider).then((res: any) => {
      console.log(res)
      const log = async () => {
        await setDoc(doc(db, "users", `${res.user.uid}`), {
          userId: res.user.uid,
          userName: res.user.reloadUserInfo.screenName,
          userImage: res.user.photoURL,
          userForms: []
        })

      }
      log()
    })


  }



  document.body.style.overflowY = "hidden"






  return (
    <>
      <SnackbarProvider />
      <img src="/pexels-francesco-ungaro-2325447.jpg" className=" w-full h-full fixed object-cover before:absolute before:w-full before:h-full befor:bg-black" alt="" />
      <div className="windw fixed w-full h-full bg-[#00000059] "></div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full">
        <div className="mx-auto max-w-lg shadow-lg pt-[35px] rounded-[20px] bg-slate-200">
          {signup ? (<h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Sign Up !</h1>) : (<h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Sign in !</h1>)}

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500" onClick={() => signOut(auth)}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
            inventore quaerat mollitia?
          </p>

          <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8" onSubmit={(e: any) => {
            e.preventDefault()
          }}>
            {
              signup ?
                (
                  <>
                    <p className="text-center text-lg font-medium">Sign up to your account</p>
                    <div>
                      <label htmlFor="text" className="sr-only">username</label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                          placeholder="Type your name"
                          required
                          onChange={(e: { target: { value: string } }) => {
                            setName(e.target.value)
                          }}
                        />


                      </div>
                    </div>
                  </>
                )
                :
                (
                  <p className="text-center text-lg font-medium">Sign in to your account</p>
                )
            }
            <div>
              <label htmlFor="email" className="sr-only">Email</label>

              <div className="relative">
                <input
                  onChange={(a) => {
                    a.target.value.match(/\w+@\w+\.\w{3}/g) ? setEmail(true) : setEmail(false)
                    setEmail2(a.target.value)
                  }

                  }
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                  placeholder="Type your email"

                />


                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
              {!Email ? (<p className="text-red-600 pl-4 pt-[10px] text-[13px]">Write a vaild email</p>) : null}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>

              <div className="relative">
                <input
                  type={seepassword ? "password" : "text"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                  placeholder="Type your password"
                  required
                  onChange={(e) => {
                    setPassword2(e.target.value)
                  }}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer">
                  {seepassword ? (<FaEye onClick={() => setPassword(false)} />) : (<FaEyeSlash onClick={() => setPassword(true)} />)}
                </span>
              </div>
            </div>

            {signup ? (<>   <Link href="/">
              <button
                type="submit"

                className="block w-full rounded-lg mt-[10px] bg-[#00C9FF] px-5 py-3 text-sm font-medium text-white"
                onClick={() => {
                  signUp()
                }}
              >
                Sign up
              </button>
            </Link>

              <p className="text-center text-sm text-gray-500">
                Have A account?
                <a className="underline" href="#" onClick={() => setchange(false)}>Sign in</a>
              </p></>)
              :
              (
                <>
                  <Link href="/">
                    <button
                      type="submit"
                      className="block w-full rounded-lg mt-[10px] bg-[#00C9FF] px-5 py-3 text-sm font-medium text-white"
                      onClick={() => {
                        signIn()
                      }}
                    >
                      Sign in
                    </button>
                  </Link>

                  <p className="text-center text-sm text-gray-500">
                    Done't Have a account ?
                    <a className="underline" href="#" onClick={() => setchange(true)}>Sign up</a>
                  </p>
                </>
              )
            }
            <span className="flex items-center">
              <span className="h-px flex-1 bg-black"></span>
              <span className="shrink-0 px-6">Or</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>

            <div className="social_links flex justify-center gap-3">
              <FcGoogle className="text-[30px] cursor-pointer rounded-full bg-slate-50 w-[40px] p-2 h-[40px] flex justify-center items-center transition hover:bg-slate-100" onClick={() => authByGoogle()} />
              <FaGithub className="text-[30px] cursor-pointer rounded-full bg-slate-50 w-[40px] p-2 h-[40px] flex justify-center items-center transition hover:bg-slate-100" onClick={() => authBygithub()} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}