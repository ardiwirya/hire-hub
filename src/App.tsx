import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { CandidatesPage } from '@/pages/CandidatesPage'
import { CandidateDetailPage } from '@/pages/CandidateDetailPage'
import { PipelinePage } from '@/pages/PipelinePage'
import { InterviewsPage } from '@/pages/InterviewsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidates/:candidateId" element={<CandidateDetailPage />} />
        <Route path="/pipeline" element={<PipelinePage />} />
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
