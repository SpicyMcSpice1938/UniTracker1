import { useSchedule } from '../context/ScheduleContext';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const { schedule } = useSchedule();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to UniTracker</h1>
            <button onClick={() => navigate('/scheduler')}>Start Scheduling</button>
            {schedule.length > 0 && (
                <>
                    <button onClick={() => navigate('/view-schedule')}>View Current Schedule</button>
                </>
            )}
        </div>
    );
};

export default LandingPage;
