import {courseState} from "../atoms/courses";
import {selector} from "recoil";

export const isCourseLoadingState = selector({
    key: 'isCourseLoading',
    get: ({get}) => {
        const state = get(courseState);
        return state.isLoading
    }
})
