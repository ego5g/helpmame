import Button from './components/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://helpmame.ru',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="bg-cover bg-center text-white flex items-center justify-center py-28 sm:py-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="text-center bg-black bg-opacity-60 p-6 md:p-10 rounded-xl shadow-2xl mx-4">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 [text-shadow:2px_2px_8px_rgba(0,0,0,0.7)]"
          >
            Спокойствие и уверенность для каждой мамы
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl [text-shadow:1px_1px_4px_rgba(0,0,0,0.7)]">
            Профессиональная поддержка по грудному вскармливанию и уходу за новорожденным
          </p>
          <Button href="/consultation" variant="pink" className="text-lg px-8 py-3">
            Получить консультацию
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800">Наши основные услуги</h2>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
                <Button href="/specialist-call" variant="teal">Вызов специалиста на дом</Button>
                <Button href="/consultation" variant="pink">Записаться на консультацию</Button>
                <Button href="/urgent" variant="red">Срочная онлайн помощь</Button>
            </div>
          </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">Как мы можем помочь?</h2>
          <p className="max-w-4xl mx-auto text-gray-700 text-lg sm:text-xl leading-relaxed">
            Мы предлагаем индивидуальные консультации, срочную поддержку и выезды на дом, чтобы помочь вам наладить грудное вскармливание, справиться с трудностями и обрести уверенность в своих силах. Наша цель — сделать ваше материнство счастливым и комфортным.
          </p>
        </div>
      </section>
    </div>
  );
}
