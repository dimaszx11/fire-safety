"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser"
import { ArrowLeft, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
  const controlsRef = useRef<IScannerControls | null>(null)

  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      setError(null)
      codeReaderRef.current = new BrowserMultiFormatReader()

      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      console.log("📷 Devices:", devices)

      const backCamera =
        devices.find((d) =>
          d.label.toLowerCase().includes("back") ||
          d.label.toLowerCase().includes("rear")
        ) || devices[0]

      if (!backCamera) {
        setError("Tidak ada kamera terdeteksi.")
        return
      }

      if (videoRef.current) {
        videoRef.current.setAttribute("playsinline", "true")
      }

      controlsRef.current = await codeReaderRef.current.decodeFromVideoDevice(
        backCamera.deviceId,
        videoRef.current!,
        (result, err) => {
          if (result) {
            handleBarcodeScan(result.getText())
          }
          if (err && err.name !== "NotFoundException") {
            console.error("Scan error:", err)
          }
        }
      )

      setIsScanning(true)
    } catch (err) {
      console.error("Camera error:", err)
      setError("Tidak bisa mengakses kamera. Periksa permission.")
    }
  }

  const stopCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.stop()
      controlsRef.current = null
    }
    setIsScanning(false)
  }

  const handleBarcodeScan = (code: string) => {
    setScannedCode(code)
    console.log("✅ Barcode scanned:", code)
  }

  useEffect(() => {
    return () => stopCamera()
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
                <h1 className="text-2xl font-bold text-foreground">
                  Barcode Scanner
                </h1>
                <p className="text-muted-foreground">
                  Scan equipment barcode for details
                </p>
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
              <CardDescription>
                Point your camera at the equipment barcode to scan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isScanning && !scannedCode && (
                <div className="text-center space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Camera preview will appear here
                      </p>
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
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
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
                    <div className="absolute top-4 left-4 text-white px-3 py-2 rounded-lg text-sm">
                      🔍 Scanning for barcodes...
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
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
                      <p className="text-green-800 font-medium">
                        Barcode Scanned Successfully!
                      </p>
                      <p className="text-green-600 text-sm">
                        Code: {scannedCode}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Redirecting to equipment details...
                  </p>
                </div>
              )}

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Manual Entry Card */}
          <Card>
            <CardHeader>
              <CardTitle>Manual Entry</CardTitle>
              <CardDescription>
                Can't scan? Enter the barcode manually
              </CardDescription>
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
                    const input = document.querySelector(
                      'input[type="text"]'
                    ) as HTMLInputElement
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
