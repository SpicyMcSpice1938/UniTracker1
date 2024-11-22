import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';

const ViewSchedule = () => {
    const {schedule, addCourse, removeCourseByCourseCode, addCourseById, removeCourseById, removeCourseByTitle } = useSchedule();
    const navigate = useNavigate();

    // Transform schedule into events for FullCalendar

    const events = schedule.flatMap((course) =>
        course.meetings.map((meeting, index) => ({
            id: `${course.id}-${index}`, // Unique ID
            title: course.name,
            start: meeting.start,
            end: meeting.end,
        }))
    );

    // boolean for overlapping meetings
    let overlap = false;
    // check if there are overlapping meetings
    for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
            if (events[i].start < events[j].end && events[i].end > events[j].start) {
                overlap = true;
                break;
            }
        }
    }
    console.log("overlap: ", overlap);
    let repeatedCoursesBool = false;
    let repeatedCoursesArr = [];
    // check if there are repeated courses in the schedule, that is courseCode matches but sectionCode is different
    for (let i = 0; i < schedule.length; i++) {
        for (let j = i + 1; j < schedule.length; j++) {
            if (schedule[i].courseCode === schedule[j].courseCode) {
                repeatedCoursesBool = true;
                repeatedCoursesArr.push(schedule[i].courseCode);
            }
        }
    }
    console.log('repeatedCourses: ',repeatedCoursesBool);
    if (repeatedCoursesBool) {
        console.log('repeatedCoursesArr: ',repeatedCoursesArr);
    }  

    return (
        <>
            <button onClick={() => navigate('/')}>Back</button>
            <button onClick={() => navigate('/scheduler')}>Go to Scheduler</button>
            <div style={{ height: '80vh' }}>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    eventClick={(info) => {
                        // const courseCode = info.event.title.split('-')[0].trim();
                        console.log(info.event);
                        if (confirm(`Remove course ${info.event.title} and all its meetings?`)) {
                            // removeCourseByCourseCode(courseCode); // Remove the entire course
                            removeCourseByTitle(info.event.title);
                            console.log("course title: ", info.event.title);
                        }
                    }}
                    headerToolbar={{
                        left: '',
                        center: '',
                        right: ''
                    }} // Removes navigation buttons
                    allDaySlot={false} // Removes all-day section
                    slotMinTime="07:00:00" // 7 AM start
                    slotMaxTime="22:00:00" // 10 PM end
                    height="100%"
                    contentHeight="auto"
                    dayHeaderFormat={{ weekday: 'long' }} // Show only day names
                    validRange={{
                        start: new Date('2024-11-10'),
                        end: new Date('2024-11-17')
                    }}
                />
                <button
                    onClick={() => navigate('/thank-you')}
                    disabled={events.length === 0}
                    style={{ backgroundColor: events.length === 0 ? 'grey' : 'initial' }}
                >
                    Finalize Schedule
                </button>
            </div>
        
        </>

    );
};

export default ViewSchedule;
