import { useSchedule } from '../context/ScheduleContext';
import { Title, Grid, Card, Text, Group } from '@mantine/core';

const DisplaySchedule = () => {
    const { schedule } = useSchedule();

    return (<>
        {/* Display the schedule cards if available */}
        {schedule.length > 0 && (
            <Grid mx="25rem" mb="4rem" grow>
                {schedule.map((course) => (
                    <Grid.Col span={4} key={course.id}>
                        <Card
                            shadow="sm"
                            p="md"
                        >
                            <Title order={1} size={"2rem"}>{course.name}</Title>
                            <Text size="sm" c="cyan.8">
                                {course.courseCode}
                            </Text>
                            <Group direction="column" justify='center' spacing={4} mt="sm">
                                {/* Not sure if we want meeting times or the three seperate dates */}
                                    <Text size="0.9rem">
                                         {course.meetingTimes}
                                    </Text>
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        )}
    </>);
};

export default DisplaySchedule;
