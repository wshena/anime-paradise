import { FaGithub, FaLinkedinIn, FaRegUser } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineMenuFold } from "react-icons/ai";

export const UserIcon = ({size, classname}:IconProps) => <FaRegUser size={size} className={classname} />

export const MenuIcon = ({size, classname}:IconProps) => <AiOutlineMenuFold size={size} className={classname} />

export const BookMarkIcon = ({size, classname}:IconProps) => <IoBookmarkOutline size={size} className={classname} />

export const SearchIcon = ({size, classname}:IconProps) => <HiMiniMagnifyingGlass size={size} className={classname} />

export const GithubIcon = ({size, classname}:IconProps) => <FaGithub size={size} className={classname} />

export const InstagramIcon = ({size, classname}:IconProps) => <FaInstagram size={size} className={classname} />

export const LinkedinIcon = ({size, classname}:IconProps) => <FaLinkedinIn size={size} className={classname} />