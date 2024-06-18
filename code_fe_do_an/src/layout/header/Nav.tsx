"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hook/AuthContext";

export function Nav() {

  const auth = useAuth();
  function onNavChange() {
    setTimeout(() => {
      const triggers = document.querySelectorAll(
        '.submenu-trigger[data-state="open"]'
      );
      if (triggers.length === 0) return;

      const firstTrigger = triggers[0] as HTMLElement;
      const viewports = document.getElementsByClassName("submenu-viewport");

      if (viewports.length > 0) {
        const viewport = viewports[0] as HTMLElement;
        viewport.style.left = `${firstTrigger.offsetLeft}px`;
      }
    });
  }
  return (
    <NavigationMenu onValueChange={onNavChange}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent w-36 text-[#56a251] text-[20px]"
              )}
            >
              Trang chủ
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent w-36 submenu-trigger text-[#56a251] text-[20px]">
            Học tập
          </NavigationMenuTrigger>
          {auth.token !== "" ? (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 w-60">
                <ListItem href="/alphabet" title="Học bảng chữ cái" />
                <ListItem href="/course" title="Học theo mã môn" />
              </ul>
            </NavigationMenuContent>
          ) : (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 w-60">
                <ListItem title="Bạn chưa đăng nhập!!!" />
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent w-36 submenu-trigger text-[#56a251] text-[20px]">
            Trò chơi
          </NavigationMenuTrigger>
          {auth.token !== "" ? (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 w-60">
                <ListItem href="/" title="Trò chơi 1" />
                <ListItem href="/" title="Trò chơi 2" />
              </ul>
            </NavigationMenuContent>
          ) : (
            <NavigationMenuContent>
              <ul className="gap-3 p-6 w-60">
                <ListItem title="Bạn chưa đăng nhập!!!" />
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent w-36 submenu-trigger text-[#56a251] text-[20px]">
            Giới thiệu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-3 p-6 w-60">
              <ListItem href="/" title="Về trang web" />
              <ListItem href="/" title="Về giáo trình Dekiru Nihongo" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
