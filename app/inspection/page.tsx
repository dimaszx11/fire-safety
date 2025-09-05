"use client"

import { useState } from "react"
import { Plus, Search, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock inspection data
const mockInspections = [
  {
    id: 1,
    equipmentId: 1,
    equipmentBarcode: "FE001",
    equipmentType: "Fire Extinguisher",
    location: "Building A - Floor 1 - Lobby",
    status: "completed",
    result: "passed",
    inspector: "John Smith",
    date: "2024-01-15",
    nextDue: "2024-04-15",
    icon: "🧯",
  },
  {
    id: 2,
    equipmentId: 2,
    equipmentBarcode: "FA001",
    equipmentType: "Fire Alarm",
    location: "Building A - Floor 2 - Hallway",
    status: "pending",
    result: null,
    inspector: null,
    date: null,
    nextDue: "2024-04-10",
    icon: "🚨",
  },
  {
    id: 3,
    equipmentId: 4,
    equipmentBarcode: "EL001",
    equipmentType: "Emergency Light",
    location: "Building A - Floor 3 - Exit",
    status: "overdue",
    result: null,
    inspector: null,
    date: null,
    nextDue: "2024-03-01",
    icon: "💡",
  },
]

export default function InspectionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInspections = mockInspections.filter((inspection) => {
    const matchesSearch =
      inspection.equipmentBarcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.equipmentType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inspection.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getResultColor = (result: string | null) => {
    if (!result) return ""
    return result === "passed" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Inspection Management</h1>
              <p className="text-muted-foreground">Manage equipment inspections and checklists</p>
            </div>
            <Link href="/inspection/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Inspection
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Due This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inspections List */}
        <div className="space-y-4">
          {filteredInspections.map((inspection) => (
            <Card key={inspection.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-2xl">{inspection.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{inspection.equipmentBarcode}</h3>
                        <Badge className={getStatusColor(inspection.status)}>
                          {getStatusIcon(inspection.status)}
                          <span className="ml-1 capitalize">{inspection.status}</span>
                        </Badge>
                        {inspection.result && (
                          <Badge variant="outline" className={getResultColor(inspection.result)}>
                            {inspection.result === "passed" ? "Passed" : "Failed"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-1">{inspection.equipmentType}</p>
                      <p className="text-sm text-muted-foreground mb-2">{inspection.location}</p>
                      <div className="flex items-center gap-4 text-sm">
                        {inspection.date && <span>Last: {inspection.date}</span>}
                        <span className={inspection.status === "overdue" ? "text-red-600 font-medium" : ""}>
                          Due: {inspection.nextDue}
                        </span>
                        {inspection.inspector && <span>Inspector: {inspection.inspector}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {inspection.status === "completed" ? (
                      <Link href={`/inspection/${inspection.id}`}>
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/inspection/checklist/${inspection.equipmentId}`}>
                        <Button size="sm">Start Inspection</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInspections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No inspections found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
