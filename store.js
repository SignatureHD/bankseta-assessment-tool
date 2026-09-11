import { create } from 'zustand';

export const useAssessmentStore = create((set) => ({
  // Step 0: Organisation
  org: {
    name: '',
    role: '',
    email: '',
    phone: '',
    leverPaying: false,
  },
  setOrg: (org) => set({ org }),

  // Step 1: Assessment
  assessment: {
    affectedRoles: [],
    businessChanges: '',
    capabilityGaps: [],
  },
  setAssessment: (assessment) => set({ assessment }),
  addRole: (role) => set((state) => ({
    assessment: {
      ...state.assessment,
      affectedRoles: [...state.assessment.affectedRoles, role],
    },
  })),
  removeRole: (role) => set((state) => ({
    assessment: {
      ...state.assessment,
      affectedRoles: state.assessment.affectedRoles.filter((r) => r !== role),
    },
  })),
  addGap: (gap) => set((state) => ({
    assessment: {
      ...state.assessment,
      capabilityGaps: [...state.assessment.capabilityGaps, gap],
    },
  })),
  removeGap: (gap) => set((state) => ({
    assessment: {
      ...state.assessment,
      capabilityGaps: state.assessment.capabilityGaps.filter((g) => g !== gap),
    },
  })),
  setBusinessChanges: (changes) => set((state) => ({
    assessment: {
      ...state.assessment,
      businessChanges: changes,
    },
  })),

  // Step 2: Interventions
  interventions: [],
  addIntervention: (intervention) => set((state) => ({
    interventions: [...state.interventions, { ...intervention, id: Date.now() }],
  })),
  removeIntervention: (id) => set((state) => ({
    interventions: state.interventions.filter((i) => i.id !== id),
  })),
  updateIntervention: (id, updates) => set((state) => ({
    interventions: state.interventions.map((i) =>
      i.id === id ? { ...i, ...updates } : i
    ),
  })),

  // Step 3: Business Case
  businessJustification: '',
  setBusinessJustification: (text) => set({ businessJustification: text }),

  // Step 4: Implementation
  implementation: {
    startDate: '',
    duration: '',
    metrics: '',
  },
  setImplementation: (impl) => set({ implementation: impl }),

  // Current step
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),

  // Utilities
  reset: () => set({
    org: { name: '', role: '', email: '', phone: '', leverPaying: false },
    assessment: { affectedRoles: [], businessChanges: '', capabilityGaps: [] },
    interventions: [],
    businessJustification: '',
    implementation: { startDate: '', duration: '', metrics: '' },
    currentStep: 0,
  }),
}));

// Helper function to save state to localStorage
export const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('bankseta-assessment', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

// Helper function to load state from localStorage
export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('bankseta-assessment');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
    return null;
  }
};
