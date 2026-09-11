export default function ProgressBar({ currentStep, totalSteps }) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="progress-bar">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-bankseta-dark">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-600">{progressPercent}%</span>
        </div>
        <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-bankseta-dark transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
