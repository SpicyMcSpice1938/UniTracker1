import { useSchedule } from '../context/ScheduleContext';
import { Title, Button, Card, Text, Group } from '@mantine/core';

const DisplaySchedule = () => {
    const { schedule } = useSchedule();

    return (<>
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
                            {/* Not sure if we want meeting times or the three seperate dates */}
                                <Text size="sm">
                                     {course.meetingTimes}
                                </Text>
                        </Group>
                    </Card>
                ))}
            </div>
        )}
    </>);
};

export default DisplaySchedule;
