"use client"

import { useEffect, useRef, useState } from "react"
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser"

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
  const controlsRef = useRef<IScannerControls | null>(null)

  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  // Start camera
  // Start camera
const startCamera = async () => {
  try {
    setError(null)
    codeReaderRef.current = new BrowserMultiFormatReader()

    const devices = await BrowserMultiFormatReader.listVideoInputDevices()
    console.log("📷 Devices:", devices) // debug, lihat daftar kamera

    // fallback ke kamera pertama kalau tidak ada "back"
    const backCamera =
      devices.find((d) =>
        d.label.toLowerCase().includes("back") ||
        d.label.toLowerCase().includes("rear")
      ) || devices[0]

    if (!backCamera) {
      setError("Tidak ada kamera terdeteksi.")
      return
    }

    // penting untuk Safari/iOS
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


  // Stop camera
  const stopCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.stop() // ✅ stop kamera dengan benar
      controlsRef.current = null
    }
    setIsScanning(false)
  }

  // Handle hasil scan
  const handleBarcodeScan = (code: string) => {
    setScannedCode(code)
    stopCamera() // otomatis stop setelah scan pertama
  }

  // Auto start kamera saat load
  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>📷 Barcode Scanner</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <video
        ref={videoRef}
        style={{ width: "100%", maxWidth: 400, border: "2px solid #333" }}
        autoPlay
        muted
      />

      <div style={{ marginTop: 20 }}>
        {isScanning ? (
          <button onClick={stopCamera}>Stop Kamera</button>
        ) : (
          <button onClick={startCamera}>Start Kamera</button>
        )}
      </div>

      {scannedCode && (
        <div style={{ marginTop: 20 }}>
          <h2>✅ Hasil Scan:</h2>
          <p>{scannedCode}</p>
        </div>
      )}
    </div>
  )
}
