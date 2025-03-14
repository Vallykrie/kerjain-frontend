export interface NavLink {
  href: string;
  title: string;
}

export const navLinks: NavLink[] = [
  { href: "/pekerjaan", title: "WorkIn" },
  { href: "/komunitas", title: "CommIn" },
  { href: "/program", title: "EduIn" },
];

export const navLinksMobile: NavLink[] = [
  { href: "/pekerjaan", title: "WorkIn" },
  { href: "/komunitas", title: "CommIn" },
  { href: "/program", title: "EduIn" },
  { href: "/login", title: "Log In" },
  { href: "/signup", title: "Sign Up" },
];

export const navLinksMobileLogout: NavLink[] = [
  { href: "/pekerjaan", title: "WorkIn" },
  { href: "/komunitas", title: "CommIn" },
  { href: "/program", title: "EduIn" },
  { href: "/", title: "Log Out" },
];

