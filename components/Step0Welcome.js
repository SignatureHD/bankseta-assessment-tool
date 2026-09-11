import { useAssessmentStore } from '../store'
import toast from 'react-hot-toast'

export default function Step0Welcome() {
  const org = useAssessmentStore((state) => state.org)
  const setOrg = useAssessmentStore((state) => state.setOrg)
  const setCurrentStep = useAssessmentStore((state) => state.setCurrentStep)

  const handleNext = () => {
    if (!org.name || !org.role) {
      toast.error('Please fill in organisation name and role')
      return
    }
    setCurrentStep(1)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6">
      <h1 className="text-4xl font-bold text-bankseta-dark mb-4">
        📋 BANKSETA Assessment Tool
      </h1>
      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
        Guide your credit provider organisation through workforce capability assessment, training intervention design, and BANKSETA funding application preparation.
      </p>

      <div className="card card-blue mb-8">
        <h3 className="font-semibold mb-3">What you'll complete</h3>
        <ul className="space-y-2 text-sm">
          <li>✓ Workforce capability assessment</li>
          <li>✓ Training intervention design</li>
          <li>✓ Business case development</li>
          <li>✓ Implementation planning</li>
          <li>✓ Export as PDF or JSON</li>
        </ul>
        <p className="text-xs text-gray-600 mt-4">⏱️ Takes 20-30 minutes • Auto-saves your progress</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block font-semibold mb-2">Organisation name *</label>
          <input
            type="text"
            placeholder="Your organisation"
            value={org.name}
            onChange={(e) => setOrg({ ...org, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Your role *</label>
          <input
            type="text"
            placeholder="e.g. HR Manager, Training Lead"
            value={org.role}
            onChange={(e) => setOrg({ ...org, role: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Email address</label>
          <input
            type="email"
            placeholder="your.email@organisation.co.za"
            value={org.email}
            onChange={(e) => setOrg({ ...org, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Phone number</label>
          <input
            type="tel"
            placeholder="+27 (0)xx xxx xxxx"
            value={org.phone}
            onChange={(e) => setOrg({ ...org, phone: e.target.value })}
          />
        </div>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={org.leverPaying}
            onChange={(e) => setOrg({ ...org, leverPaying: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="font-semibold">We are a levy-paying employer</span>
        </label>
        <p className="text-xs text-gray-600 ml-6">
          {org.leverPaying
            ? '✓ 80% of BANKSETA budget reserved for qualified levy-payers'
            : '◌ Unions/industry bodies: 20% allocation'}
        </p>
      </div>

      <button
        className="btn-primary mb-4"
        onClick={handleNext}
        disabled={!org.name || !org.role}
      >
        Begin Assessment
      </button>
    </div>
  )
}
