import { Badge } from '@/components/ui/Badge'
import type { RecruitmentStage } from '@/types/candidate'

const STAGE_STYLES: Record<RecruitmentStage, string> = {
  Applied: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  Screening: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  Interview: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  Offer: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  Hired: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  Rejected: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
}

interface StatusBadgeProps {
  stage: RecruitmentStage
}

export function StatusBadge({ stage }: StatusBadgeProps) {
  return <Badge className={STAGE_STYLES[stage]}>{stage}</Badge>
}
