import { Shield, Scan, CheckSquare, BarChart3, TrendingUp, Building2, Users, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-foreground">Fire Safety Manager</h1>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                  Enterprise Safety Management System
                </p>
              </div>
            </div>
            <div className="flex gap-2 md:gap-3">
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent md:size-default">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="md:size-default">
                  <Users className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Settings</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-card to-muted/20 border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
                Professional Fire Safety Equipment Management
              </h2>
              <p className="text-lg mb-6 text-pretty text-black">
                Streamline your safety operations with digital inspections, barcode scanning, and comprehensive
                reporting for complete compliance management.
              </p>
              <div className="flex gap-4">
                <Link href="/scanner">
                  <Button size="lg" className="gap-2">
                    <Scan className="h-5 w-5" />
                    Start Inspection
                  </Button>
                </Link>
                <Link href="/equipment">
                  <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                    <Building2 className="h-5 w-5" />
                    View Equipment
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">75</div>
                  <p className="text-sm text-black">Total Equipment</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-chart-1 mb-2">98%</div>
                  <p className="text-sm text-black">Compliance Rate</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-chart-3 mb-2">12</div>
                  <p className="text-sm text-black">Due This Week</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-secondary mb-2">3</div>
                  <p className="text-sm text-black">Need Attention</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-2">Quick Actions</h3>
          <p className="text-lg text-muted-foreground mb-6 text-pretty">
            Access key features and start your safety management tasks
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/scanner">
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                    <Scan className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Scan Equipment</CardTitle>
                  <CardDescription className="text-black">
                    Quickly scan barcodes to access equipment details and inspection history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="lg">
                    Start Scanning
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/inspection">
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-secondary/20">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-secondary/10 rounded-lg w-fit mb-2">
                    <CheckSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">New Inspection</CardTitle>
                  <CardDescription className="text-black">
                    Perform comprehensive safety inspections with digital checklists
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Create Inspection
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-chart-1/20">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-chart-1/10 rounded-lg w-fit mb-2">
                    <TrendingUp className="h-6 w-6 text-chart-1" />
                  </div>
                  <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
                  <CardDescription className="text-black">
                    Monitor compliance metrics and equipment performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports">
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-chart-3/20">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-chart-3/10 rounded-lg w-fit mb-2">
                    <BarChart3 className="h-6 w-6 text-chart-3" />
                  </div>
                  <CardTitle className="text-lg">Reports & Export</CardTitle>
                  <CardDescription className="text-black">
                    Generate compliance reports and export data for audits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Generate Reports
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Equipment Categories</h3>
              <p className="text-sm text-muted-foreground">Browse equipment by type and view current status</p>
            </div>
            <Link href="/equipment">
              <Button variant="outline" className="gap-2 bg-transparent">
                View All Equipment
                <Building2 className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              {
                name: "Fire Extinguisher",
                icon: "🧯",
                count: 24,
                status: "good",
                href: "/equipment?type=fire-extinguisher",
              },
              { name: "Fire Alarm", icon: "🚨", count: 12, status: "good", href: "/equipment?type=fire-alarm" },
              { name: "Hydrant", icon: "🚰", count: 8, status: "attention", href: "/equipment?type=hydrant" },
              { name: "Hydrant Pump", icon: "⚙️", count: 4, status: "good", href: "/equipment?type=hydrant-pump" },
              {
                name: "Emergency Light",
                icon: "💡",
                count: 18,
                status: "good",
                href: "/equipment?type=emergency-light",
              },
              { name: "Emergency Door", icon: "🚪", count: 6, status: "good", href: "/equipment?type=emergency-door" },
              {
                name: "Fire Suppression",
                icon: "🌊",
                count: 3,
                status: "good",
                href: "/equipment?type=fire-suppression",
              },
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="text-center hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                    <h4 className="font-semibold text-sm mb-2 text-balance">{category.name}</h4>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-bold text-foreground">{category.count}</span>
                      {category.status === "attention" && (
                        <Badge variant="secondary" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />1 Alert
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
