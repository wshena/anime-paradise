import { FaGithub, FaLinkedinIn, FaRegUser } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMenuFold } from "react-icons/ai";

export const UserIcon = ({size, classname}:Icon) => <FaRegUser size={size} className={classname} />

export const MenuIcon = ({size, classname}:Icon) => <AiOutlineMenuFold size={size} className={classname} />

export const BookMarkIcon = ({size, classname}:Icon) => <IoBookmarkOutline size={size} className={classname} />

export const SearchIcon = ({size, classname}:Icon) => <HiMiniMagnifyingGlass size={size} className={classname} />

export const GithubIcon = ({size, classname}:Icon) => <FaGithub size={size} className={classname} />

export const InstagramIcon = ({size, classname}:Icon) => <FaInstagram size={size} className={classname} />

export const LinkedinIcon = ({size, classname}:Icon) => <FaLinkedinIn size={size} className={classname} />