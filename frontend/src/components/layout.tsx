import { NavLink, Outlet } from 'react-router-dom'

import { Icon, type IconProps } from '#components/icon'

import { cn } from '#helpers/cn'

type NavItemProps = {
  to: string
  iconName: IconProps['name']
  label: string
}

const NavItem = ({ to, iconName, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn('flex flex-1 flex-col items-center justify-center', isActive && 'text-orange-500')
      }
    >
      <Icon
        name={iconName}
        size="lg"
        weight="light"
      />
      <span className="text-xs font-light">{label}</span>
    </NavLink>
  )
}

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 mt-auto flex h-14 w-full max-w-[480px] items-center justify-between gap-8 bg-slate-900 px-2.5 text-slate-300">
      <NavItem
        to="/"
        iconName="calculator"
        label="Calculator"
      />
      <NavItem
        to="/foods"
        iconName="eggCrack"
        label="Foods"
      />
      <NavItem
        to="/diary"
        iconName="bookOpenText"
        label="Diary"
      />
      <NavItem
        to="/profile"
        iconName="user"
        label="Profile"
      />
    </nav>
  )
}

export const Layout = () => {
  return (
    <>
      <main className="h-screen overflow-auto bg-slate-200 pb-14">
        <Outlet />
      </main>
      <Navbar />
    </>
  )
}
