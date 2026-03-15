const API_BASE = "https://localhost:7032/api"


export interface Room {
  id: number
  roomNumber: string
  basePrice: number
  status: number
  type: string
  description?: string
  numberOfBeds: number;
}

export interface Booking {
  id: number
  userId: number
  roomId: number
  roomNumber: string
  guestName: string
  checkInDate: string
  checkOutDate: string
  finalPrice: number
  status: number
}

export interface BookingRequest {
  userId: number
  roomId: number
  checkInDate: string
  checkOutDate: string
}

export interface UserProfile {
  id: number
  tz?: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  role?: string
}

export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return { "Content-Type": "application/json" }
  const token = localStorage.getItem("token") ?? ""
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function getRooms(): Promise<Room[]> {
  const res = await fetch(`${API_BASE}/Rooms`)
  if (!res.ok) throw new Error("Failed to fetch rooms")
  return res.json()
}

export async function updateRoom(id: number, data: any): Promise<Room> {
  const payload = {
    roomNumber: String(data.roomNumber),
    basePrice: Number(data.basePrice),
    numberOfBeds: Number(data.numberOfBeds) || 1,
    type: data.type || "" 
  };

  const res = await fetch(`${API_BASE}/Rooms/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload), 
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("שגיאת שרת מפורטת:", errorText);
    throw new Error(errorText || "Failed to update room");
  }
  return { ...data, id }; 
}

export async function deleteRoom(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Rooms/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error("Failed to delete room")
}

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_BASE}/Bookings`, {
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error("Failed to fetch bookings")
  return res.json()
}

export async function createBooking(booking: BookingRequest): Promise<Booking> {
  const res = await fetch(`${API_BASE}/Bookings`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(booking),
  })
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || "Failed to create booking")
  }
  return res.json()
}

export async function deleteBooking(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/Bookings/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error("Failed to delete booking")
}

export async function cleanupExpiredBookings(): Promise<void> {
  const res = await fetch(`${API_BASE}/Bookings/cleanup-expired`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error("Failed to cleanup expired bookings")
}


export const fetchUser = async (tz: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/User/${tz}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

export const updateUser = async (tz: string, userData: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/User/${tz}`, { 
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};