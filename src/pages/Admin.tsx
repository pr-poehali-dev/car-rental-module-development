import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import Navigation from "@/components/Navigation";

interface Car {
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

interface Booking {
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
  const [formData, setFormData] = useState({
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активна";
      case "completed":
        return "Завершена";
      case "cancelled":
        return "Отменена";
      default:
        return status;
    }
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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить автомобиль
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCar
                        ? "Редактировать автомобиль"
                        : "Добавить автомобиль"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Марка</Label>
                        <Input
                          id="brand"
                          value={formData.brand}
                          onChange={(e) =>
                            setFormData({ ...formData, brand: e.target.value })
                          }
                          placeholder="BMW"
                        />
                      </div>
                      <div>
                        <Label htmlFor="model">Модель</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) =>
                            setFormData({ ...formData, model: e.target.value })
                          }
                          placeholder="X5"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="year">Год</Label>
                        <Input
                          id="year"
                          type="number"
                          value={formData.year}
                          onChange={(e) =>
                            setFormData({ ...formData, year: e.target.value })
                          }
                          placeholder="2023"
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Цена/день</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          placeholder="8500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="image">URL изображения</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Коробка передач</Label>
                        <Select
                          value={formData.transmission}
                          onValueChange={(value) =>
                            setFormData({ ...formData, transmission: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Автомат">Автомат</SelectItem>
                            <SelectItem value="Механика">Механика</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Топливо</Label>
                        <Select
                          value={formData.fuel}
                          onValueChange={(value) =>
                            setFormData({ ...formData, fuel: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Бензин">Бензин</SelectItem>
                            <SelectItem value="Дизель">Дизель</SelectItem>
                            <SelectItem value="Электро">Электро</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="seats">Количество мест</Label>
                      <Input
                        id="seats"
                        type="number"
                        value={formData.seats}
                        onChange={(e) =>
                          setFormData({ ...formData, seats: e.target.value })
                        }
                        placeholder="5"
                      />
                    </div>
                    <Button onClick={handleSubmit} className="w-full">
                      {editingCar
                        ? "Сохранить изменения"
                        : "Добавить автомобиль"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Card key={car.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {car.brand} {car.model} {car.year}
                      </CardTitle>
                      <Badge variant={car.available ? "default" : "secondary"}>
                        {car.available ? "Доступен" : "Занят"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{car.transmission}</span>
                      <span>{car.fuel}</span>
                      <span>{car.seats} мест</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {car.price.toLocaleString()} ₽/день
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(car)}
                        className="flex-1"
                      >
                        <Icon name="Edit" size={14} className="mr-1" />
                        Изменить
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAvailability(car.id)}
                        className="flex-1"
                      >
                        <Icon
                          name={car.available ? "Ban" : "Check"}
                          size={14}
                          className="mr-1"
                        />
                        {car.available ? "Снять" : "Вернуть"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(car.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">История бронирований</h2>
              <div className="flex gap-4">
                <Card className="px-4 py-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {bookings.filter((b) => b.status === "active").length}
                    </div>
                    <div className="text-sm text-gray-600">Активных</div>
                  </div>
                </Card>
                <Card className="px-4 py-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {bookings.filter((b) => b.status === "completed").length}
                    </div>
                    <div className="text-sm text-gray-600">Завершенных</div>
                  </div>
                </Card>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Автомобиль</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Период</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Дата создания</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        #{booking.id}
                      </TableCell>
                      <TableCell>{booking.carName}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.customerPhone}</TableCell>
                      <TableCell>
                        {new Date(booking.startDate).toLocaleDateString()} -{" "}
                        {new Date(booking.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {booking.totalPrice.toLocaleString()} ₽
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusText(booking.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
