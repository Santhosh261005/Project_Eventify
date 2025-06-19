import { Routes, Route, Navigate } from 'react-router-dom';
import OrganizerSignup from './components/OrganizerSignup';
import OrganizerSignin from './components/OrganizerSignin';
import OrganizerDashboard from './components/OrganizerDashboard';
import Home from './components/Home';
import EventForm from './components/EventForm';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/organizer/signup" element={<OrganizerSignup />} />
      <Route path="/organizer/signin" element={<OrganizerSignin />} />
      <Route
        path="/organizer/dashboard"
        element={token ? <OrganizerDashboard /> : <Navigate to="/organizer/signin" />}
      />
        <Route path="/organizer/events/new" element={<EventForm />} />
          <Route path="/organizer/events/:id" element={<EventForm />} />
    </Routes>
  );
}

export default App;
