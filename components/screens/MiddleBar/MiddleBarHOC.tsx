import dynamic from "next/dynamic";


const MiddleBar = dynamic(() => import("./MiddleBar"), {
    ssr: true,
});

const MiddleBarHOC = () => {
    return <MiddleBar  />;
};

export default MiddleBarHOC;
