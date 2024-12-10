import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import ViewSchedule from './ViewSchedule';
import courseData from '../courseData';
import { TextInput, Tooltip, Card, Button, Text, Title, Grid, Flex, AppShell, Box, Center } from '@mantine/core';

const Scheduler = () => {
    const navigate = useNavigate();
    const { schedule, addCourse, removeCourseById } = useSchedule();
    const [filter, setFilter] = useState('');
    const [courses, setCourses] = useState(courseData);
    const [seenInstr, setSeenInstr] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(filter.toLowerCase()) ||
        course.courseName.toLowerCase().includes(filter.toLowerCase())
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

    const isFinalizeDisabled = overlap || repeatedCoursesBool;

    return (
        <AppShell role="main">
            <AppShell.Navbar role="navigation" w="10%" height="100%" pr="1rem" withBorder>

                <Grid mt="0.75rem" grow>
                    <Grid.Col span={"auto"}></Grid.Col>
                    <Grid.Col span={{ base: 12, md: 10 }}>    
                        <Button variant="outline" w="100%" c="ut-purple.4" onClick={() => navigate('/')}>Go Back</Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}></Grid.Col>
                </Grid>

                <div style={{ marginTop: 'auto' }}>
                    {schedule.length > 0 && (
                        <Grid mb="0.5rem" grow>
                            <Grid.Col span={"auto"}></Grid.Col>
                            <Grid.Col span={{ base: 12, md: 10 }}>    
                                <Button onClick={() => setIsModalOpen(!isModalOpen)} w="100%">
                                {!isModalOpen ? (
                                    "Calendar View"
                                ) : (
                                    "List View"
                                )}
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={"auto"}></Grid.Col>
                        </Grid>
                    )}
                    <Tooltip
                        label="Please resolve all scheduling conflicts and remove repeated courses before finalizing"
                        disabled={!isFinalizeDisabled}
                        position="top"
                        withArrow
                    >
                        <Grid mb="0.25rem" grow>
                            <Grid.Col span={"auto"}></Grid.Col>
                            <Grid.Col span={{ base: 12, md: 10 }}>    
                                <Button
                                    onClick={() => navigate('/thank-you')}  // Navigate to the ThankYouPage
                                    disabled={isFinalizeDisabled}
                                    style={{ display: 'block', width: '100%' }}
                                >
                                    Finalize
                                </Button>                            
                            </Grid.Col>
                            <Grid.Col span={"auto"}></Grid.Col>
                        </Grid>
                        

                    </Tooltip>
                </div>
            </AppShell.Navbar>

            <div style={{ marginLeft: '12%', padding: '10px' }}>
                <Title order={1} c="ut-purple.5">Choose Your Courses</Title>
                <TextInput
                    placeholder="Filter courses..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{ width: '50%', marginBottom: '10px' }}
                    aria-label='Filter courses'
                />

                <Grid>
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
                        <Grid.Col key={course.id} span={{ base: 12, md: 6, lg: 4 }}>
                            <Card minWidth="600px" maxWidth="100%" bg="indigo.1" shadow="md" padding={"1rem"} radius="md" withBorder>
                                <Card.Section p="md" px="2rem">
                                    <Title order={2} size={"1.7rem"} c="ut-purple.8" mb="0.5rem">{course.courseName}</Title>
                                    <Title order={3} size="1.1rem" fs="italic" fw="normal" c="violet.7" mb="0.5rem">{course.name}</Title>
                                    <Text>{course.meetingTimes}</Text>
                                </Card.Section>

                                <Card.Section p="md" px="2rem">
                                {isInSchedule ? (
                                    <Button
                                        variant="outline"
                                        color="red.9"
                                        w="100%"
                                        onClick={() =>
                                            confirm('Remove from schedule?') &&
                                            removeCourseById(course.id)
                                        }
                                    >
                                        Remove from Schedule
                                    </Button>
                                ) : (
                                    <Button
                                        variant="filled"
                                        color="violet.6"
                                        w="100%"
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
                                    </Button>
                                )}

                                {diffSectionInSchedule && (
                                    <Text mt="sm" size="0.95rem" fw="bold">Another section of this course is already in your schedule</Text>
                                )}
                                {schedulingConflict && (
                                    <Text mt="sm" size="0.95rem" c="red.8" fw="bold">There is a scheduling conflict with another course in your schedule</Text>
                                )}
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                    );
                })}
                </Grid>
            </div>
            <ViewSchedule isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
        </AppShell>
    );
};

export default Scheduler;