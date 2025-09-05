"use client"

import { ArrowLeft, Calendar, User, CheckCircle, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock inspection report data
const mockInspectionReport = {
  id: 1,
  equipmentId: 1,
  equipmentBarcode: "FE001",
  equipmentType: "Fire Extinguisher",
  location: "Building A - Floor 1 - Lobby",
  inspector: "John Smith",
  date: "2024-01-15",
  overallCondition: "good",
  result: "passed",
  notes: "Equipment is in good working condition. Minor dust accumulation cleaned during inspection.",
  checklistItems: {
    accessibility: true,
    visual_condition: true,
    pressure_gauge: true,
    safety_seal: true,
    location_sign: true,
    inspection_tag: false,
  },
  photos: [],
}

const checklistLabels = {
  accessibility: "Accessibility Check",
  visual_condition: "Visual Condition",
  pressure_gauge: "Pressure Gauge",
  safety_seal: "Safety Seal/Pin",
  location_sign: "Location Signage",
  inspection_tag: "Inspection Tag",
}

export default function InspectionReportPage() {
  const params = useParams()
  const report = mockInspectionReport // In real app, fetch by params.id

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-green-100 text-green-800 border-green-200"
      case "fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getResultColor = (result: string) => {
    return result === "passed"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200"
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
                <h1 className="text-2xl font-bold text-foreground">Inspection Report</h1>
                <p className="text-muted-foreground">
                  {report.equipmentBarcode} - {report.equipmentType}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export PDF</Button>
              <Button variant="outline">Print Report</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Report Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Inspection Summary</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getResultColor(report.result)}>
                    {report.result === "passed" ? (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    {report.result === "passed" ? "Passed" : "Failed"}
                  </Badge>
                  <Badge className={getConditionColor(report.overallCondition)}>
                    {report.overallCondition.charAt(0).toUpperCase() + report.overallCondition.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Equipment</label>
                  <p className="text-foreground">
                    {report.equipmentBarcode} - {report.equipmentType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-foreground">{report.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Inspector</label>
                  <p className="text-foreground flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {report.inspector}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Inspection Date</label>
                  <p className="text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {report.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checklist Results */}
          <Card>
            <CardHeader>
              <CardTitle>Checklist Results</CardTitle>
              <CardDescription>Detailed inspection checklist items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(report.checklistItems).map(([key, passed]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{checklistLabels[key as keyof typeof checklistLabels]}</span>
                    <div className="flex items-center gap-2">
                      {passed ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Pass
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          <X className="h-3 w-3 mr-1" />
                          Fail
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {report.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Inspector Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{report.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Documentation Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {report.photos.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No photos were taken during this inspection</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {report.photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg"></div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
