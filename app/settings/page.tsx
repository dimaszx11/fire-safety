"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, Shield, User, Database, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    inspectionReminders: true,
    equipmentAlerts: true,
    systemUpdates: false,
    emailReports: true,
  })

  const [preferences, setPreferences] = useState({
    defaultInspectionInterval: "30",
    autoSaveInterval: "5",
    language: "id",
    theme: "light",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Pengaturan</h1>
              <p className="text-sm text-gray-600">Kelola preferensi aplikasi</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Profile Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-red-600" />
              Profil Pengguna
            </CardTitle>
            <CardDescription>Informasi akun dan profil inspector</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Masukkan nama lengkap" defaultValue="Inspector Safety" />
              </div>
              <div>
                <Label htmlFor="employee-id">ID Karyawan</Label>
                <Input id="employee-id" placeholder="Masukkan ID karyawan" defaultValue="SF001" />
              </div>
              <div>
                <Label htmlFor="department">Departemen</Label>
                <Select defaultValue="safety">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Keselamatan Kerja</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="facility">Facility Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-red-600" />
              Notifikasi
            </CardTitle>
            <CardDescription>Atur preferensi notifikasi dan pengingat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Pengingat Inspeksi</Label>
                <p className="text-sm text-gray-600">Notifikasi jadwal inspeksi mendatang</p>
              </div>
              <Switch
                checked={notifications.inspectionReminders}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, inspectionReminders: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alert Peralatan</Label>
                <p className="text-sm text-gray-600">Peringatan kondisi peralatan bermasalah</p>
              </div>
              <Switch
                checked={notifications.equipmentAlerts}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, equipmentAlerts: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Update Sistem</Label>
                <p className="text-sm text-gray-600">Notifikasi pembaruan aplikasi</p>
              </div>
              <Switch
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, systemUpdates: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Laporan Email</Label>
                <p className="text-sm text-gray-600">Laporan mingguan via email</p>
              </div>
              <Switch
                checked={notifications.emailReports}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailReports: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Inspection Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-red-600" />
              Preferensi Inspeksi
            </CardTitle>
            <CardDescription>Pengaturan default untuk proses inspeksi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="inspection-interval">Interval Inspeksi Default (hari)</Label>
              <Select
                value={preferences.defaultInspectionInterval}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, defaultInspectionInterval: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 hari</SelectItem>
                  <SelectItem value="14">14 hari</SelectItem>
                  <SelectItem value="30">30 hari</SelectItem>
                  <SelectItem value="60">60 hari</SelectItem>
                  <SelectItem value="90">90 hari</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="auto-save">Auto Save Interval (menit)</Label>
              <Select
                value={preferences.autoSaveInterval}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, autoSaveInterval: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 menit</SelectItem>
                  <SelectItem value="5">5 menit</SelectItem>
                  <SelectItem value="10">10 menit</SelectItem>
                  <SelectItem value="15">15 menit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Smartphone className="h-4 w-4 text-red-600" />
              Preferensi Aplikasi
            </CardTitle>
            <CardDescription>Pengaturan tampilan dan bahasa aplikasi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Bahasa</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, theme: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Terang</SelectItem>
                  <SelectItem value="dark">Gelap</SelectItem>
                  <SelectItem value="system">Sistem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data & Storage */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4 text-red-600" />
              Data & Penyimpanan
            </CardTitle>
            <CardDescription>Kelola data aplikasi dan penyimpanan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sinkronisasi Otomatis</Label>
                <p className="text-sm text-gray-600">Sinkronkan data secara otomatis</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mode Offline</Label>
                <p className="text-sm text-gray-600">Simpan data untuk akses offline</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Database className="h-4 w-4 mr-2" />
                Backup Data
              </Button>
              <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                Hapus Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="pb-6">
          <Button className="w-full bg-red-600 hover:bg-red-700">Simpan Pengaturan</Button>
        </div>
      </div>
    </div>
  )
}
