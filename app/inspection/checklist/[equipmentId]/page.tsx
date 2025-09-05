"use client"

import { useState } from "react"
import { ArrowLeft, Camera, Save, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Mock equipment data
const mockEquipment = {
  1: {
    barcode: "FE001",
    type: "Fire Extinguisher",
    location: "Building A - Floor 1 - Lobby",
    manufacturer: "Amerex",
    model: "B500",
    icon: "🧯",
  },
}

// Fire Extinguisher checklist items
const fireExtinguisherChecklist = [
  {
    id: "accessibility",
    label: "Accessibility Check",
    description: "Equipment is easily accessible and not blocked",
    required: true,
  },
  {
    id: "visual_condition",
    label: "Visual Condition",
    description: "No visible damage, corrosion, or leakage",
    required: true,
  },
  {
    id: "pressure_gauge",
    label: "Pressure Gauge",
    description: "Pressure gauge shows proper pressure level",
    required: true,
  },
  {
    id: "safety_seal",
    label: "Safety Seal/Pin",
    description: "Safety seal and pin are intact and in place",
    required: true,
  },
  {
    id: "location_sign",
    label: "Location Signage",
    description: "Fire extinguisher sign is visible and legible",
    required: true,
  },
  {
    id: "inspection_tag",
    label: "Inspection Tag",
    description: "Previous inspection tag is present and up to date",
    required: false,
  },
]

export default function InspectionChecklistPage() {
  const params = useParams()
  const router = useRouter()
  const equipmentId = params.equipmentId as string
  const equipment = mockEquipment[equipmentId as keyof typeof mockEquipment]

  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({})
  const [overallCondition, setOverallCondition] = useState("")
  const [notes, setNotes] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [inspectorName, setInspectorName] = useState("")

  const handleChecklistChange = (itemId: string, checked: boolean) => {
    setChecklistItems((prev) => ({ ...prev, [itemId]: checked }))
  }

  const handleSubmit = () => {
    // Validate required fields
    const requiredItems = fireExtinguisherChecklist.filter((item) => item.required)
    const missingItems = requiredItems.filter((item) => !checklistItems[item.id])

    if (missingItems.length > 0 || !overallCondition || !inspectorName) {
      alert("Please complete all required fields")
      return
    }

    // In real app, save to database
    console.log("Inspection completed:", {
      equipmentId,
      checklistItems,
      overallCondition,
      notes,
      photos,
      inspectorName,
      date: new Date().toISOString(),
    })

    // Redirect to inspection list
    router.push("/inspection")
  }

  const allRequiredCompleted = fireExtinguisherChecklist
    .filter((item) => item.required)
    .every((item) => checklistItems[item.id])

  const failedItems = fireExtinguisherChecklist.filter((item) => checklistItems[item.id] === false)

  if (!equipment) {
    return <div>Equipment not found</div>
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
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <span className="text-2xl">{equipment.icon}</span>
                  Inspection Checklist
                </h1>
                <p className="text-muted-foreground">
                  {equipment.barcode} - {equipment.type}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Equipment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Barcode</Label>
                  <p className="text-foreground">{equipment.barcode}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <p className="text-foreground">{equipment.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                  <p className="text-foreground">{equipment.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inspector Info */}
          <Card>
            <CardHeader>
              <CardTitle>Inspector Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="inspector">Inspector Name *</Label>
                  <input
                    id="inspector"
                    type="text"
                    placeholder="Enter inspector name"
                    value={inspectorName}
                    onChange={(e) => setInspectorName(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md mt-1"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Inspection Date</Label>
                  <p className="text-foreground">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Inspection Checklist</CardTitle>
              <CardDescription>Complete all required checks for this equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fireExtinguisherChecklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mt-1">
                      <Checkbox
                        id={item.id}
                        checked={checklistItems[item.id] || false}
                        onCheckedChange={(checked) => handleChecklistChange(item.id, checked as boolean)}
                      />
                      {item.required && <span className="text-red-500 text-sm">*</span>}
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={item.id} className="font-medium cursor-pointer">
                        {item.label}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      {checklistItems[item.id] === false && (
                        <div className="mt-2">
                          <Alert className="border-red-200 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                              This item failed inspection. Please provide details in the notes section.
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overall Condition */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Condition Assessment *</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={overallCondition} onValueChange={setOverallCondition}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excellent" id="excellent" />
                  <Label htmlFor="excellent" className="text-green-700">
                    Excellent - No issues found
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="good" />
                  <Label htmlFor="good" className="text-green-600">
                    Good - Minor issues, equipment functional
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fair" id="fair" />
                  <Label htmlFor="fair" className="text-yellow-600">
                    Fair - Some issues, needs attention
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="poor" id="poor" />
                  <Label htmlFor="poor" className="text-red-600">
                    Poor - Significant issues, immediate action required
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Inspection Notes</CardTitle>
              <CardDescription>
                {failedItems.length > 0 && "Please provide details about failed items and any other observations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter any additional notes, observations, or details about failed items..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className={failedItems.length > 0 ? "border-yellow-300" : ""}
              />
              {failedItems.length > 0 && (
                <p className="text-sm text-yellow-600 mt-2">
                  Failed items: {failedItems.map((item) => item.label).join(", ")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Documentation Photos</CardTitle>
              <CardDescription>Take photos to document equipment condition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                {photos.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">No photos taken yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={!allRequiredCompleted || !overallCondition || !inspectorName}
            >
              <Save className="h-4 w-4 mr-2" />
              Complete Inspection
            </Button>
            <Link href="/inspection" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Cancel
              </Button>
            </Link>
          </div>

          {(!allRequiredCompleted || !overallCondition || !inspectorName) && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Please complete all required fields before submitting the inspection.</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
