import Navbar from "@/modules/home/components/Navbar";
import { ChildrenProps } from "@/types";

const ProtectedLayout = ({ children }: ChildrenProps) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default ProtectedLayout;
