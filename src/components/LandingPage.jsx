import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import { Title, Button, Text, Stack } from '@mantine/core';
import DisplaySchedule from './DisplaySchedule';

const LandingPage = () => {
    const { schedule } = useSchedule();
    const navigate = useNavigate();

    return (
        <Stack role="main" align="center">
            <Title order={1} c="ut-purple.5" mt="11rem" mb="1rem">
                Welcome to UniTracker
            </Title>

            <Text size="xl" c="ut-purple.9" align="center" mt="1rem" mb="4rem">
                UniTracker is the easiest way to plan out your semester.
            </Text>

            {/* Display the schedule cards if available */}
            <DisplaySchedule/>

            {/* Show the "Start Scheduling" button if no schedule is finalized */}
            <Button
                onClick={() => navigate('/scheduler')}
                color="cyan.4"
                c="black"
                variant="gradient"
                gradient={{ from: 'cyan.3', to: 'blue.3', deg: 0 }}
                radius="lg"
                size="lg"
                mt={schedule.length > 0 ? '1rem' : '3rem'}
            >
                {schedule.length > 0 ? 'Edit Schedule' : 'Start Scheduling'}
            </Button>
        </Stack>
    );
};

export default LandingPage;
