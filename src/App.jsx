import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScheduleProvider } from './context/ScheduleContext';
import { createTheme, MantineProvider } from '@mantine/core';
import LandingPage from './components/LandingPage';
import Scheduler from './components/Scheduler';
import ViewSchedule from './components/ViewSchedule';
import ThankYouPage from './components/ThankYouPage';

import '@mantine/core/styles.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/Button.css';

const theme = createTheme({
  primaryColor: 'ut-purple',
  colors: {
    /* https://mantine.dev/colors-generator/?color=9DA5F2 */
    'ut-purple': ["#ebeeff", "#d5d8fc", "#a7aef3", "#7782ec", "#4f5ce5", "#3644e2", "#2838e1", "#1b2bc8", "#1326b4", "#041f9f" ],
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
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
    </MantineProvider>
  );
}

export default App;
