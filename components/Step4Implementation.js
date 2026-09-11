import { useAssessmentStore } from '../store'

export default function Step4Implementation() {
  const implementation = useAssessmentStore((state) => state.implementation)
  const setImplementation = useAssessmentStore((state) => state.setImplementation)
  const setCurrentStep = useAssessmentStore((state) => state.setCurrentStep)

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold text-bankseta-dark mb-2">Step 4: Implementation</h2>
      <p className="text-gray-600 mb-6">BANKSETA window: 1 April 2026 – 28 February 2027</p>

      <div className="card card-yellow mb-8">
        <h4 className="font-semibold mb-3">⚠️ Key Deadlines</h4>
        <ul className="text-sm space-y-1">
          <li>• Application closes: 12 October 2026 at 16:00</li>
          <li>• Programme start: 1 April 2026 – 28 February 2027</li>
          <li>• Briefing: 14 September 2026 at 10:00</li>
        </ul>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block font-semibold mb-2">Programme start date *</label>
          <input
            type="date"
            min="2026-04-01"
            max="2027-02-28"
            value={implementation.startDate}
            onChange={(e) => setImplementation({ ...implementation, startDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Duration (months)</label>
          <input
            type="number"
            min="1"
            max="12"
            value={implementation.duration}
            onChange={(e) => setImplementation({ ...implementation, duration: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Impact metrics (what will you measure?)</label>
          <textarea
            placeholder="e.g. Completion rates, competency assessments, adoption rates..."
            value={implementation.metrics}
            onChange={(e) => setImplementation({ ...implementation, metrics: e.target.value })}
            className="h-32"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button className="btn-secondary" onClick={() => setCurrentStep(3)}>
          Back
        </button>
        <button className="btn-primary flex-1" onClick={() => setCurrentStep(5)}>
          Summary
        </button>
      </div>
    </div>
  )
}
