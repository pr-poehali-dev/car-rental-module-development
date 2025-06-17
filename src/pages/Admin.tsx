import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import CarFormDialog from "@/components/admin/CarFormDialog";
import CarCard from "@/components/admin/CarCard";
import BookingStats from "@/components/admin/BookingStats";
import BookingTable from "@/components/admin/BookingTable";
import { Car, Booking, CarFormData } from "@/types/admin";

const Admin = () => {
  const [cars, setCars] = useState<Car[]>([
    {
      id: 1,
      brand: "BMW",
      model: "X5",
      year: 2023,
      price: 8500,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      transmission: "Автомат",
      fuel: "Бензин",
      seats: 5,
      available: true,
    },
    {
      id: 2,
      brand: "Mercedes",
      model: "E-Class",
      year: 2022,
      price: 7200,
      image:
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400",
      transmission: "Автомат",
      fuel: "Бензин",
      seats: 5,
      available: false,
    },
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      carId: 1,
      carName: "BMW X5",
      customerName: "Иван Петров",
      customerPhone: "+7 (999) 123-45-67",
      startDate: "2024-06-20",
      endDate: "2024-06-25",
      totalPrice: 42500,
      status: "active",
      createdAt: "2024-06-17",
    },
    {
      id: 2,
      carId: 2,
      carName: "Mercedes E-Class",
      customerName: "Анна Сидорова",
      customerPhone: "+7 (888) 987-65-43",
      startDate: "2024-06-15",
      endDate: "2024-06-18",
      totalPrice: 21600,
      status: "completed",
      createdAt: "2024-06-14",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<CarFormData>({
    brand: "",
    model: "",
    year: "",
    price: "",
    image: "",
    transmission: "",
    fuel: "",
    seats: "",
  });

  const resetForm = () => {
    setFormData({
      brand: "",
      model: "",
      year: "",
      price: "",
      image: "",
      transmission: "",
      fuel: "",
      seats: "",
    });
    setEditingCar(null);
  };

  const handleSubmit = () => {
    const carData = {
      id: editingCar ? editingCar.id : Date.now(),
      brand: formData.brand,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseInt(formData.price),
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400",
      transmission: formData.transmission,
      fuel: formData.fuel,
      seats: parseInt(formData.seats),
      available: true,
    };

    if (editingCar) {
      setCars(cars.map((car) => (car.id === editingCar.id ? carData : car)));
    } else {
      setCars([...cars, carData]);
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year.toString(),
      price: car.price.toString(),
      image: car.image,
      transmission: car.transmission,
      fuel: car.fuel,
      seats: car.seats.toString(),
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (carId: number) => {
    setCars(cars.filter((car) => car.id !== carId));
  };

  const toggleAvailability = (carId: number) => {
    setCars(
      cars.map((car) =>
        car.id === carId ? { ...car, available: !car.available } : car,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Панель администратора
          </h1>
          <p className="text-gray-600">
            Управление автомобилями и просмотр бронирований
          </p>
        </div>

        <Tabs defaultValue="cars" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cars">Автомобили</TabsTrigger>
            <TabsTrigger value="bookings">История бронирований</TabsTrigger>
          </TabsList>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                Управление автомобилями
              </h2>
              <CarFormDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                editingCar={editingCar}
                formData={formData}
                onFormChange={setFormData}
                onSubmit={handleSubmit}
                onReset={resetForm}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleAvailability={toggleAvailability}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">История бронирований</h2>
              <BookingStats bookings={bookings} />
            </div>
            <BookingTable bookings={bookings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
