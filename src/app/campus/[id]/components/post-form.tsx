"use client";

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PenSquare, LoaderCircle } from 'lucide-react';
import { createPost } from '../actions';
import { currentUser } from '@/lib/data';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button disabled={pending}>
            {pending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <PenSquare className="mr-2 h-4 w-4" />}
            {pending ? 'Posting...' : 'Post Idea'}
        </Button>
    )
}

export function PostForm({ campusId }: { campusId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  
  return (
    <form 
        action={async (formData) => {
            await createPost(formData)
            formRef.current?.reset()
        }}
        ref={formRef}
    >
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Textarea 
                    name="content"
                    placeholder="Share an idea or start a discussion..." 
                    className="flex-1" 
                    required 
                />
                <input type="hidden" name="campusId" value={campusId} />
                </div>
            </CardHeader>
            <CardContent className="flex justify-end">
                <SubmitButton />
            </CardContent>
        </Card>
    </form>
  );
}
