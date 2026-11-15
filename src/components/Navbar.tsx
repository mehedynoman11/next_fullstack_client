'use client'
import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const navLinks = [
        { name: 'Browse Jobs', href: '/jobs' },
        { name: 'Company', href: '/company' },
        { name: 'Pricing', href: '/pricing' },
    ];

    const handleSignout = async () => {
        await authClient.signOut();
    }
    return (
        <nav className=" sticky top-0 z-50">
            <div className="flex justify-between items-center bg-[#161624] mx-auto max-w-6xl px-4 py-3 rounded-b-xl">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={140}
                        height={60}
                        loading="eager"
                        className="rounded-lg w-auto h-auto"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 items-center">
                    <ul className="flex gap-6 items-center text-white">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`hover:text-slate-300 transition ${pathname === link.href ? 'text-yellow-400 font-semibold' : ''
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {user ?
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="outline" size="icon" className="rounded-full">
                                    {user?.image ? (
                                        <Avatar>
                                            <AvatarImage src={user.image || ""} />
                                        </Avatar>
                                    ) : (
                                        <span className="text-sm font-bold text-primary">
                                            {user?.name.charAt(0)}
                                        </span>
                                    )}
                                </Button>} />
                                <DropdownMenuContent className='bg-background text-foreground'>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            render={<Link href="/profile" />}
                                            className="flex-col items-start gap-0.5 py-2"
                                        >
                                            <span className="text-sm font-semibold">{user?.name}</span>
                                            <span className="max-w-full truncate text-xs text-muted-foreground">
                                                {user?.email}
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CreditCardIcon />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <BellIcon />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive" onClick={handleSignout}>
                                        <LogOutIcon />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </> :
                        <>
                            <Link href="/signin"><Button variant="outline">
                                Sign In
                            </Button></Link>
                            <Link href="/signup"><Button variant="default">
                                Get Started
                            </Button></Link>
                        </>}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-slate-800 px-4 pb-4">
                    <ul className="flex flex-col gap-3 text-white pt-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block py-1 hover:text-slate-300 ${pathname === link.href ? 'text-yellow-400 font-semibold' : ''
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {user ?
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="outline" size="icon" className="rounded-full">
                                    {user?.image ? (
                                        <Avatar>
                                            <AvatarImage src={user.image || ""} />
                                        </Avatar>
                                    ) : (
                                        <span className="text-sm font-bold text-primary">
                                            {user?.name.charAt(0)}
                                        </span>
                                    )}
                                </Button>} />
                                <DropdownMenuContent align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            render={<Link href="/profile" />}
                                            className="flex-col items-start gap-0.5 py-2"
                                        >
                                            <span className="text-sm font-semibold">{user?.name}</span>
                                            <span className="max-w-full truncate text-xs text-muted-foreground">
                                                {user?.email}
                                            </span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CreditCardIcon />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <BellIcon />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive" onClick={handleSignout}>
                                        <LogOutIcon />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </> :
                        <>
                            <div className="flex flex-col gap-2 mt-3">
                                <Button variant="outline" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Link href="/signin">Sign In</Link>
                                </Button>
                                <Button variant="secondary" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </>}
                </div>
            )}
        </nav>
    );
};

export default Navbar;