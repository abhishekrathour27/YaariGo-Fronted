import dynamic from "next/dynamic";


const LeftSidebar = dynamic(() => import("./LeftSidebar"), {
    ssr: true,
});

const LeftSidebarHOC = () => {
    return <LeftSidebar />;
};

export default LeftSidebarHOC;
