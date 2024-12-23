import ReactModal from 'react-modal';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import { CloseButton, Button, Tooltip } from '@mantine/core';

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
    let overlappingEvents = new Set();
    for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
            if (events[i].start < events[j].end && events[i].end > events[j].start) {
                overlap = true;
                overlappingEvents.add(events[i].id);
                overlappingEvents.add(events[j].id);
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

    console.log(repeatedCoursesArr);
    console.log(overlappingEvents);
    const isFinalizeDisabled = overlap || repeatedCoursesBool;
    // Add custom attributes to events
    const coloredEvents = events.map(event => {
        const isOverlapping = overlappingEvents.has(event.id);
        const isRepeatedCourse = repeatedCoursesArr.includes(event.title.split('-')[0].trim());
        return {
            ...event,
            backgroundColor: isOverlapping || isRepeatedCourse ? 'tomato' : "#a7aef3",
            borderColor: isOverlapping || isRepeatedCourse ? 'black' : 'transparent',
            borderWidth: isOverlapping || isRepeatedCourse ? '1px' : '0px',
        };
    });

    const eventContent = (eventInfo) => {
        const { backgroundColor, borderColor, borderWidth } = eventInfo.event.extendedProps;
        return (
            <div style={{ backgroundColor, borderColor, borderWidth, borderStyle: 'solid' }}>
                <p>{eventInfo.event.title}</p>
            </div>
        );
    };

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={{ content: { width: '85%', height: '90%', margin: 'auto', marginLeft: "10%", position: 'relative' } }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Click on a meeting to remove a section from the schedule</span>
                    <CloseButton onClick={onRequestClose} size='lg' />
                </div>

                <div className='calendar-container' style={{ height: '50%', overflowY: 'auto', overflowX: 'auto' }}>
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView="timeGridWeek"
                        hiddenDays={[0, 6]}
                        events={coloredEvents}
                        eventContent={eventContent}
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
                </div>
                {/* TODO button needs to be blocked in the modal view too. like how it is in Scheduler */}
            </div>
        </ReactModal>
    );
};

export default ViewSchedule