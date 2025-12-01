import dynamic from "next/dynamic";


const Navbar = dynamic(() => import("./Navbar"), {
	ssr: true,
});

const NavbarHOC = () => {
	return <Navbar  />;
};

export default NavbarHOC;
