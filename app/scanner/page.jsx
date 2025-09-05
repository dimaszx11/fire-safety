"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Camera } from "lucide-react"
import { BrowserMultiFormatReader } from "@zxing/browser"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)
  const [scannedCode, setScannedCode] = useState(null)
  const videoRef = useRef(null)
  const router = useRouter()

  const codeReaderRef = useRef(null)

  const mockEquipment = {
    FE001: { id: 1, type: "Fire Extinguisher", location: "Building A - Floor 1" },
    FA001: { id: 2, type: "Fire Alarm", location: "Building A - Floor 2" },
    HY001: { id: 3, type: "Hydrant", location: "Building B - Parking Lot" },
    EL001: { id: 4, type: "Emergency Light", location: "Building A - Floor 3" },
  }

  const handleScanResult = (code) => {
    setScannedCode(code)
    stopCamera()
    const equipment = mockEquipment[code]
    if (equipment) {
      setTimeout(() => router.push(`/equipment/${equipment.id}`), 1500)
    } else {
      setError(`Equipment with barcode "${code}" not found in database.`)
    }
  }

  const startCamera = async () => {
    try {
      setError(null)
      setScannedCode(null)
      const video = videoRef.current
      if (!video) return

      // stop stream lama
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((t) => t.stop())
      }

      const codeReader = new BrowserMultiFormatReader()
      codeReaderRef.current = codeReader

      // cari device kamera belakang
      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      const backCamera = devices.find((d) =>
        /back|rear|environment/i.test(d.label)
      )
      const constraints = {
        video: backCamera
          ? { deviceId: backCamera.deviceId }
          : { facingMode: "environment" },
      }

      // minta izin & dapatkan stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      // pasang stream ke video
      video.srcObject = stream
      await video.play() // penting

      // mulai decode
      codeReader.decodeFromStream(stream, video, (result, err) => {
        if (result) handleScanResult(result.getText())
      })

      setIsScanning(true)
    } catch (e) {
      console.error("Camera access error:", e)
      setError("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    codeReaderRef.current = null
    const video = videoRef.current
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach((t) => t.stop())
      video.srcObject = null
    }
    setIsScanning(false)
  }

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
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
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Camera Scanner
              </CardTitle>
              <CardDescription>
                Point your camera at the equipment barcode
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isScanning && !scannedCode && (
                <div className="text-center space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div>
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
                  </div>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="w-full"
                  >
                    Stop Camera
                  </Button>
                </div>
              )}

              {scannedCode && (
                <div className="text-center space-y-4">
                  <div className="aspect-video bg-green-50 rounded-lg flex items-center justify-center border-2 border-green-200">
                    <div>
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
        </div>
      </div>
    </div>
  )
}
