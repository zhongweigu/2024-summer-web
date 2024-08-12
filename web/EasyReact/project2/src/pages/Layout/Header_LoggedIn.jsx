'use client'

import {useState} from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {useAuth} from "../../utils/index.jsx";


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const {isLoggedIn, nickname, avatar, uid} = useAuth()

    const {logout} = useAuth()

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <img alt="" src="../../../public/Logo.bmp"
                         className="h-12 w-12"/>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">

                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        旅游
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        游戏
                    </a>
                </PopoverGroup>
                <a href="#" className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <div className="avatar">
                        <div className="w-20 rounded-full">
                            <img
                                alt="Avatar"
                                src={avatar}
                                className="bg-auto rounded-full w-12 h-12"
                            />
                            {nickname}
                        </div>
                    </div>
                </a>
                <button
                    type="button"
                    onClick={()=>{logout()}}
                    className="inline-flex items-center rounded-md bg-pink-200 px-3 py-2 text-sm font-semibold text-pink-400 shadow-sm ring-1 ring-inset ring-pink-300 hover:bg-pink-50"
                >
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
                            登出
                        </a>
                    </div>
                </button>

            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                         className="h-8 w-auto"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
