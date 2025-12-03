"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth"; // Assuming auth is configured here, check imports if needed

export async function getNotifications() {
    try {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return { success: false, message: "Unauthorized" };
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 20,
        });

        const unreadCount = await prisma.notification.count({
            where: {
                userId: session.user.id,
                read: false,
            },
        });

        return { success: true, data: notifications, unreadCount };
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return { success: false, message: "Failed to fetch notifications" };
    }
}

export async function markAsRead(id: number) {
    try {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return { success: false, message: "Unauthorized" };
        }

        await prisma.notification.update({
            where: {
                id,
                userId: session.user.id, // Ensure user owns the notification
            },
            data: {
                read: true,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return { success: false, message: "Failed to mark as read" };
    }
}

export async function markAllAsRead() {
    try {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return { success: false, message: "Unauthorized" };
        }

        await prisma.notification.updateMany({
            where: {
                userId: session.user.id,
                read: false,
            },
            data: {
                read: true,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        return { success: false, message: "Failed to mark all as read" };
    }
}
