import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import { Title, Button, Card, Text, Group } from '@mantine/core';
import DisplaySchedule from './DisplaySchedule';

const LandingPage = () => {
    const { schedule } = useSchedule();
    const navigate = useNavigate();

    return (
        <div align="center">
            <Title order={1} c="ut-purple.6" mt={"10rem"} mb="7rem">
                Welcome to UniTracker
            </Title>

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
                mt={schedule.length > 0 ? '2rem' : '4rem'}
            >
                {schedule.length > 0 ? 'Edit Schedule' : 'Start Scheduling'}
            </Button>
        </div>
    );
};

export default LandingPage;
