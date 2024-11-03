import { MdOutlineLocalOffer } from "react-icons/md"
import { NavLink } from "react-router-dom" 
import { FaStar } from "react-icons/fa"


const Hero = () => {
  return (
    <section className=" relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full">
        <div className="max_padd_container relative top-32 xs:top-52">
            <h1 className=" h1 capitalize max-w-[37rem]">
                Digital shopping hub junction
            </h1>
            <p className="text-gray-50 regular-16 mt-6 max-w-[33rem]">Online shopping is a form of electronic commerce which allows consumers to directly buy goods or services from a seller over the Internet using a web browser or a mobile app. Consumers find a product of interest by visiting the website of the retailer directly or by searching among alternative vendors using a shopping search engine.
            </p>

            <div className=" flexStart !items-center gap-x-4 my-10">
                <div className="!regular-24 flexCenter gap-x-3">
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                    <FaStar></FaStar>
                </div>
                <div className="bold-16 sm:bold-20">176k <span className=" regular-16 sm:regular-20">Execelent reviews</span></div>  
            </div>
            <div className="max-xs:flex-col flex gap-2">
                <NavLink to={''} className={"btn_dark_rounded flexCenter"}>Shop now</NavLink>
                <NavLink to={''} className={"btn_dark_rounded flexCenter gap-x-2"}><MdOutlineLocalOffer className="text-2xl"></MdOutlineLocalOffer>Offers</NavLink>
            </div>
        </div>
    </section>
  )
}

export default Hero