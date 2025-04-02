"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Battery,
  Calendar,
  Clock,
  MapPin,
  Signal,
  ThermometerSun,
  Edit,
  Save,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getDeviceById,
  getDeviceHistory,
  updateDevice,
  clearDeviceLocationHistory,
} from "@/lib/api";
import { Polyline, Popup, Marker } from "react-leaflet";
import SendMessage from "@/components/send-message";

// Dynamically import MapWrapper to ensure it only runs on the client side
const MapWrapper = dynamic(() => import("@/components/map-wrapper"), {
  ssr: false,
});

export default function DeviceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [device, setDevice] = useState<any>(null);
  const [deviceHistory, setDeviceHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    20.5937, 78.9629,
  ]); // Default center of India
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    deviceId: "",
    type: "Vehicle",
    status: "Active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const deviceData = await getDeviceById(params.id);
        setDevice(deviceData);
        setMapCenter([
          deviceData?.location?.lat || 20.5937,
          deviceData?.location?.lng || 78.9629,
        ]);

        // Initialize edit form data
        setEditFormData({
          name: deviceData?.name || "",
          deviceId: deviceData?.deviceId || "",
          type: deviceData?.type || "Vehicle",
          status: deviceData?.status || "Active",
        });
      } catch (err) {
        console.error("Error fetching device data:", err);
        setError("Failed to load device data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceData();
  }, [params.id]);

  useEffect(() => {
    const fetchDeviceHistory = async () => {
      try {
        const historyData = await getDeviceHistory(params.id);
        setDeviceHistory(historyData.slice(-4)); // Only keep the last 4 entries
      } catch (err) {
        console.error("Error fetching device history:", err);
      }
    };

    fetchDeviceHistory();

    const interval = setInterval(() => {
      fetchDeviceHistory();
    }, 2000);

    return () => clearInterval(interval);
  }, [params.id]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateDevice(params.id, editFormData);

      // Update the local state
      setDevice({
        ...device,
        name: editFormData.name,
        deviceId: editFormData.deviceId,
        type: editFormData.type,
        status: editFormData.status,
      });

      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Error updating device:", err);
      setError("Failed to update device. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteHistory = async () => {
    try {
      await clearDeviceLocationHistory(params.id);
      setDeviceHistory([]);
    } catch (err) {
      console.error("Error deleting device history:", err);
      setError("Failed to delete device history. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            Loading device details...
          </p>
        </div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-2">Device not found</p>
          <p className="text-muted-foreground mb-4">
            The device you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/dashboard" className="flex items-center mr-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              variant={device.status === "Active" ? "default" : "secondary"}
            >
              {device.status}
            </Badge>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2">
                  <Edit className="mr-2 h-4 w-4" /> Edit Device
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Device</DialogTitle>
                  <DialogDescription>
                    Update the device information below.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Device Name</Label>
                      <Input
                        id="name"
                        value={editFormData.name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter device name"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="deviceId">Device ID</Label>
                      <Input
                        id="deviceId"
                        value={editFormData.deviceId}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            deviceId: e.target.value,
                          })
                        }
                        placeholder="e.g. NAV-001"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Device Type</Label>
                      <select
                        id="type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={editFormData.type}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="Vehicle">Vehicle</option>
                        <option value="Asset">Asset</option>
                        <option value="Personnel">Personnel</option>
                        <option value="Shipment">Shipment</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={editFormData.status}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{device.name}</CardTitle>
                <CardDescription>{device.deviceId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{device.type}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="font-medium">
                      {formatDate(device.lastUpdated)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Battery className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Battery</span>
                    </div>
                    <span className="font-medium">
                      {device.batteryLevel ?? 0}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Signal className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Signal</span>
                    </div>
                    <span className="font-medium">
                      {device.signalStrength ?? 0}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ThermometerSun className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Temperature</span>
                    </div>
                    <span className="font-medium">
                      {device.temperature ?? 0}°C
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Coordinates</span>
                    </div>
                    <span className="font-medium text-xs">
                      {device.location?.lat?.toFixed(4) ?? "0.0000"},{" "}
                      {device.location?.lng?.toFixed(4) ?? "0.0000"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device History</CardTitle>
                <CardDescription>Recent location updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(deviceHistory || []).map((entry: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        {index < deviceHistory.length - 1 && (
                          <div className="h-10 w-0.5 bg-muted"></div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">
                            {entry.location.lat.toFixed(4)},{" "}
                            {entry.location.lng.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-4"
                  onClick={handleDeleteHistory}
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete History
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>Send a message to the device</CardDescription>
              </CardHeader>
              <CardContent>
                <SendMessage deviceId={params.id} />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Location Tracking</CardTitle>
                    <CardDescription>
                      Real-time location of the device
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] w-full">
                  <MapWrapper
                    device={device}
                    showHistory={true}
                    mapCenter={mapCenter}
                    formatDate={formatDate}
                  >
                    {/* History line */}
                    {deviceHistory.length > 0 && (
                      <Polyline
                        positions={deviceHistory.map((entry: any) => [
                          entry.location.lat,
                          entry.location.lng,
                        ])}
                        color="blue"
                      >
                        <Popup>
                          <div className="p-2">
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(
                                deviceHistory[0].timestamp,
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Time:</strong>{" "}
                              {new Date(
                                deviceHistory[0].timestamp,
                              ).toLocaleTimeString()}
                            </p>
                            <p>
                              <strong>Coordinates:</strong>{" "}
                              {deviceHistory[0].location.lat.toFixed(4)},{" "}
                              {deviceHistory[0].location.lng.toFixed(4)}
                            </p>
                          </div>
                        </Popup>
                      </Polyline>
                    )}
                    {/* Markers */}
                    {deviceHistory.map((entry: any, index: number) => (
                      <Marker
                        key={index}
                        position={[entry.location.lat, entry.location.lng]}
                      >
                        <Popup>
                          <div className="p-2">
                            <p>
                              <strong>Date:</strong>{" "}
                              {new Date(entry.timestamp).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Time:</strong>{" "}
                              {new Date(entry.timestamp).toLocaleTimeString()}
                            </p>
                            <p>
                              <strong>Coordinates:</strong>{" "}
                              {entry.location.lat.toFixed(4)},{" "}
                              {entry.location.lng.toFixed(4)}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapWrapper>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
