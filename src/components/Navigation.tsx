import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Car" size={32} className="text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TOP CARS</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium ${location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Главная
            </Link>
            <Link
              to="/cars"
              className={`font-medium ${location.pathname === "/cars" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Автомобили
            </Link>
            <Link
              to="/profile"
              className={`font-medium ${location.pathname === "/profile" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Профиль
            </Link>
            <Link to="/auth">
              <Button>Войти</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
