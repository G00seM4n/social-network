import { FC } from 'react';
import { Post } from '../../api/Post';

import './PostView.css';
import { FetchUserView } from '../UserView/fetchUserView';

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

interface PostViewProps {
  post: Post
}
export const PostView: FC<PostViewProps> = ({ post }) => {
  return (
    <div className="post-view">
      <FetchUserView userId={post.authorId} />

      <p className="post-view__text">{post.text}</p>

      <time className="post-view__time">{formatDate(post.createdAt)}</time>
    </div>
  );
};
