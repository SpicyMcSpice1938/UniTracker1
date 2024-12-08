import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import { Title, Button, Card, Text, Group } from '@mantine/core';

const LandingPage = () => {
    const { schedule } = useSchedule();
    const navigate = useNavigate();

    return (
        <div align="center">
            <Title order={1} c="ut-purple.6" mt={"10rem"} mb="7rem">
                Welcome to UniTracker
            </Title>

            {/* Display the schedule cards if available */}
            {schedule.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {schedule.map((course) => (
                        <Card
                            key={course.id}
                            shadow="sm"
                            padding="lg"
                            style={{ margin: '10px', width: '300px' }}
                        >
                            <Title order={3}>{course.name}</Title>
                            <Text size="sm" color="dimmed">
                                {course.courseCode}
                            </Text>
                            <Group direction="column" spacing={4} mt="sm">
                                {course.meetings.map((meeting, index) => (
                                    <Text key={index} size="sm">
                                        {meeting.start} - {meeting.end}
                                    </Text>
                                ))}
                            </Group>
                        </Card>
                    ))}
                </div>
            )}

            {/* Show the "Start Scheduling" button if no schedule is finalized */}
            <Button
                onClick={() => navigate('/scheduler')}
                color="cyan.4"
                c="black"
                variant="gradient"
                gradient={{ from: 'cyan.3', to: 'blue.3', deg: 0 }}
                radius="lg"
                size="lg"
                mt={schedule.length > 0 ? '2rem' : '4rem'}
            >
                {schedule.length > 0 ? 'Edit Schedule' : 'Start Scheduling'}
            </Button>
        </div>
    );
};

export default LandingPage;
