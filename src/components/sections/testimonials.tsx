import { Star } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useLanguage } from "src/context/LanguageContext";

const TESTIMONIALS = [
  {
    name: "Elena Gilbert",
    position: "Project Coordinator",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    comment: "asyncz has revolutionized our team's workflow with seamless scheduling and comprehensive data analysis tools, improving productivity across the board."
  },
  {
    name: "Michael Smith",
    position: "Operations Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    comment: "The analytics dashboard gives us incredible insights into our business. We've reduced no-shows by 40% and increased efficiency dramatically."
  },
  {
    name: "Sarah Johnson",
    position: "CEO, HealthCare Plus",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    comment: "Managing multiple branches was a nightmare before asyncz. Now everything is centralized and our team coordination has never been better."
  }
];

export function Testimonials() {
  const { t } = useLanguage();

  return (
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className=" dark:text-gray-300 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t("testimonials.sectionTitlePart1")}{" "}
              <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
              {t("testimonials.sectionTitlePart2")}
            </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              {t("testimonials.sectionSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
                <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 italic">
                    "{testimonial.comment}"
                  </p>
                </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">
              {t("testimonials.ctaTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t("testimonials.ctaDescription")}
            </p>
            <a
                href="https://app.asyncz.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Button className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105">
                {t("testimonials.ctaButton")}
              </Button>
            </a>
          </div>
        </div>
      </section>
  );
}
