"use client"

import { useState } from "react"
import { BarChart3, AlertTriangle, CheckCircle, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import Link from "next/link"

// Mock dashboard data
const dashboardStats = {
  totalEquipment: 75,
  inspectionsCompleted: 45,
  inspectionsPending: 18,
  inspectionsOverdue: 12,
  complianceRate: 85,
  criticalIssues: 3,
}

const equipmentByType = [
  { name: "Fire Extinguisher", count: 24, status: "good" },
  { name: "Emergency Light", count: 18, status: "good" },
  { name: "Fire Alarm", count: 12, status: "attention" },
  { name: "Hydrant", count: 8, status: "good" },
  { name: "Emergency Door", count: 6, status: "good" },
  { name: "Hydrant Pump", count: 4, status: "good" },
  { name: "Fire Suppression", count: 3, status: "critical" },
]

const inspectionTrends = [
  { month: "Jan", completed: 12, failed: 2 },
  { month: "Feb", completed: 15, failed: 1 },
  { month: "Mar", completed: 18, failed: 3 },
  { month: "Apr", completed: 22, failed: 2 },
  { month: "May", completed: 20, failed: 4 },
  { month: "Jun", completed: 25, failed: 1 },
]

const complianceData = [
  { name: "Compliant", value: 63, color: "#22c55e" },
  { name: "Needs Attention", value: 9, color: "#eab308" },
  { name: "Critical", value: 3, color: "#ef4444" },
]

const recentAlerts = [
  {
    id: 1,
    type: "overdue",
    equipment: "EL001 - Emergency Light",
    location: "Building A - Floor 3",
    daysOverdue: 15,
    severity: "high",
  },
  {
    id: 2,
    type: "failed",
    equipment: "FS001 - Fire Suppression",
    location: "Building B - Server Room",
    issue: "Pressure system failure",
    severity: "critical",
  },
  {
    id: 3,
    type: "maintenance",
    equipment: "FA002 - Fire Alarm",
    location: "Building A - Floor 2",
    issue: "Battery replacement needed",
    severity: "medium",
  },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("6months")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Fire Safety Dashboard</h1>
              <p className="text-muted-foreground">Overview of equipment status and inspection metrics</p>
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/reports">
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="text-sm font-medium text-blackack text-black">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Total Equipment</p>
                  <p className="text-3xl font-bold">{dashboardStats.totalEquipment}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Compliance Rate</p>
                  <p className="text-3xl font-bold">{dashboardStats.complianceRate}%</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <Progress value={dashboardStats.complianceRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Pending Inspections</p>
                  <p className="text-3xl font-bold">{dashboardStats.inspectionsPending}</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Critical Issues</p>
                  <p className="text-3xl font-bold text-red-600">{dashboardStats.criticalIssues}</p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Equipment Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment by Type</CardTitle>
              <CardDescription>Distribution of equipment across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={equipmentByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#15803d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
              <CardDescription>Current compliance status across all equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {complianceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspection Trends */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Inspection Trends</CardTitle>
            <CardDescription>Monthly inspection completion and failure rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inspectionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} name="Completed" />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Failed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Critical issues requiring immediate attention</CardDescription>
              </div>
              <Link href="/alerts">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{alert.equipment}</h4>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </p>
                    <p className="text-sm">
                      {alert.type === "overdue" && `Inspection overdue by ${alert.daysOverdue} days`}
                      {alert.type === "failed" && alert.issue}
                      {alert.type === "maintenance" && alert.issue}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
