// src/context/ScheduleContext.jsx
import { createContext, useState, useContext } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState([]);

    const addCourse = (course) => {
        if (!schedule.find((c) => c.id === course.id)) {
            setSchedule([...schedule, course]);
        }
    };
    // perhaps make it based on title property?
    const removeCourse = (courseCode) => {
        console.log("removeCourse", courseCode);
        setSchedule((prev) => prev.filter((course) => course.courseCode !== courseCode));
    };


    return (
        <ScheduleContext.Provider value={{ schedule, addCourse, removeCourse }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export const useSchedule = () => useContext(ScheduleContext);
