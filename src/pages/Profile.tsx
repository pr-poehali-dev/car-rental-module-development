import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

interface Booking {
  id: number;
  car: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled";
  total: number;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    car: "BMW X5 2023",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    status: "active",
    total: 42500,
  },
  {
    id: 2,
    car: "Mercedes E-Class 2022",
    startDate: "2023-12-10",
    endDate: "2023-12-15",
    status: "completed",
    total: 36000,
  },
];

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "Александр Петров",
    email: "alex.petrov@example.com",
    phone: "+7 (999) 123-45-67",
    avatar: "",
  });

  const [bookings] = useState(mockBookings);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Обновление профиля:", userInfo);
    // Здесь будет логика обновления профиля
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
        return "Активная";
      case "completed":
        return "Завершена";
      case "cancelled":
        return "Отменена";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Личный кабинет
          </h1>
          <p className="text-gray-600">
            Управляйте своим профилем и бронированиями
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="bookings">Бронирования</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Информация о профиле
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback className="text-xl">
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{userInfo.name}</h3>
                    <p className="text-gray-600">Клиент TOP CARS</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Icon name="Camera" size={16} className="mr-2" />
                      Изменить фото
                    </Button>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit">
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  История бронирований
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">
                            {booking.car}
                          </h4>
                          <p className="text-gray-600">
                            {new Date(booking.startDate).toLocaleDateString(
                              "ru-RU",
                            )}{" "}
                            -{" "}
                            {new Date(booking.endDate).toLocaleDateString(
                              "ru-RU",
                            )}
                          </p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusText(booking.status)}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">
                          {booking.total.toLocaleString()} ₽
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="FileText" size={16} className="mr-2" />
                            Детали
                          </Button>
                          {booking.status === "active" && (
                            <Button variant="destructive" size="sm">
                              <Icon name="X" size={16} className="mr-2" />
                              Отменить
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={20} />
                  Настройки аккаунта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Email уведомления</h4>
                    <p className="text-gray-600 text-sm">
                      Получать уведомления о бронированиях
                    </p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">SMS уведомления</h4>
                    <p className="text-gray-600 text-sm">
                      Получать SMS о статусе заказов
                    </p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Изменить пароль</h4>
                    <p className="text-gray-600 text-sm">
                      Обновить пароль для входа
                    </p>
                  </div>
                  <Button variant="outline">
                    <Icon name="Key" size={16} className="mr-2" />
                    Изменить
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <Button variant="destructive">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить аккаунт
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
