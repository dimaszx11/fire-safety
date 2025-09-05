"use client"

import { useState } from "react"
import { Plus, Search, MapPin, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock data - in real app this would come from database
const mockEquipment = [
  {
    id: 1,
    barcode: "FE001",
    type: "Fire Extinguisher",
    location: "Building A - Floor 1 - Lobby",
    manufacturer: "Amerex",
    model: "B500",
    status: "good",
    lastInspection: "2024-01-15",
    nextInspection: "2024-04-15",
    icon: "🧯",
  },
  {
    id: 2,
    barcode: "FA001",
    type: "Fire Alarm",
    location: "Building A - Floor 2 - Hallway",
    manufacturer: "Honeywell",
    model: "FS90",
    status: "needs_attention",
    lastInspection: "2024-01-10",
    nextInspection: "2024-04-10",
    icon: "🚨",
  },
  {
    id: 3,
    barcode: "HY001",
    type: "Hydrant",
    location: "Building B - Parking Lot",
    manufacturer: "Mueller",
    model: "A-423",
    status: "good",
    lastInspection: "2024-01-20",
    nextInspection: "2024-07-20",
    icon: "🚰",
  },
  {
    id: 4,
    barcode: "EL001",
    type: "Emergency Light",
    location: "Building A - Floor 3 - Exit",
    manufacturer: "Lithonia",
    model: "ELM2",
    status: "critical",
    lastInspection: "2023-12-01",
    nextInspection: "2024-03-01",
    icon: "💡",
  },
]

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredEquipment = mockEquipment.filter((item) => {
    const matchesSearch =
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesType = typeFilter === "all" || item.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-800 border-green-200"
      case "needs_attention":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "good":
        return "Good"
      case "needs_attention":
        return "Needs Attention"
      case "critical":
        return "Critical"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Equipment Management</h1>
              <p className="text-muted-foreground">Manage all fire safety equipment</p>
            </div>
            <Link href="/equipment/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by barcode, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="needs_attention">Needs Attention</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Fire Extinguisher">Fire Extinguisher</SelectItem>
              <SelectItem value="Fire Alarm">Fire Alarm</SelectItem>
              <SelectItem value="Hydrant">Hydrant</SelectItem>
              <SelectItem value="Emergency Light">Emergency Light</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((equipment) => (
            <Card key={equipment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{equipment.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{equipment.barcode}</CardTitle>
                      <CardDescription>{equipment.type}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(equipment.status)}>{getStatusText(equipment.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{equipment.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Next: {equipment.nextInspection}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{equipment.manufacturer}</span> - {equipment.model}
                  </div>
                  {equipment.status === "critical" && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Requires immediate attention</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/equipment/${equipment.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/equipment/${equipment.id}/inspect`}>
                    <Button size="sm">Inspect</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No equipment found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
