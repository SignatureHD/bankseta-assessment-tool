import { useAssessmentStore } from '../store'
import toast from 'react-hot-toast'

export default function Step3BusinessCase() {
  const businessJustification = useAssessmentStore((state) => state.businessJustification)
  const setBusinessJustification = useAssessmentStore((state) => state.setBusinessJustification)
  const interventions = useAssessmentStore((state) => state.interventions)
  const setCurrentStep = useAssessmentStore((state) => state.setCurrentStep)

  const totalBudget = interventions.reduce((sum, i) => sum + ((i.beneficiaries || 0) * (i.cost || 0)), 0)

  const handleNext = () => {
    if (!businessJustification || businessJustification.length < 20) {
      toast.error('Please provide a detailed business justification (at least 20 characters)')
      return
    }
    setCurrentStep(4)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold text-bankseta-dark mb-2">Step 3: Business Case</h2>
      <p className="text-gray-600 mb-6">Connect training to business change (BANKSETA requirement)</p>

      <div className="card card-green mb-8">
        <p className="text-sm text-gray-600 mb-1">Estimated funding</p>
        <p className="text-3xl font-bold text-green-700">R{totalBudget.toLocaleString()}</p>
      </div>

      <div className="mb-8">
        <label className="block font-semibold mb-2">Business justification *</label>
        <textarea
          placeholder="Explain how these interventions address technological change and support employment sustainability..."
          value={businessJustification}
          onChange={(e) => setBusinessJustification(e.target.value)}
          className="h-40"
        />
        <p className="text-xs text-gray-600 mt-2">💡 BANKSETA scores applications on clear business case alignment</p>
      </div>

      <div className="flex gap-4">
        <button className="btn-secondary" onClick={() => setCurrentStep(2)}>
          Back
        </button>
        <button className="btn-primary flex-1" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  )
}
