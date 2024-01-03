import { userState } from "../atoms/user";
import { selector } from "recoil";

export const isAdminState = selector({
    key: 'isAdmin',
    get: ({get}) => {
        const state = get(userState);
        return state.isAdmin;
    }
})