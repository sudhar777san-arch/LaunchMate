// src/app/campus/[id]/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { campuses, currentUser } from '@/lib/data';

export async function createPost(formData: FormData) {
  const content = formData.get('content') as string;
  const campusId = formData.get('campusId') as string;

  if (!content || !campusId) {
    return {
      error: 'Content and campus ID are required.',
    };
  }

  const campus = campuses.find(c => c.id === campusId);
  if (!campus) {
    return {
        error: 'Campus not found.',
    }
  }

  // Create a new post object
  const newPost = {
    id: `post${Date.now()}`,
    author: {
        id: currentUser.id,
        name: currentUser.name,
        avatarUrl: currentUser.avatarUrl,
    },
    content,
    timestamp: 'Just now',
    likes: 0,
    comments: 0,
  };

  // Add the new post to the beginning of the campus's posts array
  campus.posts.unshift(newPost);

  console.log('New Post:', { content, campusId });

  revalidatePath(`/campus/${campusId}`);
  return { success: true };
}
