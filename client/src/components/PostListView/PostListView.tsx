import { FC } from 'react';

import { PostsList } from '../../api/Post';

import { PostView } from '../PostView';
import './PostListView.css';

interface PostListViewProps {
  postList: PostsList
}
export const PostListView: FC<PostListViewProps> = ({ postList }) => {
  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={post.id} className="post-list__item">
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};
