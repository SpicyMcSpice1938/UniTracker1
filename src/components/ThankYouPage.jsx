import { useNavigate } from 'react-router-dom';
import { Title, Button } from '@mantine/core';

const ThankYouPage = () => {
    const navigate = useNavigate();

    return (
        <div align="center">
            <Title order={1} c="ut-purple.6" mt="5rem" mb="4rem">Thank you for finalizing your schedule!</Title>
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
