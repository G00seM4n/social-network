import { useQuery } from '@tanstack/react-query';
import { fetchPostList } from "../../api/Post"
import { Loader } from "../Loader";
import { PostListView } from "./PostListView";
import { queryClient } from '../../api/queryClient';

export const FetchPostListView = () => {
    // Получаем посты
    const postListQuery = useQuery({
        queryFn: () => fetchPostList(),
        queryKey: ['posts']
    }, queryClient);

    // Повторный запрос
    const onRefetch = () => {
        postListQuery.refetch();
    }

    switch (postListQuery.status) {
        case "pending":
            return <Loader />;
        case "success":
            return <PostListView postList={postListQuery.data.list} />;
        case "error":
            return (
                <div>
                    <span>Произошла ошибка</span>

                    <button type="button" onClick={onRefetch}>Повторить запрос</button>
                </div>
            );
    }
}