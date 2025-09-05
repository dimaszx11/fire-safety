"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Save, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarcodeScanner } from "@/components/barcode-scanner"
import Link from "next/link"

export default function AddEquipmentPage() {
  const [formData, setFormData] = useState({
    barcode: "",
    type: "",
    location: "",
    manufacturer: "",
    model: "",
    serialNumber: "",
    installationDate: "",
    notes: "",
  })
  const [showScanner, setShowScanner] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBarcodeScanned = (code: string) => {
    handleInputChange("barcode", code)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would save to database
    console.log("Saving equipment:", formData)
    // Redirect to equipment list or detail page
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/equipment">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Equipment
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Add New Equipment</h1>
                <p className="text-muted-foreground">Register new fire safety equipment</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Equipment Information</CardTitle>
                <CardDescription>Enter the details for the new equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Barcode */}
                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode / ID *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="barcode"
                      placeholder="Enter or scan barcode"
                      value={formData.barcode}
                      onChange={(e) => handleInputChange("barcode", e.target.value)}
                      required
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => setShowScanner(true)}>
                      <Scan className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Equipment Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Equipment Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fire Extinguisher">Fire Extinguisher</SelectItem>
                      <SelectItem value="Fire Alarm">Fire Alarm</SelectItem>
                      <SelectItem value="Hydrant">Hydrant</SelectItem>
                      <SelectItem value="Hydrant Pump">Hydrant Pump</SelectItem>
                      <SelectItem value="Emergency Light">Emergency Light</SelectItem>
                      <SelectItem value="Emergency Door">Emergency Door</SelectItem>
                      <SelectItem value="Fire Suppression">Fire Suppression</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Building A - Floor 1 - Lobby"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>

                {/* Manufacturer and Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      placeholder="e.g., Amerex"
                      value={formData.manufacturer}
                      onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="e.g., B500"
                      value={formData.model}
                      onChange={(e) => handleInputChange("model", e.target.value)}
                    />
                  </div>
                </div>

                {/* Serial Number and Installation Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Serial Number</Label>
                    <Input
                      id="serialNumber"
                      placeholder="Enter serial number"
                      value={formData.serialNumber}
                      onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installationDate">Installation Date</Label>
                    <Input
                      id="installationDate"
                      type="date"
                      value={formData.installationDate}
                      onChange={(e) => handleInputChange("installationDate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about this equipment..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Equipment
                  </Button>
                  <Link href="/equipment" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>

          <BarcodeScanner isOpen={showScanner} onClose={() => setShowScanner(false)} onScan={handleBarcodeScanned} />
        </div>
      </div>
    </div>
  )
}
