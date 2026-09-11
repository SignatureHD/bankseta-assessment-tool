import { useAssessmentStore } from '../store'
import toast from 'react-hot-toast'

export default function ExportModal({ isOpen, onClose }) {
  const org = useAssessmentStore((state) => state.org)
  const assessment = useAssessmentStore((state) => state.assessment)
  const interventions = useAssessmentStore((state) => state.interventions)
  const businessJustification = useAssessmentStore((state) => state.businessJustification)
  const implementation = useAssessmentStore((state) => state.implementation)

  const totalBudget = interventions.reduce((sum, i) => sum + ((i.beneficiaries || 0) * (i.cost || 0)), 0)

  const handleExportJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      organisation: org,
      assessment,
      interventions,
      businessJustification,
      implementation,
      totalBudget,
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `BANKSETA_Assessment_${org.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Assessment exported as JSON')
    onClose()
  }

  const handlePrint = () => {
    window.print()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Export Assessment</h2>
        <p className="text-gray-600 mb-6">Choose your export format</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            className="btn-primary py-4 text-center"
            onClick={handlePrint}
          >
            🖨️<br />Print
          </button>
          <button
            className="btn-primary py-4 text-center"
            onClick={handleExportJSON}
          >
            📋<br />JSON
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          <strong>Print:</strong> Formatted report for sharing<br />
          <strong>JSON:</strong> Data export for SIMS system
        </p>

        <button
          className="btn-secondary w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
