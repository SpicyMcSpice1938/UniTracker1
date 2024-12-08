import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';
import { Title, Button } from '@mantine/core';

const LandingPage = () => {
    const { schedule } = useSchedule();
    const navigate = useNavigate();

    return (
        <div align="center">
            <Title order={1} c="ut-purple.6" mt={"10rem"} mb="7rem">Welcome to UniTracker</Title>

            <Button
                onClick={() => navigate('/scheduler')}
                color="cyan.4"
                c="black"
                variant="gradient"
                gradient={{ from: 'cyan.3', to: 'blue.3', deg: 0 }}
                radius="lg"
                size="lg"
                mb="2rem"
            >Start Scheduling</Button>
        </div>
    );
};

export default LandingPage;
