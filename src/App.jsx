import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScheduleProvider } from './context/ScheduleContext';
import LandingPage from './components/LandingPage';
import Scheduler from './components/Scheduler';
import ViewSchedule from './components/ViewSchedule';
import ThankYouPage from './components/ThankYouPage';

function App() {
  return (
    <ScheduleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/view-schedule" element={<ViewSchedule />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </ScheduleProvider>
  );
}

export default App;
