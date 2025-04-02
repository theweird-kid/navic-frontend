"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

// Dynamically import the Map component with no SSR
const DeviceMap = dynamic(() => import("@/components/device-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
})

interface MapWrapperProps {
  device: any
  showHistory: boolean
  mapCenter: [number, number]
  formatDate: (date: string) => string
}

export default function MapWrapper({ device, showHistory, mapCenter, formatDate }: MapWrapperProps) {
  useEffect(() => {
    // Import Leaflet CSS
    import("leaflet/dist/leaflet.css")
  }, [])

  return <DeviceMap device={device} showHistory={showHistory} mapCenter={mapCenter} formatDate={formatDate} />
}

