import { NavLink } from "react-router-dom"
import {MdCategory, MdContacts, MdHomeFilled, MdShop2} from "react-icons/md"

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles}`}>
        <NavLink to={'/'}className={({isActive})=> isActive ? "active_link" : ""} ><div className=" flexCenter gap-x-1"><MdHomeFilled></MdHomeFilled> Home</div></NavLink>
        <NavLink to={'/Mens'}className={({isActive})=> isActive ? "active_link" : ""} ><div className=" flexCenter gap-x-1"><MdCategory></MdCategory> Mens</div></NavLink>
        <NavLink to={'/Womens'} className={({isActive})=> isActive ? "active_link" : ""} ><div className=" flexCenter gap-x-1"><MdShop2></MdShop2> Womens</div></NavLink>
        <NavLink to={'/Kids'} className={({isActive})=> isActive ? "active_link" : ""} ><div className=" flexCenter gap-x-1"><MdContacts></MdContacts> kids</div></NavLink>
    </nav>
  )
}

export default Navbar