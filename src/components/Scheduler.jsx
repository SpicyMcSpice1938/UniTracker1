import { useState } from 'react';
import { useSchedule } from '../context/ScheduleContext';

const Scheduler = () => {
    const { schedule, addCourse, removeCourse } = useSchedule();
    const [filter, setFilter] = useState('');
    const [courses, setCourses] = useState([
        {
            id: 1,
            name: 'CS 115-A',
            courseName: 'Introduction to Computer Science',
            courseCode: 'CS 115',
            sectionCode: 'A',
            meetingTimes: 'M/W/F 10:00AM - 10:50AM',
            meetings: [
                { start: '2024-11-11T10:00:00', end: '2024-11-11T10:50:00' },
                { start: '2024-11-13T10:00:00', end: '2024-11-13T10:50:00' },
                { start: '2024-11-15T10:00:00', end: '2024-11-15T10:50:00' }
            ]
        },
        {
            id: 2,
            name: 'CS 115-B',
            courseName: 'Introduction to Computer Science',
            courseCode: 'CS 115',
            sectionCode: 'B',
            meetingTimes: 'M/W/F 11:00AM - 11:50AM',
            meetings: [
                // monday wednesday friday 11AM to 11:50AM
                { start: '2024-11-11T11:00:00', end: '2024-11-11T11:50:00' },
                { start: '2024-11-13T11:00:00', end: '2024-11-13T11:50:00' },
                { start: '2024-11-15T11:00:00', end: '2024-11-15T11:50:00' }
            ]
        },
        {
            id: 3,
            name: 'CS 115-C',
            courseName: 'Introduction to Computer Science',
            courseCode: 'CS 115',
            sectionCode: 'C',
            meetingTimes: 'M/W/F 1:00PM - 1:50PM',
            meetings: [
                { start: '2024-11-11T13:00:00', end: '2024-11-11T13:50:00' },
                { start: '2024-11-13T13:00:00', end: '2024-11-13T13:50:00' },
                { start: '2024-11-15T13:00:00', end: '2024-11-15T13:50:00' }
            ]
        },
        {
            id: 4,
            name: 'CS 115-D',
            courseName: 'Introduction to Computer Science',
            courseCode: 'CS 115',
            sectionCode: 'D',
            meetingTimes: 'M/W/F 2:00PM - 2:50PM',
            meetings: [
                { start: '2024-11-11T14:00:00', end: '2024-11-11T14:50:00' },
                { start: '2024-11-13T14:00:00', end: '2024-11-13T14:50:00' },
                { start: '2024-11-15T14:00:00', end: '2024-11-15T14:50:00' }
            ]
        },
        {
            id: 74,
            name: 'CS 135-A',
            courseName: 'Discrete Structures',
            courseCode: 'CS 135',
            sectionCode: 'A',
            meetingTimes: 'T/TH 9:30AM - 10:45AM, T 7:00PM - 8:40PM',
            meetings: [
                { start: '2024-11-12T09:30:00', end: '2024-11-12T10:45:00' },
                { start: '2024-11-14T09:30:00', end: '2024-11-14T10:45:00' },
                { start: '2024-11-12T19:00:00', end: '2024-11-12T20:40:00' }
            ]
        },
        {
            id: 5,
            name: 'CS 146-A',
            courseName: 'Intro to Web Programming',
            courseCode: 'CS 146',
            sectionCode: 'A',
            meetingTimes: 'T/TH 3:30PM - 4:45PM',
            meetings: [
                { start: '2024-11-12T15:30:00', end: '2024-11-12T16:45:00' },
                { start: '2024-11-14T15:30:00', end: '2024-11-14T16:45:00' }
            ]
        },
        {
            id: 6,
            name: 'CS 284-A',
            courseName: 'Data Structures',
            courseCode: 'CS 284',
            sectionCode: 'A',
            meetingTimes: 'M/W/F 2:00PM - 2:50PM',
            meetings: [
                { start: '2024-11-11T14:00:00', end: '2024-11-11T14:50:00' },
                { start: '2024-11-13T14:00:00', end: '2024-11-13T14:50:00' },
                { start: '2024-11-15T14:00:00', end: '2024-11-15T14:50:00' }
            ]
        },
        {
            id: 7,
            name: 'CS 334-A',
            courseName: 'Theory of Computation',
            courseCode: 'CS 334',
            sectionCode: 'A',
            meetingTimes: 'T/TH 8:00AM - 9:15AM',
            meetings: [
                { start: '2024-11-12T08:00:00', end: '2024-11-12T09:15:00' },
                { start: '2024-11-14T08:00:00', end: '2024-11-14T09:15:00' }
            ]
        },
        {
            id: 8,
            name: 'CS 334-B',
            courseName: "Theory of Computation",
            courseCode: 'CS 334',
            sectionCode: 'B',
            meetingTimes: 'T/TH 11:00AM - 12:15PM',
            meetings: [
                { start: '2024-11-12T11:00:00', end: '2024-11-12T12:15:00' },
                { start: '2024-11-14T11:00:00', end: '2024-11-14T12:15:00' }
            ]
        },
        {
            id: 9,
            name: 'CS 334-C',
            courseName: 'Theory of Computation',
            courseCode: 'CS 334',
            sectionCode: 'C',
            meetingTimes: 'T/TH 2:00PM - 3:15PM',
            meetings: [
                { start: '2024-11-12T14:00:00', end: '2024-11-12T15:15:00' },
                { start: '2024-11-14T14:00:00', end: '2024-11-14T15:15:00' }
            ]
        },
        {
            // CS382-A meets M/W/F10:00AM to 10:50AM
            id: 10,
            name: 'CS 382-A',
            courseName: 'Computer Architecture',
            courseCode: 'CS 382',
            sectionCode: 'A',
            meetingTimes: 'M/W/F 10:00AM - 10:50AM',
            meetings: [
                { start: '2024-11-11T10:00:00', end: '2024-11-11T10:50:00' },
                { start: '2024-11-13T10:00:00', end: '2024-11-13T10:50:00' },
                { start: '2024-11-15T10:00:00', end: '2024-11-15T10:50:00' }
            ]
        },
        {
            // CS382-B meets M/W/F11:00AM to 11:50AM
            id: 11,
            name: 'CS 382-B',
            courseName: 'Computer Architecture',
            courseCode: 'CS 382',
            sectionCode: 'B',
            meetingTimes: 'M/W/F 11:00AM - 11:50AM',
            meetings: [
                { start: '2024-11-11T11:00:00', end: '2024-11-11T11:50:00' },
                { start: '2024-11-13T11:00:00', end: '2024-11-13T11:50:00' },
                { start: '2024-11-15T11:00:00', end: '2024-11-15T11:50:00' }
            ]
        }
    ]);

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%', position: 'fixed' }}>
                <button onClick={() => window.history.back()}>Go Back</button>
                <br />
                <input
                    type="text"
                    placeholder="Filter courses..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div style={{ marginLeft: '20%' }}>
                {filteredCourses.map((course) => (
                    <div key={course.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                        <h3>{course.courseName}</h3>
                        <h4>{course.name}</h4>
                        <p>{course.meetingTimes}</p>

                        {schedule.find((c) => c.id === course.id) ? (
                            <button
                                onClick={() =>
                                    confirm('Remove from schedule?') &&
                                    removeCourse(course.courseCode)
                                }
                            >
                                Remove from Schedule
                            </button>
                        ) : (
                            <button onClick={() => addCourse(course)}>
                                Add to Schedule
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Scheduler;
