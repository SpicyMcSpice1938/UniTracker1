import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';

const ViewSchedule = () => {
    const { schedule, removeCourse } = useSchedule();
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

    console.log(events);


    return (
        <div style={{ height: '80vh' }}>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                events={events}
                eventClick={(info) => {
                    const courseCode = info.event.title.split('-')[0].trim();
                    console.log(info.event);
                    if (confirm(`Remove course ${info.event.title} and all its meetings?`)) {
                        removeCourse(courseCode); // Remove the entire course
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
    );
};

export default ViewSchedule;
