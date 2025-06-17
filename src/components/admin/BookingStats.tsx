import React from "react";
import { Card } from "@/components/ui/card";
import { Booking } from "@/types/admin";

interface BookingStatsProps {
  bookings: Booking[];
}

const BookingStats: React.FC<BookingStatsProps> = ({ bookings }) => {
  const activeBookings = bookings.filter((b) => b.status === "active").length;
  const completedBookings = bookings.filter(
    (b) => b.status === "completed",
  ).length;

  return (
    <div className="flex gap-4">
      <Card className="px-4 py-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {activeBookings}
          </div>
          <div className="text-sm text-gray-600">Активных</div>
        </div>
      </Card>
      <Card className="px-4 py-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {completedBookings}
          </div>
          <div className="text-sm text-gray-600">Завершенных</div>
        </div>
      </Card>
    </div>
  );
};

export default BookingStats;
