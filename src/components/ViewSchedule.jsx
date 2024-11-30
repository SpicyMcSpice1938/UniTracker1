import ReactModal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '@mantine/core';

ReactModal.setAppElement('#root');

const ViewSchedule = ({ isOpen, onRequestClose }) => {
    const { schedule, removeCourseByTitle } = useSchedule();
    const navigate = useNavigate();

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

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={{ content: { width: '80%', height: '80%', margin: 'auto', position: 'relative' } }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Click on a meeting to remove a section from the schedule</span>
                <CloseButton onClick={onRequestClose} size='lg' />
            </div>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                hiddenDays={[0, 6]}
                events={events}
                eventClick={(info) => {
                    if (confirm(`Remove course ${info.event.title} and all its meetings?`)) {
                        removeCourseByTitle(info.event.title);
                    }
                }}
                headerToolbar={{
                    left: '',
                    center: '',
                    right: ''
                }}
                allDaySlot={false}
                slotMinTime="07:00:00"
                slotMaxTime="22:00:00"
                contentHeight="auto"
                dayHeaderFormat={{ weekday: 'long' }}
                validRange={{
                    start: new Date('2024-11-10'),
                    end: new Date('2024-11-17')
                }}
            />
            <button
                onClick={() => navigate('/thank-you')}
                disabled={events.length === 0 || overlap || repeatedCoursesBool}
                style={{ backgroundColor: events.length === 0 ? 'grey' : 'initial' }}
            >
                Finalize Schedule
            </button>
        </ReactModal>
    );
};

export default ViewSchedule;