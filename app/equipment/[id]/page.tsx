"use client"
import { ArrowLeft, Edit, Calendar, MapPin, Wrench, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data - in real app this would come from database
const mockEquipmentDetail = {
  id: 1,
  barcode: "FE001",
  type: "Fire Extinguisher",
  location: "Building A - Floor 1 - Lobby",
  manufacturer: "Amerex",
  model: "B500",
  serialNumber: "AMX-2023-001",
  installationDate: "2023-01-15",
  status: "good",
  lastInspection: "2024-01-15",
  nextInspection: "2024-04-15",
  icon: "🧯",
  notes: "Regular maintenance completed. All systems functioning properly.",
  inspectionHistory: [
    {
      id: 1,
      date: "2024-01-15",
      inspector: "John Smith",
      status: "passed",
      notes: "All checks passed. Equipment in good condition.",
    },
    {
      id: 2,
      date: "2023-10-15",
      inspector: "Jane Doe",
      status: "passed",
      notes: "Minor cleaning required, otherwise good.",
    },
    {
      id: 3,
      date: "2023-07-15",
      inspector: "Mike Johnson",
      status: "failed",
      notes: "Pressure gauge needs calibration. Fixed during inspection.",
    },
  ],
}

export default function EquipmentDetailPage() {
  const params = useParams()
  const equipment = mockEquipmentDetail // In real app, fetch by params.id

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

  const getInspectionStatusIcon = (status: string) => {
    return status === "passed" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-600" />
    )
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
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <span className="text-2xl">{equipment.icon}</span>
                  {equipment.barcode}
                </h1>
                <p className="text-muted-foreground">{equipment.type}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/equipment/${equipment.id}/edit`}>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Link href={`/equipment/${equipment.id}/inspect`}>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Inspect Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equipment Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Equipment Information</CardTitle>
                  <Badge className={getStatusColor(equipment.status)}>{getStatusText(equipment.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Barcode</label>
                    <p className="text-foreground">{equipment.barcode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Type</label>
                    <p className="text-foreground">{equipment.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Manufacturer</label>
                    <p className="text-foreground">{equipment.manufacturer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Model</label>
                    <p className="text-foreground">{equipment.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Serial Number</label>
                    <p className="text-foreground">{equipment.serialNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Installation Date</label>
                    <p className="text-foreground">{equipment.installationDate}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <p className="text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {equipment.location}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-foreground">{equipment.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Inspection History */}
            <Card>
              <CardHeader>
                <CardTitle>Inspection History</CardTitle>
                <CardDescription>Recent inspection records for this equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipment.inspectionHistory.map((inspection) => (
                    <div key={inspection.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      {getInspectionStatusIcon(inspection.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{inspection.date}</span>
                          <Badge variant={inspection.status === "passed" ? "default" : "destructive"}>
                            {inspection.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">Inspector: {inspection.inspector}</p>
                        <p className="text-sm">{inspection.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Inspection Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Inspection</label>
                  <p className="text-foreground">{equipment.lastInspection}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Next Inspection</label>
                  <p className="text-foreground font-medium">{equipment.nextInspection}</p>
                </div>
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Inspection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Start Inspection
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
