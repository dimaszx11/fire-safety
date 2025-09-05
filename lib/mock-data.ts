// Enhanced mock data structure for Fire Safety Management System

export interface Equipment {
  id: string
  barcode: string
  name: string
  type: string
  location: string
  manufacturer: string
  model: string
  serialNumber: string
  installationDate: string
  lastInspectionDate: string
  nextInspectionDate: string
  status: "operational" | "needs_attention" | "out_of_service"
  condition: "excellent" | "good" | "fair" | "poor"
  notes?: string
}

export interface Inspection {
  id: string
  equipmentId: string
  equipmentName: string
  inspectorName: string
  inspectionDate: string
  overallCondition: "passed" | "failed" | "needs_attention"
  checklist: {
    accessibility: boolean
    visualCondition: boolean
    pressureGauge?: boolean
    safetyPin?: boolean
    hoseCondition?: boolean
    signage: boolean
    mounting: boolean
  }
  photos: string[]
  notes: string
}

export interface EquipmentType {
  id: string
  name: string
  description: string
  icon: string
  inspectionInterval: number // days
}

// Equipment Types
export const equipmentTypes: EquipmentType[] = [
  {
    id: "fire-extinguisher",
    name: "Fire Extinguisher (APAR)",
    description: "Portable fire extinguishing equipment",
    icon: "🧯",
    inspectionInterval: 30,
  },
  {
    id: "fire-alarm",
    name: "Fire Alarm",
    description: "Fire detection and alarm system",
    icon: "🚨",
    inspectionInterval: 90,
  },
  {
    id: "hydrant",
    name: "Fire Hydrant",
    description: "Water supply for firefighting",
    icon: "🚰",
    inspectionInterval: 180,
  },
  {
    id: "hydrant-pump",
    name: "Hydrant Pump",
    description: "Water pressure system for hydrants",
    icon: "⚙️",
    inspectionInterval: 90,
  },
  {
    id: "emergency-light",
    name: "Emergency Light",
    description: "Emergency illumination system",
    icon: "💡",
    inspectionInterval: 30,
  },
  {
    id: "emergency-door",
    name: "Emergency Door",
    description: "Emergency exit access",
    icon: "🚪",
    inspectionInterval: 90,
  },
  {
    id: "fire-suppression",
    name: "Fire Suppression System",
    description: "Automatic fire suppression",
    icon: "🌊",
    inspectionInterval: 180,
  },
]

// Mock Equipment Data
export const mockEquipment: Equipment[] = [
  {
    id: "eq-001",
    barcode: "FE001234567890",
    name: "Fire Extinguisher - Main Lobby",
    type: "fire-extinguisher",
    location: "Building A - Main Lobby",
    manufacturer: "Amerex Corporation",
    model: "B402",
    serialNumber: "AX2024001",
    installationDate: "2024-01-15",
    lastInspectionDate: "2024-11-01",
    nextInspectionDate: "2024-12-01",
    status: "operational",
    condition: "excellent",
    notes: "Recently serviced, all components in good condition",
  },
  {
    id: "eq-002",
    barcode: "FA002345678901",
    name: "Smoke Detector - Conference Room",
    type: "fire-alarm",
    location: "Building A - Conference Room 201",
    manufacturer: "Honeywell",
    model: "SD-851",
    serialNumber: "HW2024002",
    installationDate: "2024-02-10",
    lastInspectionDate: "2024-10-15",
    nextInspectionDate: "2025-01-15",
    status: "operational",
    condition: "good",
  },
  {
    id: "eq-003",
    barcode: "HY003456789012",
    name: "Fire Hydrant - Parking Lot",
    type: "hydrant",
    location: "Building A - East Parking Lot",
    manufacturer: "Mueller Company",
    model: "A-423",
    serialNumber: "MC2024003",
    installationDate: "2024-01-20",
    lastInspectionDate: "2024-08-20",
    nextInspectionDate: "2025-02-20",
    status: "needs_attention",
    condition: "fair",
    notes: "Valve requires minor adjustment",
  },
  {
    id: "eq-004",
    barcode: "EL004567890123",
    name: "Emergency Exit Light - Stairwell",
    type: "emergency-light",
    location: "Building A - Stairwell B",
    manufacturer: "Lithonia Lighting",
    model: "ELM2",
    serialNumber: "LL2024004",
    installationDate: "2024-03-05",
    lastInspectionDate: "2024-11-05",
    nextInspectionDate: "2024-12-05",
    status: "operational",
    condition: "excellent",
  },
  {
    id: "eq-005",
    barcode: "HP005678901234",
    name: "Fire Pump - Mechanical Room",
    type: "hydrant-pump",
    location: "Building A - Mechanical Room",
    manufacturer: "Grundfos",
    model: "CR64-2",
    serialNumber: "GF2024005",
    installationDate: "2024-01-30",
    lastInspectionDate: "2024-09-30",
    nextInspectionDate: "2024-12-30",
    status: "operational",
    condition: "good",
  },
]

// Mock Inspection Data
export const mockInspections: Inspection[] = [
  {
    id: "insp-001",
    equipmentId: "eq-001",
    equipmentName: "Fire Extinguisher - Main Lobby",
    inspectorName: "John Smith",
    inspectionDate: "2024-11-01",
    overallCondition: "passed",
    checklist: {
      accessibility: true,
      visualCondition: true,
      pressureGauge: true,
      safetyPin: true,
      hoseCondition: true,
      signage: true,
      mounting: true,
    },
    photos: ["/fire-extinguisher-inspection.jpg"],
    notes: "All checks passed. Equipment in excellent condition.",
  },
  {
    id: "insp-002",
    equipmentId: "eq-002",
    equipmentName: "Smoke Detector - Conference Room",
    inspectorName: "Sarah Johnson",
    inspectionDate: "2024-10-15",
    overallCondition: "passed",
    checklist: {
      accessibility: true,
      visualCondition: true,
      signage: true,
      mounting: true,
    },
    photos: ["/smoke-detector-inspection.jpg"],
    notes: "Detector functioning properly. Battery level good.",
  },
  {
    id: "insp-003",
    equipmentId: "eq-003",
    equipmentName: "Fire Hydrant - Parking Lot",
    inspectorName: "Mike Wilson",
    inspectionDate: "2024-08-20",
    overallCondition: "needs_attention",
    checklist: {
      accessibility: true,
      visualCondition: false,
      signage: true,
      mounting: true,
    },
    photos: ["/fire-hydrant-inspection.jpg"],
    notes: "Valve handle shows signs of corrosion. Recommend maintenance.",
  },
]

// Database simulation functions
export const db = {
  equipment: {
    findAll: async (): Promise<Equipment[]> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockEquipment
    },

    findById: async (id: string): Promise<Equipment | null> => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockEquipment.find((eq) => eq.id === id) || null
    },

    findByBarcode: async (barcode: string): Promise<Equipment | null> => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockEquipment.find((eq) => eq.barcode === barcode) || null
    },

    create: async (equipment: Omit<Equipment, "id">): Promise<Equipment> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newEquipment = {
        ...equipment,
        id: `eq-${Date.now()}`,
      }
      mockEquipment.push(newEquipment)
      return newEquipment
    },

    update: async (id: string, updates: Partial<Equipment>): Promise<Equipment | null> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const index = mockEquipment.findIndex((eq) => eq.id === id)
      if (index === -1) return null

      mockEquipment[index] = { ...mockEquipment[index], ...updates }
      return mockEquipment[index]
    },
  },

  inspections: {
    findAll: async (): Promise<Inspection[]> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockInspections
    },

    findById: async (id: string): Promise<Inspection | null> => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockInspections.find((insp) => insp.id === id) || null
    },

    findByEquipmentId: async (equipmentId: string): Promise<Inspection[]> => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockInspections.filter((insp) => insp.equipmentId === equipmentId)
    },

    create: async (inspection: Omit<Inspection, "id">): Promise<Inspection> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newInspection = {
        ...inspection,
        id: `insp-${Date.now()}`,
      }
      mockInspections.push(newInspection)
      return newInspection
    },
  },

  equipmentTypes: {
    findAll: async (): Promise<EquipmentType[]> => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return equipmentTypes
    },
  },
}

// Analytics functions
export const analytics = {
  getEquipmentStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const total = mockEquipment.length
    const operational = mockEquipment.filter((eq) => eq.status === "operational").length
    const needsAttention = mockEquipment.filter((eq) => eq.status === "needs_attention").length
    const outOfService = mockEquipment.filter((eq) => eq.status === "out_of_service").length

    return {
      total,
      operational,
      needsAttention,
      outOfService,
      operationalPercentage: Math.round((operational / total) * 100),
    }
  },

  getInspectionStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const total = mockInspections.length
    const passed = mockInspections.filter((insp) => insp.overallCondition === "passed").length
    const failed = mockInspections.filter((insp) => insp.overallCondition === "failed").length
    const needsAttention = mockInspections.filter((insp) => insp.overallCondition === "needs_attention").length

    return {
      total,
      passed,
      failed,
      needsAttention,
      passRate: Math.round((passed / total) * 100),
    }
  },

  getUpcomingInspections: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    return mockEquipment.filter((eq) => {
      const nextInspection = new Date(eq.nextInspectionDate)
      return nextInspection <= nextWeek
    })
  },
}
