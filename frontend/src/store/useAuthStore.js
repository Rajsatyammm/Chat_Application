
import { create } from "zustand";
import axiosInstance from "../config/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { getDecryptedObjectFromEncryptedString } from "../utils/util";

const BASE_URL = import.meta.env.MODE == "development"
    ? import.meta.env.VITE_SERVER_BASE_URL_DEV
    : import.meta.env.VITE_SERVER_BASE_URL_PROD;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: getDecryptedObjectFromEncryptedString(res.data.data) });
            get().connectSocket();
        } catch (error) {
            console.log(error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            const decryptedData = getDecryptedObjectFromEncryptedString(res.data.data);
            set({ authUser: decryptedData });
            localStorage.setItem("token", decryptedData.token);
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            const decryptedData = getDecryptedObjectFromEncryptedString(res.data.data);
            set({ authUser: decryptedData });
            localStorage.setItem("token", decryptedData.token);
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            localStorage.removeItem("token");
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    fetchProfile: async () => {
        try {
            const response = await axiosInstance.get("/auth/profile")
            set({ authUser: getDecryptedObjectFromEncryptedString(response.data.data) })
        } catch (err) {
            toast.error(err.message || 'Error getting user profile');
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            set({ authUser: getDecryptedObjectFromEncryptedString(res.data.data) });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
            transports: ["websocket"],
        });
        socket.connect();
        set({ socket: socket });
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}));
