"use client"

import { useState } from "react"
import { Download, Filter, Calendar, BarChart3, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock reports data
const availableReports = [
  {
    id: 1,
    name: "Equipment Compliance Report",
    description: "Comprehensive overview of all equipment compliance status",
    type: "compliance",
    lastGenerated: "2024-01-15",
    format: "PDF",
  },
  {
    id: 2,
    name: "Inspection Summary Report",
    description: "Monthly summary of all completed inspections",
    type: "inspection",
    lastGenerated: "2024-01-10",
    format: "Excel",
  },
  {
    id: 3,
    name: "Critical Issues Report",
    description: "List of all critical issues requiring immediate attention",
    type: "critical",
    lastGenerated: "2024-01-12",
    format: "PDF",
  },
  {
    id: 4,
    name: "Equipment Inventory Report",
    description: "Complete inventory of all fire safety equipment",
    type: "inventory",
    lastGenerated: "2024-01-08",
    format: "Excel",
  },
]

const recentInspections = [
  {
    id: 1,
    equipment: "FE001",
    type: "Fire Extinguisher",
    location: "Building A - Floor 1",
    inspector: "John Smith",
    date: "2024-01-15",
    result: "passed",
    score: 95,
  },
  {
    id: 2,
    equipment: "FA001",
    type: "Fire Alarm",
    location: "Building A - Floor 2",
    inspector: "Jane Doe",
    date: "2024-01-14",
    result: "failed",
    score: 65,
  },
  {
    id: 3,
    equipment: "HY001",
    type: "Hydrant",
    location: "Building B - Parking",
    inspector: "Mike Johnson",
    date: "2024-01-13",
    result: "passed",
    score: 88,
  },
  {
    id: 4,
    equipment: "EL001",
    type: "Emergency Light",
    location: "Building A - Floor 3",
    inspector: "Sarah Wilson",
    date: "2024-01-12",
    result: "passed",
    score: 92,
  },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState("all")
  const [dateRange, setDateRange] = useState<any>(null)

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "compliance":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "inspection":
        return "bg-green-100 text-green-800 border-green-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "inventory":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getResultColor = (result: string) => {
    return result === "passed" ? "text-green-600" : "text-red-600"
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground">Generate and view detailed reports</p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Reports Generated</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-sm text-muted-foreground">Avg Compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Inspections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Pre-configured reports ready for generation</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableReports
                .filter((report) => reportType === "all" || report.type === reportType)
                .map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{report.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getReportTypeColor(report.type)}>{report.type}</Badge>
                            <Badge variant="outline">{report.format}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Last: {report.lastGenerated}</span>
                        <Button size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Inspections Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Inspections</CardTitle>
                <CardDescription>Latest inspection results and scores</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInspections.map((inspection) => (
                  <TableRow key={inspection.id}>
                    <TableCell className="font-medium">{inspection.equipment}</TableCell>
                    <TableCell>{inspection.type}</TableCell>
                    <TableCell>{inspection.location}</TableCell>
                    <TableCell>{inspection.inspector}</TableCell>
                    <TableCell>{inspection.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          inspection.result === "passed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {inspection.result}
                      </Badge>
                    </TableCell>
                    <TableCell className={getScoreColor(inspection.score)}>{inspection.score}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
