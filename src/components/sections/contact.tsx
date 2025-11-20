import { useState } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Label } from "src/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "src/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "src/lib/queryClient";
import { useLanguage, getLocalizedPath } from "src/context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from "src/config/seo";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: t('contact.thankYou'),
        description: t('contact.thankYou'),
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: t('contact.error'),
        description: t('contact.error'),
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t("contact.validationError"),
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const contactInfo = [
    CONTACT_PHONE && {
      icon: Phone,
      title: t("contact.phoneTitle"),
      content: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE}`
    },
    {
      icon: Mail,
      title: t("contact.emailTitle"),
      content: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`
    },
    {
      icon: MapPin,
      title: t("contact.addressTitle"),
      content: `${CONTACT_ADDRESS.street}, ${CONTACT_ADDRESS.city}, ${CONTACT_ADDRESS.state} ${CONTACT_ADDRESS.postalCode}, ${CONTACT_ADDRESS.country}`
    }
  ].filter(Boolean);

  return (
      <section id="contact" className="py-12 sm:py-16 lg:py-20 section-alt">
        <div className="max-w-7xl dark:text-gray-300 mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {t("contact.sectionTitle")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              {t("contact.sectionDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
                {t("contact.infoTitle")}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 brand-gradient rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <info.icon className="text-white h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">{info.title}</h4>
                        {info.href ? (
                            <a href={info.href} className="text-emerald-600 dark:text-emerald-300 text-sm sm:text-base">
                              {info.content}
                            </a>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{info.content}</p>
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t("contact.fields.name")}
                  </Label>
                  <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("contact.fields.namePlaceholder")}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t("contact.fields.email")}
                  </Label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("contact.fields.emailPlaceholder")}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t("contact.fields.subject")}
                  </Label>
                  <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={t("contact.fields.subjectPlaceholder")}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t("contact.fields.message")}
                  </Label>
                  <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t("contact.fields.messagePlaceholder")}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
                  <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full sm:w-auto brand-gradient text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactMutation.isPending ? t("contact.sending") : t("contact.sendMessage")}
                  </Button>
                  <Button
                      variant="outline"
                      className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold border-emerald-400 text-emerald-600 dark:text-emerald-300"
                      asChild
                  >
                    <a href={getLocalizedPath(language, "/contact")}>{t("contact.goToContactPage")}</a>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}