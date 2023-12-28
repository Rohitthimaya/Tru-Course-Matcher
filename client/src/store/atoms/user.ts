import { atom } from "recoil";

export const userState = atom({
    key: 'useState',
    default: {
        isLoading: true,
        userEmail: null
    }
});