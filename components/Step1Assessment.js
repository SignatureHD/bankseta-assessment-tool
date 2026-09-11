import { useAssessmentStore } from '../store'
import toast from 'react-hot-toast'

const ROLES = ['Credit/Loan Officers', 'Collections', 'Customer Service/Contact Centre', 'Risk & Compliance', 'Operations', 'Management/Supervision']
const GAPS = ['Data literacy', 'Digital tools', 'Compliance', 'Automation', 'Customer engagement', 'Leadership', 'AI systems', 'Regulatory']

export default function Step1Assessment() {
  const assessment = useAssessmentStore((state) => state.assessment)
  const addRole = useAssessmentStore((state) => state.addRole)
  const removeRole = useAssessmentStore((state) => state.removeRole)
  const addGap = useAssessmentStore((state) => state.addGap)
  const removeGap = useAssessmentStore((state) => state.removeGap)
  const setBusinessChanges = useAssessmentStore((state) => state.setBusinessChanges)
  const setCurrentStep = useAssessmentStore((state) => state.setCurrentStep)

  const handleNext = () => {
    if (assessment.affectedRoles.length === 0 || assessment.capabilityGaps.length === 0 || assessment.businessChanges.length < 10) {
      toast.error('Please complete all fields')
      return
    }
    setCurrentStep(2)
  }

  const toggleRole = (role) => {
    if (assessment.affectedRoles.includes(role)) {
      removeRole(role)
    } else {
      addRole(role)
    }
  }

  const toggleGap = (gap) => {
    if (assessment.capabilityGaps.includes(gap)) {
      removeGap(gap)
    } else {
      addGap(gap)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold text-bankseta-dark mb-2">Step 1: Workforce Assessment</h2>
      <p className="text-gray-600 mb-6">Which roles are affected by technological change?</p>

      <div className="mb-8">
        <h3 className="font-semibold mb-4">Affected roles *</h3>
        <div className="space-y-3">
          {ROLES.map((role) => (
            <label key={role} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={assessment.affectedRoles.includes(role)}
                onChange={() => toggleRole(role)}
                className="w-4 h-4"
              />
              <span>{role}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block font-semibold mb-2">What is changing in your business? *</label>
        <textarea
          placeholder="e.g. Implementing new credit decision system, digital transformation..."
          value={assessment.businessChanges}
          onChange={(e) => setBusinessChanges(e.target.value)}
          className="h-32"
        />
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-4">Capability gaps *</h3>
        <div className="space-y-3">
          {GAPS.map((gap) => (
            <label key={gap} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={assessment.capabilityGaps.includes(gap)}
                onChange={() => toggleGap(gap)}
                className="w-4 h-4"
              />
              <span>{gap}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button className="btn-secondary" onClick={() => useAssessmentStore.setState({ currentStep: 0 })}>
          Back
        </button>
        <button className="btn-primary flex-1" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  )
}
