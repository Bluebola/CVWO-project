type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/posts/create", label: "Create a post" },
  { href: "/posts/userPosts", label: "Your posts" },
  { href: "/profile", label: "profile" },
];
