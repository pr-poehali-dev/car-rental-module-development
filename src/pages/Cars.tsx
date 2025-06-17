import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

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

const cars: Car[] = [
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
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400",
    transmission: "Автомат",
    fuel: "Бензин",
    seats: 5,
    available: true,
  },
  {
    id: 3,
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 6800,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
    transmission: "Автомат",
    fuel: "Бензин",
    seats: 5,
    available: false,
  },
];

export default function Cars() {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");

  const handleFilter = () => {
    let filtered = cars;

    if (selectedBrand) {
      filtered = filtered.filter((car) => car.brand === selectedBrand);
    }

    if (maxPrice) {
      filtered = filtered.filter((car) => car.price <= parseInt(maxPrice));
    }

    if (minYear) {
      filtered = filtered.filter((car) => car.year >= parseInt(minYear));
    }

    setFilteredCars(filtered);
  };

  const resetFilters = () => {
    setSelectedBrand("");
    setMaxPrice("");
    setMinYear("");
    setFilteredCars(cars);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Автомобили</h1>
          <p className="text-gray-600">
            Выберите идеальный автомобиль для аренды
          </p>
        </div>

        {/* Фильтры */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Filter" size={20} />
              Фильтры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите марку" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BMW">BMW</SelectItem>
                  <SelectItem value="Mercedes">Mercedes</SelectItem>
                  <SelectItem value="Audi">Audi</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Макс. цена в день"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />

              <Input
                type="number"
                placeholder="Год от"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
              />

              <div className="flex gap-2">
                <Button onClick={handleFilter} className="flex-1">
                  Применить
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  Сбросить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Список автомобилей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                {!car.available && (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    Не доступен
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-600">{car.year} год</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Icon name="Users" size={16} />
                    {car.seats} мест
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Fuel" size={16} />
                    {car.fuel}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Settings" size={16} />
                    {car.transmission}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      {car.price.toLocaleString()} ₽
                    </span>
                    <span className="text-gray-600 text-sm">/день</span>
                  </div>

                  <Button
                    disabled={!car.available}
                    className="flex items-center gap-2"
                  >
                    <Icon name="Calendar" size={16} />
                    {car.available ? "Забронировать" : "Недоступен"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Icon
                name="Car"
                size={48}
                className="mx-auto mb-4 text-gray-400"
              />
              <h3 className="text-xl font-semibold mb-2">
                Автомобили не найдены
              </h3>
              <p className="text-gray-600 mb-4">
                Попробуйте изменить параметры фильтрации
              </p>
              <Button onClick={resetFilters}>Сбросить фильтры</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
