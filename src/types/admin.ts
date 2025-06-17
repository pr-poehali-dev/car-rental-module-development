export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  transmission: string;
  fuel: string;
  seats: number;
  available: boolean;
}

export interface Booking {
  id: number;
  carId: number;
  carName: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "active" | "completed" | "cancelled";
  createdAt: string;
}

export interface CarFormData {
  brand: string;
  model: string;
  year: string;
  price: string;
  image: string;
  transmission: string;
  fuel: string;
  seats: string;
}
