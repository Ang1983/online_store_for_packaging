import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-background">
      <div className="bg-secondary/30 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm text-primary">О компании</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 text-gray-900 tracking-tight">О нас</h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Мы создаем премиальную упаковку для тех, кто ценит качество и внимание к деталям
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-3xl mb-6">Наша история</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Дело в коробке</strong> — российская компания, специализирующаяся на производстве
                премиальной упаковки для подарков, мероприятий и бизнеса с 2015 года.
              </p>
              <p>
                Мы верим, что упаковка — это не просто обертка, а часть впечатления от подарка.
                Каждый наш продукт создается с любовью к деталям и заботой о качестве.
              </p>
              <p>
                Наша миссия — помочь вам создать незабываемые моменты, предоставляя упаковку,
                которая подчеркнет ценность вашего подарка и внимание к получателю.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-secondary/20 rounded-2xl">
                <div className="text-4xl font-bold text-primary mb-2">12+</div>
                <div className="text-sm text-gray-600">лет на рынке</div>
              </div>
              <div className="text-center p-6 bg-secondary/20 rounded-2xl">
                <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                <div className="text-sm text-gray-600">довольных клиентов</div>
              </div>
              <div className="text-center p-6 bg-secondary/20 rounded-2xl">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-gray-600">видов упаковки</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl mb-6">Почему выбирают нас</h2>
            <div className="space-y-5">
              <div className="flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:border-secondary/50 transition-colors">
                <div className="w-14 h-14 bg-secondary/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg">Премиальное качество</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Используем только проверенные материалы от ведущих европейских производителей
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:border-secondary/50 transition-colors">
                <div className="w-14 h-14 bg-secondary/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg">Индивидуальный подход</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Возможность создания упаковки с вашим логотипом и фирменным стилем
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:border-secondary/50 transition-colors">
                <div className="w-14 h-14 bg-secondary/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg">Быстрое производство</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Собственное производство позволяет нам выполнять заказы в кратчайшие сроки
                  </p>
                </div>
              </div>

              <div className="flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:border-secondary/50 transition-colors">
                <div className="w-14 h-14 bg-secondary/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg">Экологичность</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Используем перерабатываемые материалы и заботимся об окружающей среде
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 md:p-14 mb-16 border border-gray-100 shadow-sm">
          <h2 className="text-4xl mb-12 text-center tracking-tight">Контактная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-secondary/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-secondary/60 transition-colors">
                <Phone className="w-9 h-9 text-primary" />
              </div>
              <h3 className="mb-3 text-lg">Телефон</h3>
              <a href="tel:+74951234567" className="text-gray-600 hover:text-primary transition-colors">
                +7 (495) 123-45-67
              </a>
              <a href="tel:+78001234567" className="text-gray-600 hover:text-primary transition-colors">
                8 (800) 123-45-67
              </a>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-secondary/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-secondary/60 transition-colors">
                <Mail className="w-9 h-9 text-primary" />
              </div>
              <h3 className="mb-3 text-lg">Email</h3>
              <a href="mailto:info@delovkorobke.ru" className="text-gray-600 hover:text-primary transition-colors">
                info@delovkorobke.ru
              </a>
              <a href="mailto:sales@delovkorobke.ru" className="text-gray-600 hover:text-primary transition-colors">
                sales@delovkorobke.ru
              </a>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-secondary/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-secondary/60 transition-colors">
                <MapPin className="w-9 h-9 text-primary" />
              </div>
              <h3 className="mb-3 text-lg">Адрес</h3>
              <p className="text-gray-600 leading-relaxed">
                г. Москва,<br />
                ул. Примерная, д. 1,<br />
                офис 100
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-secondary/40 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-secondary/60 transition-colors">
                <Clock className="w-9 h-9 text-primary" />
              </div>
              <h3 className="mb-3 text-lg">Часы работы</h3>
              <p className="text-gray-600 leading-relaxed">
                Пн-Пт: 9:00 - 18:00<br />
                Сб-Вс: выходной
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
            <h2 className="text-4xl mb-4 text-center tracking-tight">Свяжитесь с нами</h2>
            <p className="text-gray-600 text-center mb-10 text-lg leading-relaxed">
              Есть вопросы? Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Иван Иванов"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="ivan@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Расскажите о вашем проекте или задайте вопрос..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:gap-3 text-lg shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
