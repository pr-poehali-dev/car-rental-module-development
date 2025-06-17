import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Icon name="Car" size={32} className="text-blue-400" />
              <span className="text-2xl font-bold">TOP CARS</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Ваш надежный партнер в мире автомобилей. Помогаем найти идеальный
              автомобиль для каждого клиента.
            </p>
            <div className="flex space-x-4">
              <Icon name="Phone" size={20} className="text-blue-400" />
              <span className="text-gray-300">+7 (999) 123-45-67</span>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Автомобили
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-blue-400" />
                <span className="text-gray-300">info@topcars.ru</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-blue-400" />
                <span className="text-gray-300">
                  Москва, ул. Примерная, 123
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 TOP CARS. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
