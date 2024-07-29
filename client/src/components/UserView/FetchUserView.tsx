import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { UserView } from "./UserView";

interface FetchUserViewProps {
    userId: string;
}
export const FetchUserView: FC<FetchUserViewProps> = ({ userId }) => {
    // Получение пользователя
    const userQuery = useQuery({
        queryFn: () => fetchUser(userId),
        queryKey: ['users', userId]
    }, queryClient);

    // Повторный запрос на пользователя
    const onRefetch = () => {
        userQuery.refetch();
    };

    switch (userQuery.status) {
        case "pending":
            return <Loader />;
        case "success":
            return <UserView user={userQuery.data} />;
        case "error":
            return (
                <div>
                    <span>Произошла ошибка</span>

                    <button type="button" onClick={onRefetch}>Повторить запрос</button>
                </div>
            );
    }
}