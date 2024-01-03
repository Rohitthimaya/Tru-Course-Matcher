import { atom } from "recoil";

interface UserState {
    isLoading: boolean,
    userEmail: string | null,
    isAdmin: boolean
}

export const userState = atom<UserState>({
    key: 'useState',
    default: {
        isLoading: true,
        userEmail: null,
        isAdmin: false
    }
});