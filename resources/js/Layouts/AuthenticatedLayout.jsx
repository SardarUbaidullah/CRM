import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Logo from "@/components/reusable/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User, LayoutDashboard } from "lucide-react";

export default function AuthenticatedLayout({ header, children }) {
  const user = usePage().props.auth.user;

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top Navbar */}

      <nav className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Section */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden sm:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      route().current("dashboard")
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Link href={route("dashboard")}>Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section */}
          <div className="hidden sm:flex items-center gap-4">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={route("profile.edit")} className="w-full flex items-center gap-2">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="h-4 w-4" /> Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-64 sm:hidden">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div>
                    <Link
                      href={route("dashboard")}
                      className={`flex items-center gap-2 text-sm font-medium hover:text-primary ${
                        route().current("dashboard")
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-muted-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Button asChild variant="ghost" className="w-full justify-start">
                      <Link href={route("profile.edit")}>
                        <User className="h-4 w-4 mr-2" /> Profile
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <Link href={route("logout")} method="post" as="button">
                        <LogOut className="h-4 w-4 mr-2" /> Log Out
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Header (optional) */}
      {header && (
        <header className="border-b bg-background shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}

      {/* Main content */}
      <main className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
