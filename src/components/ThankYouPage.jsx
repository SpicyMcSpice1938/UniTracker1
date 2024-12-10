import { useNavigate } from 'react-router-dom';
import { Title, Button } from '@mantine/core';
import DisplaySchedule from './DisplaySchedule';
import { Container } from 'postcss';

const ThankYouPage = () => {
    const navigate = useNavigate();

    return (
        <div role="main" align="center">
            <Title order={1} c="ut-purple.6" mt="7rem">Congratulations!</Title>
            <Title order={2} c="ut-purple.4" mt="1rem" mb="2rem">Here is your new schedule:</Title>
            <DisplaySchedule/>
            <Button 
                onClick={() => navigate('/')}
                color="cyan.4" 
                c="black" 
                variant="gradient" 
                gradient={{ from: 'cyan.3', to: 'blue.3', deg: 90 }}
                radius="lg"
                size="lg">Go Home</Button>
        </div>
    );
}
export default ThankYouPage;
