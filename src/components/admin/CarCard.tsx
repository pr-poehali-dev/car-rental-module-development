import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Car } from "@/types/admin";

interface CarCardProps {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (carId: number) => void;
  onToggleAvailability: (carId: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  onEdit,
  onDelete,
  onToggleAvailability,
}) => {
  return (
    <Card className="overflow-hidden">
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
            onClick={() => onEdit(car)}
            className="flex-1"
          >
            <Icon name="Edit" size={14} className="mr-1" />
            Изменить
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleAvailability(car.id)}
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
            onClick={() => onDelete(car.id)}
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
