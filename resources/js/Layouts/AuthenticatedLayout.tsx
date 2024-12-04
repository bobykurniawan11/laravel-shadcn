import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
} from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronUp,
    GalleryVerticalEnd,
    Search,
} from 'lucide-react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import { SidebarInset } from '@/components/ui/sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './Navbar';

export default function Authenticated({
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    // const authStore = useAuthStore();
    // const navigate = useNavigate();
    const data = {
        navMain: [
            {
                title: 'Dashboard',
                url: route('dashboard'),
                breadcrumb: ['Dashboard'],
                isActive: false,
                isOpen: false,
            },
            {
                title: 'Master Data',
                url: route('master-data'),
                breadcrumb: ['Master Data'],
                isActive: false,
                isOpen: false,
                items: [
                    {
                        title: 'Kategori',
                        url: route('master-data.kategori'),
                        breadcrumb: ['Master Data', 'Kategori'],
                        isActive: false,
                        isOpen: false,
                    },
                ],
            },
        ],
    };

    const [navItems, setNavItems] = useState(
        data.navMain.map((item) => {
            const hasActiveSubItem = item.items?.some(
                (subItem) => window.location.pathname === subItem.url,
            );

            return {
                ...item,
                isActive:
                    window.location.pathname === item.url || hasActiveSubItem,
                isOpen: hasActiveSubItem,
                items: item.items?.map((subItem) => ({
                    ...subItem,
                    isActive: window.location.pathname === subItem.url,
                })),
            };
        }),
    );

    const handleMenuClick = (
        index: number,
        url: string,
        hasSubItems: boolean,
    ) => {
        if (hasSubItems) {
            setNavItems((prev) =>
                prev.map((item, i) => ({
                    ...item,
                    isOpen: i === index ? !item.isOpen : item.isOpen,
                })),
            );
        } else {
            setNavItems((prev) =>
                prev.map((item, i) => ({
                    ...item,
                    isActive:
                        i === index ||
                        item.items?.some((subItem) => subItem.url === url),
                    isOpen: item.items?.some((subItem) => subItem.url === url)
                        ? true
                        : item.isOpen,
                    items: item.items?.map((subItem) => ({
                        ...subItem,
                        isActive: subItem.url === url,
                    })),
                })),
            );
            // navigate(url);
        }
    };

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <a href="#">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <GalleryVerticalEnd className="size-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">
                                            Documentation
                                        </span>
                                        <span className="">v1.0.0</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <form>
                        <SidebarGroup className="py-0">
                            <SidebarGroupContent className="relative">
                                <Label htmlFor="search" className="sr-only">
                                    Search
                                </Label>
                                <SidebarInput
                                    id="search"
                                    placeholder="Search the docs..."
                                    className="pl-8"
                                />
                                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </form>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {navItems.map((item, index) => (
                                <Collapsible
                                    key={item.title}
                                    open={item.isOpen}
                                    onOpenChange={(open) => {
                                        setNavItems((prev) =>
                                            prev.map((prevItem, i) =>
                                                i === index
                                                    ? {
                                                        ...prevItem,
                                                        isOpen: open,
                                                    }
                                                    : prevItem,
                                            ),
                                        );
                                    }}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                isActive={item.isActive}
                                                onClick={() =>
                                                    handleMenuClick(
                                                        index,
                                                        item.url,
                                                        Boolean(
                                                            item.items?.length,
                                                        ),
                                                    )
                                                }
                                            >
                                                {item.title}{' '}
                                                {item.items?.length ? (
                                                    <motion.div
                                                        initial={false}
                                                        animate={{
                                                            rotate: item.isOpen
                                                                ? 180
                                                                : 0,
                                                        }}
                                                        className="ml-auto"
                                                    >
                                                        {item.isOpen ? (
                                                            <ChevronUp />
                                                        ) : (
                                                            <ChevronDown />
                                                        )}
                                                    </motion.div>
                                                ) : null}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        {item.items?.length && (
                                            <AnimatePresence initial={false}>
                                                {item.isOpen && (
                                                    <motion.div
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: 'auto',
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                        }}
                                                        style={{
                                                            overflow: 'hidden',
                                                        }}
                                                    >
                                                        <SidebarMenuSub>
                                                            {item.items.map(
                                                                (subItem) => (
                                                                    <SidebarMenuSubItem
                                                                        key={
                                                                            subItem.title
                                                                        }
                                                                    >
                                                                        <SidebarMenuSubButton
                                                                            asChild
                                                                            isActive={
                                                                                subItem.isActive
                                                                            }
                                                                        >
                                                                            <a
                                                                                href={
                                                                                    subItem.url
                                                                                }
                                                                            >
                                                                                {
                                                                                    subItem.title
                                                                                }
                                                                            </a>
                                                                        </SidebarMenuSubButton>
                                                                    </SidebarMenuSubItem>
                                                                ),
                                                            )}
                                                        </SidebarMenuSub>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-0">
                    <Navbar user={user} />
                </header>
                <div className="flex flex-1 flex-col items-start justify-start gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
