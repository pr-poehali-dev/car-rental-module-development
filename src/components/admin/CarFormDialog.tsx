import React from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { Car, CarFormData } from "@/types/admin";

interface CarFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingCar: Car | null;
  formData: CarFormData;
  onFormChange: (data: CarFormData) => void;
  onSubmit: () => void;
  onReset: () => void;
}

const CarFormDialog: React.FC<CarFormDialogProps> = ({
  isOpen,
  onOpenChange,
  editingCar,
  formData,
  onFormChange,
  onSubmit,
  onReset,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onReset}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить автомобиль
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingCar ? "Редактировать автомобиль" : "Добавить автомобиль"}
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
                  onFormChange({ ...formData, brand: e.target.value })
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
                  onFormChange({ ...formData, model: e.target.value })
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
                  onFormChange({ ...formData, year: e.target.value })
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
                  onFormChange({ ...formData, price: e.target.value })
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
                onFormChange({ ...formData, image: e.target.value })
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
                  onFormChange({ ...formData, transmission: value })
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
                  onFormChange({ ...formData, fuel: value })
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
                onFormChange({ ...formData, seats: e.target.value })
              }
              placeholder="5"
            />
          </div>
          <Button onClick={onSubmit} className="w-full">
            {editingCar ? "Сохранить изменения" : "Добавить автомобиль"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarFormDialog;
