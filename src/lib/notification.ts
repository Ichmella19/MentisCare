import prisma from "@/lib/db";

export async function createNotification(
    userId: string,
    title: string,
    message: string,
    type: string,
    link?: string
) {
    try {
        await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type,
                link,
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Error creating notification:", error);
        return { success: false, error };
    }
}
