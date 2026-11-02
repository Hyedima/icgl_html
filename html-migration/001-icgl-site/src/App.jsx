import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Impact from './pages/Impact'
import Eligibility from './pages/Eligibility'
import Career from './pages/Career'
import JobDescription from './pages/JobDescription'
import Contact from './pages/Contact'
import TeamMemberBio from './pages/TeamMemberBio'
import News from './pages/resources/News'
import NewsStory from './pages/resources/NewsStory'
import Faqs from './pages/resources/Faqs'
import Ratings from './pages/resources/Ratings'
import Publications from './pages/resources/Publications'
import Policies from './pages/resources/Policies'
import PrivacyPolicy from './pages/resources/PrivacyPolicy'
import Whistleblowing from './pages/resources/Whistleblowing'
import Complaints from './pages/resources/Complaints'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/:group/:slug" element={<TeamMemberBio />} />
          <Route path="services" element={<Services />} />
          <Route path="impact" element={<Impact />} />
          <Route path="eligibility" element={<Eligibility />} />
          <Route path="career" element={<Career />} />
          <Route path="career/:slug" element={<JobDescription />} />
          <Route path="contact" element={<Contact />} />
          <Route path="resources/news/:slug" element={<NewsStory />} />
          <Route path="resources/news" element={<News />} />
          <Route path="resources/faqs" element={<Faqs />} />
          <Route path="resources/ratings" element={<Ratings />} />
          <Route path="resources/publications" element={<Publications />} />
          <Route path="resources/policies" element={<Policies />} />
          <Route path="resources/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="resources/whistleblowing" element={<Whistleblowing />} />
          <Route path="resources/complaints" element={<Complaints />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
