const API_BASE = "https://localhost:7032/api"

export interface Room {
  id: number
  roomNumber: string
  basePrice: number
  status: number 
  floor?: number
  numberOfBeds?: number
}

export interface Booking {
  id: number;
  userId: number;
  roomId: number;    
  roomNumber?: string; 
  guestName?: string;
  checkInDate: string;
  checkOutDate: string;
  finalPrice: number;
  status: number;
}

export interface BookingRequest {
  userId: number;
  roomId: number;    
  checkInDate: string;
  checkOutDate: string;
  status: number;
}

export async function fetchRooms(): Promise<Room[]> {
  const res = await fetch(`${API_BASE}/Rooms`)
  if (!res.ok) throw new Error("Failed to fetch rooms")
  return res.json()
}

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_BASE}/Bookings`)
  if (!res.ok) throw new Error("Failed to fetch bookings")
  return res.json()
}

export async function createBooking(booking: BookingRequest): Promise<Booking> {
  const res = await fetch(`${API_BASE}/Bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  })
  if (!res.ok) throw new Error("Failed to create booking")
  return res.json()
}

export async function assignRoom(bookingId: number, roomId: number) {
  const res = await fetch(`${API_BASE}/BookingRoom`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId, roomId }),
  })
  if (!res.ok) throw new Error("Failed to assign room")
  return res.json()
}