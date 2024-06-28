"use client"

import { FC } from "react";
import Avatar from "../avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusinessTime, faContactCard, faHistory, faRightFromBracket, faTree, faUpload, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useLogoutMutation } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Vortex } from "react-loader-spinner";
import { User } from "@/app/types/user";
import { useGetMeQuery } from "@/services/userService";
import { useAppDispatch } from "@/lib/hooks";
import { clearUser } from "@/lib/features/user/userSlice";

interface SideBarProps {

}

const SideBar: FC<SideBarProps> = () => {

    const [logout, { data, error, isLoading }] = useLogoutMutation();

    const { data: userData, error: userError, isLoading: userLoading } = useGetMeQuery();

    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <div className="h-full w-full max-w-xs rounded-l-xl shadow-md bg-white">
            <div className="h-full w-full flex flex-col py-3 px-4">
                <div className="flex h-full flex-col justify-between">
                    <div className="flex flex-col">
                        <div className="flex self-center mb-6">
                            <img src="https://www.calmedica.com/wp-content/uploads/2020/05/Calmedica-logo-flat-200.png" alt="logo" className="w-auto h-auto my-3" />
                        </div>
                        {
                            userLoading ? (
                                <div className="flex justify-center items-center">
                                    <Vortex
                                        visible={true}
                                        height="60"
                                        width="60"
                                        ariaLabel="vortex-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="vortex-wrapper"
                                        colors={['#FF6F01', '#08D9C0', '#FF6F01', '#08D9C0', '#FF6F01', '#08D9C0']}
                                    />
                                </div>
                            ) : (
                                <Avatar company={(userData as User).company} email={(userData as User).email} onclick={() => {
                                    router.push("/dashboard/profile")
                                }} />
                            )
                        }
                        <ul className="flex w-full flex-col justify-between mt-8">
                            <li className="flex items-center gap-6 py-4 px-4 my-2 rounded-xl w-full cursor-pointer text-black hover:bg-primary hover:text-white transition-all"
                                onClick={
                                    () => {
                                        router.push("/dashboard/d3map")
                                    }
                                }>
                                <FontAwesomeIcon icon={faTree} className=" w-6 h-6 mb-1" />
                                <a href="#" className="text-md font-bold ">Tree</a>
                            </li>

                            <li className="flex items-center gap-6 py-4 px-4 my-2 rounded-xl w-full cursor-pointer text-black hover:bg-primary hover:text-white transition-all"
                                onClick={() => {
                                    router.push('/dashboard/upload')
                                }}>
                                <FontAwesomeIcon icon={faUpload} className=" w-6 h-6 mb-1" />
                                <a href="#" className="text-md font-bold ">Upload file</a>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-2">
                        <button
                            className="shadow-[0_4px_14px_0_rgba(255,0,0,39%)] hover:shadow-[0_6px_20px_rgba(255,0,0,23%)] hover:bg-[rgba(255,0,0,0.9)] px-8 py-2 bg-[#f30000] rounded-md text-white font-light transition duration-200 ease-linear flex justify-center gap-2 items-center m-auto"
                            onClick={() => {
                                dispatch(clearUser())
                                logout()
                                router.push("/authentication")
                            }}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;