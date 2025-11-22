'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTodos() {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { success: true, data: todos };
    } catch (error) {
        console.error('Failed to fetch todos:', error);
        return { success: false, error: 'Failed to fetch todos' };
    }
}

export async function addTodo(formData: FormData) {
    const title = formData.get('title') as string;

    if (!title || title.trim() === '') {
        return { success: false, error: 'Title is required' };
    }

    try {
        await prisma.todo.create({
            data: {
                title: title.trim(),
            },
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to create todo:', error);
        return { success: false, error: 'Failed to create todo' };
    }
}

export async function toggleTodo(id: string, completed: boolean) {
    try {
        await prisma.todo.update({
            where: { id },
            data: { completed },
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to toggle todo:', error);
        return { success: false, error: 'Failed to toggle todo' };
    }
}

export async function deleteTodo(id: string) {
    try {
        await prisma.todo.delete({
            where: { id },
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete todo:', error);
        return { success: false, error: 'Failed to delete todo' };
    }
}
