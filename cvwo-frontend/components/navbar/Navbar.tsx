import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import TextBox from "./TextBox";

function Navbar() {
  return (
    <nav className="border-b-4 border-gray-200 dark:border-gray-700">
      <div className="container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8">
      <div className='flex items-center gap-4'>
          <Logo />
          <TextBox />
        </div>
        <div className="flex gap-4 items-center ">
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
