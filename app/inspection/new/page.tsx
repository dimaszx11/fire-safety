"use client"

import { useState } from "react"
import { ArrowLeft, Scan, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarcodeScanner } from "@/components/barcode-scanner"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock equipment data
const mockEquipment = {
  FE001: { id: 1, type: "Fire Extinguisher", location: "Building A - Floor 1" },
  FA001: { id: 2, type: "Fire Alarm", location: "Building A - Floor 2" },
  HY001: { id: 3, type: "Hydrant", location: "Building B - Parking Lot" },
  EL001: { id: 4, type: "Emergency Light", location: "Building A - Floor 3" },
}

export default function NewInspectionPage() {
  const [showScanner, setShowScanner] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleBarcodeScanned = (code: string) => {
    const equipment = mockEquipment[code as keyof typeof mockEquipment]
    if (equipment) {
      router.push(`/inspection/checklist/${equipment.id}`)
    } else {
      alert(`Equipment with barcode "${code}" not found`)
    }
  }

  const handleManualSearch = () => {
    const equipment = mockEquipment[searchTerm as keyof typeof mockEquipment]
    if (equipment) {
      router.push(`/inspection/checklist/${equipment.id}`)
    } else {
      alert(`Equipment with barcode "${searchTerm}" not found`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/inspection">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Inspections
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">New Inspection</h1>
                <p className="text-muted-foreground">Select equipment to inspect</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Scan Equipment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Scan Equipment Barcode
              </CardTitle>
              <CardDescription>Use your camera to scan the equipment barcode</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowScanner(true)} className="w-full">
                <Scan className="h-4 w-4 mr-2" />
                Start Camera Scanner
              </Button>
            </CardContent>
          </Card>

          {/* Manual Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Manual Entry
              </CardTitle>
              <CardDescription>Enter the equipment barcode manually</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter barcode (e.g., FE001)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchTerm) {
                      handleManualSearch()
                    }
                  }}
                />
                <Button onClick={handleManualSearch} disabled={!searchTerm}>
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Select from available equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(mockEquipment).map(([code, equipment]) => (
                  <Button
                    key={code}
                    variant="outline"
                    onClick={() => router.push(`/inspection/checklist/${equipment.id}`)}
                    className="w-full text-left justify-start"
                  >
                    <div>
                      <div className="font-medium">{code}</div>
                      <div className="text-xs text-muted-foreground">
                        {equipment.type} - {equipment.location}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BarcodeScanner isOpen={showScanner} onClose={() => setShowScanner(false)} onScan={handleBarcodeScanned} />
    </div>
  )
}
