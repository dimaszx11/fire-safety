"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BrowserMultiFormatReader, NotFoundException, Result } from "@zxing/library"

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
  const router = useRouter()
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Dummy equipment database
  const equipmentDatabase = {
    FE001: { id: 1, type: "Fire Extinguisher", location: "Building A - Floor 1" },
    FA001: { id: 2, type: "Fire Alarm", location: "Building A - Floor 2" },
    HY001: { id: 3, type: "Hydrant", location: "Building B - Parking Lot" },
    EL001: { id: 4, type: "Emergency Light", location: "Building A - Floor 3" },
  }

  // Start camera
  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setHasPermission(true)
        setIsScanning(true)
        startBarcodeDetection()
      }
    } catch (err) {
      console.error("Camera access error:", err)
      setError("Unable to access camera. Please check permissions.")
      setHasPermission(false)
    }
  }

  // Barcode detection loop
  const startBarcodeDetection = () => {
    if (!videoRef.current) return

    codeReaderRef.current = new BrowserMultiFormatReader()

    const detectBarcode = async () => {
      if (!videoRef.current || !isScanning) return
      try {
        const result: Result = await codeReaderRef.current!.decodeFromVideoElement(videoRef.current)
        if (result) {
          handleBarcodeScan(result.getText())
        }
      } catch (err) {
        if (!(err instanceof NotFoundException)) {
          console.error("Barcode detection error:", err)
        }
      }
    }

    // Jalankan scanning tiap 500ms
    scanIntervalRef.current = setInterval(detectBarcode, 500)
  }

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (codeReaderRef.current) {
      codeReaderRef.current.reset()
      codeReaderRef.current = null
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }
    setIsScanning(false)
  }

  // Handle scan result
  const handleBarcodeScan = (code: string) => {
    setScannedCode(code)
    stopCamera()

    if (equipmentDatabase[code as keyof typeof equipmentDatabase]) {
      const equipment = equipmentDatabase[code as keyof typeof equipmentDatabase]
      setTimeout(() => {
        router.push(`/equipment/${equipment.id}`)
      }, 1500)
    } else {
      setError(`Equipment with barcode "${code}" not found in database.`)
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Barcode Scanner</h1>
                <p className="text-muted-foreground">Scan equipment barcode for details</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Scanner Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Camera Scanner
              </CardTitle>
              <CardDescription>Point your camera at the equipment barcode to scan</CardDescription>
            </CardHeader>
            <CardContent>
              {!isScanning && !scannedCode && (
                <div className="text-center space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Camera preview will appear here</p>
                    </div>
                  </div>
                  <Button onClick={startCamera} className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera
                  </Button>
                </div>
              )}

              {isScanning && (
                <div className="space-y-4">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    {/* Scanner overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-32 border-2 border-primary rounded-lg relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary"></div>
                      </div>
                    </div>
                    {/* Real-time scanning indicator */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                      🔍 Scanning for barcodes...
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={stopCamera} variant="outline" className="flex-1 bg-transparent">
                      Stop Camera
                    </Button>
                  </div>
                </div>
              )}

              {scannedCode && (
                <div className="text-center space-y-4">
                  <div className="aspect-video bg-green-50 rounded-lg flex items-center justify-center border-2 border-green-200">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-green-800 font-medium">Barcode Scanned Successfully!</p>
                      <p className="text-green-600 text-sm">Code: {scannedCode}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">Redirecting to equipment details...</p>
                </div>
              )}

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Manual Entry Card */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Entry</CardTitle>
              <CardDescription>Can't scan? Enter the barcode manually</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter barcode (e.g., FE001)"
                  className="flex-1 px-3 py-2 border border-input rounded-md"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const value = (e.target as HTMLInputElement).value
                      if (value) handleBarcodeScan(value)
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('input[type="text"]') as HTMLInputElement
                    if (input?.value) handleBarcodeScan(input.value)
                  }}
                >
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
