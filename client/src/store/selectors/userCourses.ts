import {courseState} from "../atoms/courses";
import {selector} from "recoil";

export const coursesState = selector({
    key: 'coursesState',
    get: ({get}) => {
        const state = get(courseState);
        return state.courses
    }
})
