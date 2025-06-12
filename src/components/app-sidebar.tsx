// TODO 自定义组件 关于菜单

import { BarChartIcon, FileIcon, FolderIcon, HelpCircleIcon, Hospital, LayoutDashboardIcon, ListIcon, SearchIcon, SettingsIcon, UsersIcon } from "lucide-react"
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
      title: "主页",
      url: "/home",
      icon: LayoutDashboardIcon,
    },
    {
      title: "解析",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "发送",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "服务",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "隧道",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "关于",
      url: "/about",
      icon: ListIcon,
    },
  ],
  documents: [
    {
      name: "Word HL7",
      url: "#",
      icon: FileIcon,
    },
  ],
  navSecondary: [
    {
      title: "设置",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "帮助",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "issues",
      url: "#",
      icon: SearchIcon,
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