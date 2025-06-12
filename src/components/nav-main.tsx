"use client"

import { Coffee, type LucideIcon } from "lucide-react"

import { Button } from '@/components/ui/button'
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ModeToggle } from "@/pages/theme/mode-toggle"
import { useNavigate } from "react-router-dom"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
}) {
    const navigate = useNavigate();
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="赞助☕️ sponsor☕️"
                            className="active:scale-95 transition-all min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                        >
                            <Coffee />
                            <span>赞助☕️ sponsor☕️</span>
                        </SidebarMenuButton>
                        <Button
                            size="icon"
                            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                            variant="outline"
                        >
                            <ModeToggle />
                            <span className="sr-only">主题</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                onClick={() => navigate(item.url)}
                                className="hover:bg-muted active:scale-95 transition-all"
                            >
                                {item.icon && <item.icon />}
                                <span >{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}

                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
