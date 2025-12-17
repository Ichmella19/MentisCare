"use client";
import React, { useEffect, useState } from "react";
import { getNotifications, markAsRead, markAllAsRead } from "@/app/actions/notification";
import Link from "next/link";

interface Notification {
    id: number;
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
    link: string | null; 
    type: string;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchNotifications = async () => {
        setLoading(true);
        const result = await getNotifications();
        if (result.success && result.data) {
            setNotifications(result.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id: number) => {
        await markAsRead(id);
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleMarkAllRead = async () => {
        await markAllAsRead();
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const filteredNotifications = notifications.filter(
        (n) =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.message.toLowerCase().includes(search.toLowerCase())
    );

    const totalNotifications = notifications.length;
    const unreadNotifications = notifications.filter((n) => !n.read).length;

    return (
        <div className="p-6 bg-white dark:bg-black text-black dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Notifications</h1>

                

                <button
                    onClick={handleMarkAllRead}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Tout marquer comme lu
                </button>
            </div>

            {/* Grille */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="shadow-md rounded-xl p-6 bg-gray-50 dark:bg-gray-900">
                    <h2 className="text-lg font-semibold">Total Notifications</h2>
                    <p className="text-2xl font-bold text-blue-600">{totalNotifications}</p>
                </div>
                <div className="shadow-md rounded-xl p-6 bg-gray-50 dark:bg-gray-900">
                    <h2 className="text-lg font-semibold">Non lues</h2>
                    <p className="text-2xl font-bold text-orange-500">{unreadNotifications}</p>
                </div>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Rechercher une notification..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                />
            </div>

            {/* Tableau */}
            <div className="shadow-md rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="w-10 h-10 border-4 border-[#08A3DC]/30 border-t-[#08A3DC] rounded-full animate-spin"></div>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
                            Chargement des notifications...
                        </p>
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        Aucune notification trouvée.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left bg-gray-100 dark:bg-gray-800">
                                    <th className="p-4 border-b dark:border-gray-700">Titre</th>
                                    <th className="p-4 border-b dark:border-gray-700">Message</th>
                                    <th className="p-4 border-b dark:border-gray-700">Type</th>
                                    <th className="p-4 border-b dark:border-gray-700">Date</th>
                                    <th className="p-4 border-b dark:border-gray-700">Status</th>
                                    <th className="p-4 border-b dark:border-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNotifications.map((notification) => (
                                    <tr
                                        key={notification.id}
                                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                                            !notification.read ? "bg-blue-50 dark:bg-blue-900/10" : ""
                                        }`}
                                    >
                                        <td className="p-4 border-b dark:border-gray-700 font-medium">
                                            {notification.title}
                                        </td>
                                        <td className="p-4 border-b dark:border-gray-700">
                                            {notification.message}
                                        </td>
                                        <td className="p-4 border-b dark:border-gray-700">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    notification.type === "ASSIGNMENT"
                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                }`}
                                            >
                                                {notification.type}
                                            </span>
                                        </td>
                                        <td className="p-4 border-b dark:border-gray-700 whitespace-nowrap">
                                            {new Date(notification.createdAt).toLocaleDateString()}{" "}
                                            {new Date(notification.createdAt).toLocaleTimeString()}
                                        </td>
                                        <td className="p-4 border-b dark:border-gray-700">
                                            {notification.read ? (
                                                <span className="text-green-600 dark:text-green-400">Lu</span>
                                            ) : (
                                                <span className="text-orange-500">Non lu</span>
                                            )}
                                        </td>
                                        <td className="p-4 border-b dark:border-gray-700">
                                            <div className="flex items-center gap-2">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        Marquer lu
                                                    </button>
                                                )}
                                                {notification.link && (
                                                    <Link
                                                        href={notification.link}
                                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                                    >
                                                        Voir
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
