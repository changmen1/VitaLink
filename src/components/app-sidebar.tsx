// TODO 自定义组件 关于菜单

import { BarChartIcon, CameraIcon, ClipboardListIcon, DatabaseIcon, FileCodeIcon, FileIcon, FileTextIcon, FolderIcon, HelpCircleIcon, Hospital, LayoutDashboardIcon, ListIcon, SearchIcon, SettingsIcon, UsersIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"
import zxl from "@/assets/zxl.jpg"
import { NavSecondary } from "./nav-secondary"
import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"


// 菜单相关
const data = {
  user: {
    name: "红烧罗非鱼",
    email: "https://github.com/changmen1",
    avatar: zxl,
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar() {
  // const {
  //   state,
  //   open,
  //   setOpen,
  //   openMobile,
  //   setOpenMobile,
  //   isMobile,
  //   toggleSidebar,
  // } = useSidebar()
  return (
    // variant="sidebar | floating | inset" 
    // 默认- 侧边栏 浮动 内嵌
    // collapsible="offcanvas | icon | none"
    // 折叠属性 - 默认offcanvas
    <Sidebar collapsible="icon">
      {/* --------------------------顶部-------------------------- */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Hospital className="h-5 w-5" />
                <span className="text-base font-semibold">VitaLink</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* --------------------------菜单项-------------------------- */}
      <SidebarContent>
        {/* --------------------------主菜单项-------------------------- */}
        <NavMain items={data.navMain} />
        {/* --------------------------文档相关-------------------------- */}
        <NavDocuments items={data.documents} />
        {/* --------------------------设置栏-------------------------- */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/* --------------------------底部-------------------------- */}
      <SidebarFooter>
        {/* --------------------------用户信息-------------------------- */}
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}