import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import ViewSchedule from './ViewSchedule';
import courseData from '../courseData';


const Scheduler = () => {
    const navigate = useNavigate();
    const { schedule, addCourse, removeCourseByCourseCode, addCourseById, removeCourseById, removeCourseByTitle } = useSchedule();
    const [filter, setFilter] = useState('');
    const [courses, setCourses] = useState(courseData);
    const [seenInstr, setSeenInstr] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(filter.toLowerCase())
    );



    const events = schedule.flatMap((course) =>
        course.meetings.map((meeting, index) => ({
            id: `${course.id}-${index}`,
            title: course.name,
            start: meeting.start,
            end: meeting.end,
        }))
    );

    let overlap = false;
    for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
            if (events[i].start < events[j].end && events[i].end > events[j].start) {
                overlap = true;
                break;
            }
        }
    }

    let repeatedCoursesBool = false;
    let repeatedCoursesArr = [];
    for (let i = 0; i < schedule.length; i++) {
        for (let j = i + 1; j < schedule.length; j++) {
            if (schedule[i].courseCode === schedule[j].courseCode) {
                repeatedCoursesBool = true;
                repeatedCoursesArr.push(schedule[i].courseCode);
            }
        }
    }

    let repeatedCourseSet = new Set(repeatedCoursesArr);

    console.log(repeatedCourseSet);
    console.log(overlap);



    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '15%', position: 'fixed', height: '100vh', borderRight: '1px solid black', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <button onClick={() => navigate('/')}>Go Back</button>
                    <br />
                    <input
                        type="text"
                        placeholder="Filter courses..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: 'auto' }}>
                    {schedule.length > 0 && (
                        <button onClick={() => setIsModalOpen(true)} style={{ display: 'block', width: '100%', marginBottom: '10px' }}>
                            Calendar View
                        </button>
                    )}
                    <button
                        onClick={() => alert('Schedule finalized!')}
                        disabled={overlap || schedule.length === 0 || repeatedCoursesBool}
                        style={{ display: 'block', width: '100%' }}
                    >
                        Finalize Schedule
                    </button>
                </div>
            </div>
            <div style={{ marginLeft: '15%', padding: '10px' }}>
                {filteredCourses.map((course) => {
                    const isInSchedule = schedule.some((c) => c.id === course.id);
                    const diffSectionInSchedule = schedule.some((c) => c.courseCode === course.courseCode && c.id !== course.id);
                    const schedulingConflict = schedule.some((c) =>
                        c.id !== course.id &&
                        c.meetings.some((m) =>
                            course.meetings.some((m2) =>
                                (new Date(m.start) < new Date(m2.end)) && (new Date(m2.start) < new Date(m.end))
                            )
                        )
                    );
                    return (
                        <div key={course.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px', minWidth: '600px', maxWidth: '100%' }}>
                            <h3>{course.courseName}</h3>
                            <h4>{course.name}</h4>
                            <p>{course.meetingTimes}</p>

                            {isInSchedule && !diffSectionInSchedule ? (
                                <button
                                    onClick={() =>
                                        confirm('Remove from schedule?') &&
                                        removeCourseById(course.id)
                                    }
                                >
                                    Remove from Schedule
                                </button>
                            ) : diffSectionInSchedule && isInSchedule ? (
                                <button
                                    onClick={() =>
                                        confirm('Remove this section from schedule?') &&
                                        removeCourseById(course.id)
                                    }
                                >
                                    Remove from Schedule
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (!seenInstr && (diffSectionInSchedule || schedulingConflict)) {
                                            if (confirm('Adding this class to the schedule will cause a conflict. You will not be able to resolve it until you remove it from the schedule through this page or clicking on it in the calendar view.')) {
                                                addCourse(course);
                                                // setSeenInstr(true);
                                            }
                                        } else {
                                            addCourse(course);
                                        }
                                    }}
                                >
                                    Add to Schedule
                                </button>
                            )}

                            {diffSectionInSchedule && (
                                <p>Another section of this course is already in your schedule</p>
                            )}
                            {schedulingConflict && (
                                <p>There is a scheduling conflict with another course in your schedule</p>
                            )}
                        </div>
                    );
                })}
            </div>
            <ViewSchedule isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Scheduler;
