import { useAssessmentStore } from '../store'

export default function Step5Summary({ onExport, onClear }) {
  const org = useAssessmentStore((state) => state.org)
  const assessment = useAssessmentStore((state) => state.assessment)
  const interventions = useAssessmentStore((state) => state.interventions)
  const setCurrentStep = useAssessmentStore((state) => state.setCurrentStep)

  const totalBudget = interventions.reduce((sum, i) => sum + ((i.beneficiaries || 0) * (i.cost || 0)), 0)
  const totalBeneficiaries = interventions.reduce((sum, i) => sum + (i.beneficiaries || 0), 0)

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold text-bankseta-dark mb-2">Step 5: Summary & Export</h2>

      <div className="card mb-8">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Organisation</p>
          <p className="text-lg font-semibold">{org.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Affected roles</p>
          <p className="text-lg font-semibold">{assessment.affectedRoles.length} roles</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Capability gaps</p>
          <p className="text-lg font-semibold">{assessment.capabilityGaps.length} gaps</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Total beneficiaries</p>
          <p className="text-lg font-semibold">{totalBeneficiaries} employees</p>
        </div>
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">Funding requested</p>
          <p className="text-2xl font-bold text-bankseta-dark">R{totalBudget.toLocaleString()}</p>
        </div>
      </div>

      <div className="card card-green mb-8">
        <h4 className="font-semibold mb-3">✓ Next Steps</h4>
        <ol className="text-sm space-y-2 list-decimal list-inside">
          <li>Export your assessment (PDF or JSON)</li>
          <li>Gather required BANKSETA documentation</li>
          <li>Confirm provider accreditation</li>
          <li>Register on BANKSETA SIMS platform</li>
          <li>Submit by 12 October 2026</li>
        </ol>
      </div>

      <div className="card card-yellow mb-8">
        <h4 className="font-semibold mb-3">📚 BANKSETA Resources</h4>
        <ul className="text-sm space-y-2">
          <li>• SIMS Platform: https://sims.bankseta.org.za/login</li>
          <li>• Briefing: 14 September 2026, 10:00</li>
          <li>• Info: https://bankseta.org.za/discretionary-grants/</li>
          <li>• Deadline: 12 October 2026 at 16:00</li>
        </ul>
      </div>

      <div className="flex gap-4 mb-4">
        <button className="btn-secondary" onClick={() => setCurrentStep(0)}>
          Start Over
        </button>
        <button className="btn-success flex-1" onClick={onExport}>
          📥 Export
        </button>
      </div>

      <button className="btn-danger w-full" onClick={onClear}>
        Clear Data
      </button>
    </div>
  )
}
