// API service for interacting with the backend
const API_BASE_URL = "http://localhost:8080/api";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || `API error: ${response.status}`);
  }
  return response.json();
};

// Authentication functions
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);

  // Store token in localStorage for future requests
  if (data.token) {
    localStorage.setItem("auth_token", data.token);
  }

  return data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  return handleResponse(response);
};

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// Device management functions
export const getDevices = async () => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const getDeviceById = async (deviceId: string) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const getDeviceHistory = async (deviceId: string) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const addDevice = async (deviceData: any) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/devices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deviceData),
  });

  return handleResponse(response);
};

export const updateDevice = async (deviceId: string, deviceData: any) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(deviceData),
  });

  return handleResponse(response);
};

export const deleteDevice = async (deviceId: string) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};

export const updateDeviceLocation = async (
  deviceId: string,
  locationData: { lat: number; lng: number },
) => {
  // This is a public route, no auth token needed
  const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/location`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(locationData),
  });

  return handleResponse(response);
};

// Send message to device
export const sendMessageToDevice = async (
  deviceId: string,
  message: string,
) => {
  const token = getAuthToken();
  console.log("Sending message:", message);
  const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  return handleResponse(response);
};

export const clearDeviceLocationHistory = async (deviceId: string) => {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/location`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(response);
};
