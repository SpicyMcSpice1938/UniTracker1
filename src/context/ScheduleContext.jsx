import { createContext, useState, useContext } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState([]);

    const addCourse = (course) => {
        if (!schedule.find((c) => c.id === course.id)) {
            setSchedule([...schedule, course]);
        }
    };

    const addCourseById = (courseId) => {
        const course = schedule.find((c) => c.id === courseId);
        setSchedule([...schedule, course]);
    };

    // perhaps make it based on title property?
    const removeCourseByCourseCode = (courseCode) => {
        console.log("removeCourse", courseCode);
        setSchedule((prev) => prev.filter((course) => course.courseCode !== courseCode));
    };

    const removeCourseById = (courseId) => {
        console.log("removeCourseByID", courseId);
        setSchedule((prev) => prev.filter((course) => course.id !== courseId));
    };

    const removeCourseByTitle = (title) => {
        console.log("removeCourseByTitle", title);
        setSchedule((prev) => prev.filter((course) => course.name !== title));
    };

    return (
        <ScheduleContext.Provider value={{ schedule, addCourse, removeCourseByCourseCode, addCourseById, removeCourseById, removeCourseByTitle }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export const useSchedule = () => useContext(ScheduleContext);
