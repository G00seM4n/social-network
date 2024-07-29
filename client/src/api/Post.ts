import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number(),
});
export type Post = z.infer<typeof PostSchema>;

export const PostsListSchema = z.array(PostSchema);
export type PostsList = z.infer<typeof PostsListSchema>;

const FetchPostListSchema = z.object({
  list: PostsListSchema,
});
type FetchPostListResponse = z.infer<typeof FetchPostListSchema>;
export function fetchPostList(): Promise<FetchPostListResponse> {
  return fetch("/api/posts")
    .then((res) => res.json())
    .then((data) => FetchPostListSchema.parse(data));
}

export function createPost(text: string): Promise<void> {
  return fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then(() => validateResponse)
    .then(() => undefined);
}
