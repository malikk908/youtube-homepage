import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from "lucide-react"
import logoLight from "../assets/WT_logo.png"
import logoDark from "../assets/logo_dark.png"
import { Button } from "../compenents/Button"

import { useState } from "react"
import { useSidebarContext } from "../contexts/SidebarContext"


export function PageHeader() {

    const [fullWidthSearch, setFullWidthSearch] = useState(false)


    return (
        <div className="flex justify-between gap-10 lg:gap-20 pt-2 mb-6 mx-4">

            <PageHeaderFirstSection hidden={fullWidthSearch}/>

            <form className={`flex-grow justify-center gap-4 ${fullWidthSearch ? "flex" : "hidden md:flex"}`}>
                <Button
                onClick={()=>setFullWidthSearch(false)}
                type="button"
                size="icon"
                variant="ghost"
                className={`shrink-0 ${fullWidthSearch ? "flex" : "hidden"}`}>
                    <ArrowLeft />
                </Button>

                <div className="flex flex-grow max-w-[600px]">
                    <input
                        type="search"
                        placeholder="Search"
                        className="border rounded-l-full border-secondary-border shadow-inner shadow-secondary py-1 px-4 w-full focus:border-blue-500 outline-none dark:bg-[#0f0f0f] dark:shadow-none dark:border-secondary-dark" />

                    <Button className="py-2 px-6 border border-secondary-border rounded-r-full border-l-0 dark:bg-secondary-dark dark:border-secondary-dark dark:text-[#f1f1f1] dark:hover:bg-secondary-dark ">
                        <Search />
                    </Button>
                </div>

                <Button type="button" size="icon" className="flex shrink-0 dark:bg-secondary-dark dark:text-[#f1f1f1] dark:hover:bg-secondary-dark-hover">
                    <Mic />
                </Button>
            </form>

            <div className={`flex-shrink-0 md:gap-2 ${fullWidthSearch ? "hidden" : "flex"} dark:text-white `}>
                <Button
                    onClick={() => { setFullWidthSearch(true) }}
                    size="icon"
                    variant="ghost"
                    className="md:hidden dark:hover:bg-secondary-dark">
                    <Search />
                </Button>

                <Button size="icon" variant="ghost" className="md:hidden dark:hover:bg-secondary-dark">
                    <Mic />
                </Button>
                <Button size="icon" variant="ghost" className="dark:hover:bg-secondary-dark">
                    <Upload />
                </Button>

                <Button size="icon" variant="ghost" className="dark:hover:bg-secondary-dark">
                    <Bell />
                </Button>

                <Button size="icon" variant="ghost" className="dark:hover:bg-secondary-dark">
                    <User />
                </Button>

            </div>
        </div>
    )
}

type PageHeaderFirstSectionProps = {
    hidden?: boolean
}

export function PageHeaderFirstSection ({hidden = false}: PageHeaderFirstSectionProps) {
    const {toggle} = useSidebarContext()

    return (
        <div className={`gap-4 items-center flex-shrink-0  ${hidden ? "hidden" : "flex"}`}>
        <Button onClick={toggle} variant="ghost" size="icon" className="dark:text-[#f1f1f1] dark:hover:bg-secondary-dark">
            <Menu />
        </Button>

        <a href="/">
            <img src={logoLight} className='h-6 block dark:hidden' />
            <img src={logoDark} className='h-6 hidden dark:block' />
        </a>
    </div>
    )
}