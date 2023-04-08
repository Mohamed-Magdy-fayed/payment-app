import React, { createElement, useEffect, useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Card,
    IconButton,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    CodeBracketSquareIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
    LinkIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutAction } from "@/store/features/auth/authSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

function ProfileMenu() {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth.value)
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        fetch('/api/users/logout', {
            method: 'post',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.loggedOutUser) {
                    dispatch(logoutAction())
                    return router.push('/login')
                }
            })
    }

    const profileMenuItems = [
        {
            label: "My Profile",
            icon: UserCircleIcon,
            handler: () => router.push('/profile'),
            url: '/profile',
        },
        {
            label: "Edit Profile",
            icon: Cog6ToothIcon,
            handler: () => router.push('/profile'),
            url: '/profile'
        },
        {
            label: "Sign Out",
            icon: PowerIcon,
            handler: () => handleLogout(),
            url: '/profile'
        },
    ];

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 px-2 lg:ml-auto"
                >
                    <Typography className='normal-case'>{auth.userData?.name}</Typography>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, handler }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => handler()}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list menu
const navListMenuItems = [
    {
        title: "Next.js documentation",
        description: "If you're new to Next.js, we recommend starting with the learn course. The interactive course with quizzes will guide you through everything you need to know to use Next.js.",
        url: 'https://nextjs.org/docs'
    },
    {
        title: "Stripe documentation",
        description: 'Explore our guides and examples to integrate Stripe.',
        url: 'https://stripe.com/docs'
    },
    {
        title: "MongoDB documentation",
        description: "Find the guides, samples, and references you need to use the database, visualize data, and build applications on the MongoDB data platform.",
        url: 'https://www.mongodb.com/docs/'
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const triggers = {
        onMouseEnter: () => setIsMenuOpen(true),
        onMouseLeave: () => setIsMenuOpen(false),
    };

    const renderItems = navListMenuItems.map(({ title, description, url }) => (
        <Link href={url} key={title} target='_blank'>
            <MenuItem>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                    {title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                    {description}
                </Typography>
            </MenuItem>
        </Link>
    ));

    return (
        <>
            <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography as="a" href="#" variant="small" className="font-normal">
                        <MenuItem
                            {...triggers}
                            className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
                        >
                            <CodeBracketSquareIcon className="h-[18px] w-[18px]" /> Documentations{" "}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList
                    {...triggers}
                    className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
                >
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                    >
                        <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
                    </Card>
                    <ul className="col-span-4 flex w-full flex-col gap-1">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
                <CodeBracketSquareIcon className="h-[18px] w-[18px]" /> Documentations{" "}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
                {renderItems}
            </ul>
        </>
    );
}

// nav list component
const navListItems = [
    {
        label: "Github Account",
        icon: UserCircleIcon,
        url: 'https://github.com/Mohamed-Magdy-fayed'
    },
    {
        label: "Portfolio",
        icon: LinkIcon,
        url: 'https://megz-portfolio.onrender.com/'
    },
    {
        label: "LinkedIn",
        icon: ArrowLeftOnRectangleIcon,
        url: 'https://www.linkedin.com/in/mohamed-magdy-fayed/'
    },
];

function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navListItems.map(({ label, icon, url }) => (
                <Typography
                    key={label}
                    as="a"
                    href={url}
                    target='_blank'
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        {label}
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

export default function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleIsNavOpen = () => setIsNavOpen(!isNavOpen);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
            <div className="relative mx-auto flex items-center text-blue-gray-900">
                <Link
                    href="/"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium flex gap-2"
                >
                    <Image src='/logo.png' alt='logo' width={20} height={20} />
                    <Typography>Payment App</Typography>
                </Link>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                <ProfileMenu />
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList />
            </MobileNav>
        </Navbar>
    );
}