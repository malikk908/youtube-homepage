import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from "lucide-react"
import logo from "../assets/WT_logo.png"
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
                        className="border rounded-l-full border-secondary-border shadow-inner shadow-secondary py-1 px-4 w-full focus:border-blue-500 outline-none" />

                    <Button className="py-2 px-4 border border-secondary-border rounded-r-full border-l-0">
                        <Search />
                    </Button>
                </div>

                <Button type="button" size="icon" className="flex shrink-0">
                    <Mic />
                </Button>
            </form>

            <div className={`flex-shrink-0 md:gap-2 ${fullWidthSearch ? "hidden" : "flex"}`}>
                <Button
                    onClick={() => { setFullWidthSearch(true) }}
                    size="icon"
                    variant="ghost"
                    className="md:hidden">
                    <Search />
                </Button>

                <Button size="icon" variant="ghost" className="md:hidden">
                    <Mic />
                </Button>
                <Button size="icon" variant="ghost">
                    <Upload />
                </Button>

                <Button size="icon" variant="ghost">
                    <Bell />
                </Button>

                <Button size="icon" variant="ghost">
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
        <div className={`gap-4 items-center flex-shrink-0 ${hidden ? "hidden" : "flex"}`}>
        <Button onClick={toggle} variant="ghost" size="icon">
            <Menu />
        </Button>

        <a href="/">
            <img src={logo} className='h-6' />
        </a>
    </div>
    )
}