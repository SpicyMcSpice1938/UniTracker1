import { useSchedule } from '../context/ScheduleContext';
import { Title, Grid, Card, Text, Group } from '@mantine/core';

const DisplaySchedule = () => {
    const { schedule } = useSchedule();

    return (<>
        {/* Display the schedule cards if available */}
        {schedule.length > 0 && (
            <Grid mx="20rem" mb="4rem" grow>
                {schedule.map((course) => (
                    <Grid.Col span={4} key={course.id}>
                        <Card 
                            bg="indigo.1" 
                            shadow="md"
                        >
                            <Card.Section p="md" align='center'>
                                <Title order={1} size={"1.7rem"} c="ut-purple.8" mb="0.3rem">{course.courseName}</Title>
                                <Text size="1.2rem" c="violet.7" mb="0.5rem" fs="italic">
                                    {course.name}
                                </Text>
                                <Text size="0.9rem">
                                     {course.meetingTimes}
                                </Text>
                            </Card.Section>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        )}
    </>);
};

export default DisplaySchedule;
