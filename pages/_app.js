import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useAssessmentStore, loadFromLocalStorage } from '../store'

function MyApp({ Component, pageProps }) {
  const store = useAssessmentStore()

  useEffect(() => {
    // Load saved data on mount
    const saved = loadFromLocalStorage()
    if (saved) {
      // Restore each part of state
      if (saved.org) store.setOrg(saved.org)
      if (saved.assessment) store.setAssessment(saved.assessment)
      if (saved.interventions) {
        // Restore interventions manually
        saved.interventions.forEach(intervention => {
          store.addIntervention(intervention)
        })
      }
      if (saved.businessJustification) store.setBusinessJustification(saved.businessJustification)
      if (saved.implementation) store.setImplementation(saved.implementation)
    }
  }, [])

  // Save state whenever it changes
  useEffect(() => {
    const state = {
      org: store.org,
      assessment: store.assessment,
      interventions: store.interventions,
      businessJustification: store.businessJustification,
      implementation: store.implementation,
    }
    // Use a timeout to debounce saves
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bankseta-assessment', JSON.stringify(state))
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [store.org, store.assessment, store.interventions, store.businessJustification, store.implementation])

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </>
  )
}

export default MyApp
