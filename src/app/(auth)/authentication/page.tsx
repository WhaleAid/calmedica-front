"use client";

import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";
import { useRouter, useSearchParams } from "next/navigation";

export default function Authentication() {
    const searchParams = useSearchParams();
    const step = searchParams.get('step') || 'login'
    const [isRegister, setIsRegister] = useState(step === 'register')
    const [isHovered, setIsHovered] = useState(false)

    const container = useRef<HTMLDivElement>(null)

    const Variants = {
        initial: { y: isRegister ? 0 : 500, opacity: 1 },
        animate: { y: 0, opacity: 1 },
        exit: { y: isRegister ? -500 : 0, opacity: 0 }
    }

    gsap.registerPlugin(Flip);

    const flipFunction = () => {
        if (container.current) {
            const state = Flip.getState(container.current.children);
            (container.current.children[1] as HTMLDivElement).classList.toggle('order-1');
            (container.current.children[0] as HTMLDivElement).classList.toggle('order-2');

            requestAnimationFrame(() => {
                Flip.from(state, {
                    duration: 0.5,
                    ease: "power1.inOut",
                    absolute: true,
                    onComplete: () => {
                        setIsRegister(!isRegister)
                    }
                });
            });
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className={`flex justify-between items-center w-full overflow-hidden h-full max-h-full transition-all`} ref={container}>
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={Variants}
                    transition={{ duration: 0.5 }}
                    className="md:w-1/2 w-full flex transition-all h-full m-auto flex-col-reverse justify-center items-center">
                    <div className="flex gap-6 justify-between w-full">
                        <button className={`flex gap-2 justify-center items-center border border-gray-300 rounded-lg p-4 w-1/2 transition-all text-white ${isRegister ? 'bg-primary' : 'bg-primaryLight'}`}
                            onClick={() => setIsRegister(true)}>
                            <span>
                                Register
                            </span>
                        </button>
                        <button className={`flex gap-2 justify-center items-center border border-gray-300 rounded-lg p-4 w-1/2 transition-all text-white ${!isRegister ? 'bg-primary' : 'bg-primaryLight'}`}
                            onClick={() => setIsRegister(false)}>
                            <span>
                                Login
                            </span>
                        </button>
                    </div>
                    {
                        isRegister ? (
                            <SignupForm />
                        ) : (
                            <LoginForm />
                        )
                    }
                </motion.div>
                {/* <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-1/2 transition-all h-full 2xl:p-16 xl:p-8 p-0 md:flex hidden overflow-hidden rounded-xl max-h-screen-minus">
                <div className="h-auto w-auto shadow-md overflow-hidden rounded-xl transition-all cursor-pointer relative">
                    <div className="absolute w-full h-full hover:backdrop-blur-lg rounded-xl transition-all flex"
                        onMouseEnter={
                            () => setIsHovered(true)
                        }
                        onMouseLeave={
                            () => setIsHovered(false)
                        }
                        onClick={flipFunction}>
                        {
                            isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="m-auto flex gap-4 items-center justify-center">
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} className={`w-20 h-20 dark:text-neutral-800 text-neutral-200 transition-all ${isRegister ? "" : "rotate-180"
                                        }`} />
                                    <span className="dark:text-neutral-800 text-neutral-200 transition-all">
                                        {
                                            isRegister ? "Déjà un compte ?" : "Pas de compte ?"
                                        }
                                    </span>
                                </motion.div>
                            )
                        }
                    </div>
                    <img src="/assets/imgs/auth-form-bg.jpg" alt="" className="h-auto w-auto object-cover rounded-xl transition-all" />
                </div>
            </motion.div> */}
            </div>
        </Suspense>
    );
}
