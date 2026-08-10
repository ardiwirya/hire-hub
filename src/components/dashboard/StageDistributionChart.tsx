import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { RECRUITMENT_STAGES } from '@/types/candidate'
import type { Candidate } from '@/types/candidate'

interface StageDistributionChartProps {
  candidates: Candidate[]
}

const STAGE_COLORS: Record<string, string> = {
  Applied: '#94a3b8',
  Screening: '#3b82f6',
  Interview: '#f59e0b',
  Offer: '#a855f7',
  Hired: '#10b981',
  Rejected: '#ef4444',
}

export function StageDistributionChart({ candidates }: StageDistributionChartProps) {
  const data = RECRUITMENT_STAGES.map((stage) => ({
    stage,
    total: candidates.filter((candidate) => candidate.stage === stage).length,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Distribution</CardTitle>
        <span className="text-xs text-slate-400">All active candidates</span>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
              <XAxis dataKey="stage" tick={{ fontSize: 11 }} stroke="currentColor" className="text-slate-400" />
              <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-slate-400" allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.stage} fill={STAGE_COLORS[entry.stage]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
