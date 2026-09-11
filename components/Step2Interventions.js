import { useAssessmentStore } from '../store'
import toast from 'react-hot-toast'

const GAP_INTERVENTIONS = {
  'Data literacy': { category: 'Online Short Course', cap: 4920 },
  'Digital tools': { category: 'IT Programme', cap: 33166 },
  'Compliance': { category: 'Reskilling/Upskilling', cap: 30000 },
  'Automation': { category: 'IT Programme', cap: 33166 },
  'Customer engagement': { category: 'Online Short Course', cap: 4920 },
  'Leadership': { category: 'Reskilling/Upskilling', cap: 30000 },
  'AI systems': { category: 'IT Programme', cap: 33166 },
  'Regulatory': { category: 'Reskilling/Upskilling', cap: 30000 },
}

export default function Step2Interventions() {
  const assessment = useAssessmentStore((state) => state.assessment)
  const interventions = useAssessmentStore((state) => state.interventions)
  const addIntervention = useAssessmentStore((state) => state.addIntervention)
  const removeIntervention = useAssessmentStore((state) => state.removeIntervention)
  const updateIntervention = useAssessmentStore((state) => state.updateIntervention)
  const setCurrentStep = useAssessmentStore((state) => state.setCurrentStep)

  const totalBudget = interventions.reduce((sum, i) => sum + ((i.beneficiaries || 0) * (i.cost || 0)), 0)

  const handleNext = () => {
    if (interventions.length === 0) {
      toast.error('Please add at least one intervention')
      return
    }
    setCurrentStep(3)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold text-bankseta-dark mb-2">Step 2: Design Interventions</h2>
      <p className="text-gray-600 mb-6">Match capability gaps to training programmes</p>

      <div className="space-y-4 mb-8">
        {assessment.capabilityGaps.map((gap) => {
          const intervention = GAP_INTERVENTIONS[gap]
          const existing = interventions.find((i) => i.gap === gap)
          
          return (
            <div key={gap} className="card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{gap}</h4>
                  <p className="text-sm text-gray-600">{intervention.category} • R{intervention.cap.toLocaleString()}</p>
                </div>
                {existing && <span className="text-xs bg-bankseta-gold text-white px-2 py-1 rounded">✓ Added</span>}
              </div>

              {!existing && (
                <button
                  className="btn-primary text-sm py-2"
                  onClick={() => addIntervention({ gap, category: intervention.category, cap: intervention.cap, beneficiaries: 0, cost: intervention.cap, provider: '' })}
                >
                  Add Intervention
                </button>
              )}
            </div>
          )
        })}
      </div>

      {interventions.length > 0 && (
        <div className="card card-green mb-8">
          <h4 className="font-semibold mb-4">Your Interventions ({interventions.length})</h4>
          <div className="space-y-3">
            {interventions.map((intervention) => (
              <div key={intervention.id} className="bg-white p-3 rounded border border-green-300">
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="font-semibold text-sm">{intervention.gap}</p>
                    <p className="text-xs text-gray-600">{intervention.category}</p>
                  </div>
                  <button
                    onClick={() => removeIntervention(intervention.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Beneficiaries</label>
                    <input
                      type="number"
                      min="1"
                      value={intervention.beneficiaries}
                      onChange={(e) => updateIntervention(intervention.id, 'beneficiaries', parseInt(e.target.value) || 0)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Cost per learner (R)</label>
                    <input
                      type="number"
                      value={intervention.cost}
                      onChange={(e) => updateIntervention(intervention.id, 'cost', Math.min(parseInt(e.target.value) || 0, intervention.cap))}
                      max={intervention.cap}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-green-300 mt-4 pt-4">
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-xl font-bold text-green-700">R{totalBudget.toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
          Back
        </button>
        <button className="btn-primary flex-1" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  )
}
