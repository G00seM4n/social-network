import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { queryClient } from '../../api/queryClient';
import { createPost } from '../../api/Post';

import { Button } from '../Button';
import { FormField } from '../FormField';

import './PostForm.css';

const CreatePostSchema = z.object({
  text: z.string().min(10, "Длина поста должна быть не менее 10 символов")
});
type CreatePostForm = z.infer<typeof CreatePostSchema>;

export const PostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreatePostForm>({
    resolver: zodResolver(CreatePostSchema)
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  }, queryClient);

  return (
    <form
      onSubmit={handleSubmit(({ text }) => {
        createPostMutation.mutate(text);
      })}
      className="post-form"
    >
      <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea
          className="post-form__input"
          {...register("text")}
        />
      </FormField>

      <Button type="submit" title="Опубликовать" isLoading={createPostMutation.isPending} />
    </form>
  );
};
