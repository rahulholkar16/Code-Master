import { useGetAllProblems } from "@/modules/problem/hooks/useGetAllProblems";
import { ChildrenProps } from "@/types";

const ProblemLayout = ({ children }: ChildrenProps) => {
    useGetAllProblems();
    return <>{children}</>;
};

export default ProblemLayout;