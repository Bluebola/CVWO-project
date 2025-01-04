import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button size="icon" asChild>
      <Link href="/">
        <IoHome className="w-6 h-6" />
      </Link>
    </Button>
  );
}

export default Logo;
