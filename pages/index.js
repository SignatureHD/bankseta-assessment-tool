import Head from 'next/head'
import { useAssessmentStore } from '../store'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Step0Welcome from '../components/Step0Welcome'
import Step1Assessment from '../components/Step1Assessment'
import Step2Interventions from '../components/Step2Interventions'
import Step3BusinessCase from '../components/Step3BusinessCase'
import Step4Implementation from '../components/Step4Implementation'
import Step5Summary from '../components/Step5Summary'
import ProgressBar from '../components/ProgressBar'
import ExportModal from '../components/ExportModal'

export default function Home() {
  const currentStep = useAssessmentStore((state) => state.currentStep)
  const setCurrentStep = useAssessmentStore((state) => state.setCurrentStep)
  const reset = useAssessmentStore((state) => state.reset)
  const [showExportModal, setShowExportModal] = useState(false)

  const steps = [
    { component: Step0Welcome, title: 'Welcome' },
    { component: Step1Assessment, title: 'Workforce Assessment' },
    { component: Step2Interventions, title: 'Design Interventions' },
    { component: Step3BusinessCase, title: 'Business Case' },
    { component: Step4Implementation, title: 'Implementation' },
    { component: Step5Summary, title: 'Summary' },
  ]

  const CurrentStep = steps[currentStep]?.component || Step0Welcome

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      reset()
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bankseta-assessment')
      }
      setCurrentStep(0)
      toast.success('All data cleared')
    }
  }

  return (
    <>
      <Head>
        <title>BANKSETA Workforce Assessment Tool</title>
        <meta name="description" content="Guide your credit provider organisation through BANKSETA funding assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-100">
        {currentStep > 0 && <ProgressBar currentStep={currentStep} totalSteps={steps.length - 1} />}

        <div className="py-8">
          <CurrentStep onExport={() => setShowExportModal(true)} onClear={handleClearAll} />
        </div>

        <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} />
      </main>
    </>
  )
}
