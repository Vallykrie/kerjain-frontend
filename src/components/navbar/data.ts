export interface NavLink {
    href: string;
    title: string;
  }
  
  export const navLinks: NavLink[] = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About" },
    { href: "/services", title: "Services" },
    { href: "/contact", title: "Contact" },
  ];