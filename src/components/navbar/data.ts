export interface NavLink {
  href: string;
  title: string;
}

export const navLinks: NavLink[] = [
  { href: "/pekerjaan", title: "Pekerjaan" },
  { href: "/komunitas", title: "Komunitas" },
  { href: "/program", title: "Program" },
];

export const navLinksMobile: NavLink[] = [
  { href: "/pekerjaan", title: "Pekerjaan" },
  { href: "/komunitas", title: "Komunitas" },
  { href: "/program", title: "Program" },
  { href: "/login", title: "Log In" },
  { href: "/signup", title: "Sign Up" },
];


