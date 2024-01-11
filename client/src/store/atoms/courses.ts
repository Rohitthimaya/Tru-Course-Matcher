import { atom } from "recoil";
import { Courses } from "../../components/Courses/Courses";

interface Course {
    _id: string;
    courseName: string;
    courseNum: number;
    courseCrn: number;
    __v: number;
}

export const courseState = atom({
    key: 'courseState',
    default: {
        isLoading: true,
        courses: null as Course[] | null
    }
});
