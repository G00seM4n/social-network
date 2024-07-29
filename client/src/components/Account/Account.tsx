import { useQuery } from "@tanstack/react-query"

import { queryClient } from "../../api/queryClient"
import { fetchMe } from "../../api/User"

import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { PostForm } from "../PostForm";

export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ["users", "me"],
        retry: false
    }, queryClient);

    switch (meQuery.status) {
        case "pending":
            return <Loader />;
        case "error":
            return <AuthForm />;
        case "success":
            return <PostForm />;
    }
}