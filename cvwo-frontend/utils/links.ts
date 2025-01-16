type NavLink = {
  href: string;
  label: string;
};

// This is the list of links that will be displayed in the LinksDropdown component in the navbar.
export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/posts/create", label: "Create a post" },
  { href: "/posts/userPosts", label: "Your posts" },
  { href: "/profile", label: "profile" },
];
