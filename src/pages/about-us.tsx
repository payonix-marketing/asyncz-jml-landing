import { useMemo } from "react";
import { Header } from "src/components/layout/header";
import { Footer } from "src/components/layout/footer";
import { Button } from "src/components/ui/button";
import {
    Users,
    Target,
    Award,
    Globe,
    Zap,
    Heart,
    Clock,
    TrendingUp,
    CheckCircle,
    Star,
    Calendar,
    Briefcase
} from "lucide-react";
import { useLanguage } from "src/context/LanguageContext";
import { Seo } from "src/components/Seo";
import { organizationSchema } from "src/config/schema";

export default function AboutUs() {
    const { t } = useLanguage();

    const seoConfig = useMemo(
        () => ({
            title: t("about.pageTitle"),
            description: t("about.metaDescription"),
            path: "/about-us",
            keywords: ["asyncz mission", "asyncz leadership", "asyncz culture"],
            structuredData: organizationSchema
        }),
        [t]
    );

    // Helper function to get array items
    const getArrayItems = (key: string): any[] => {
        const result = t(key);
        return Array.isArray(result) ? result : [];
    };

    const stats = [
        { icon: Users, value: getArrayItems("about.stats")[0]?.value || "", label: getArrayItems("about.stats")[0]?.label || "" },
        { icon: Calendar, value: getArrayItems("about.stats")[1]?.value || "", label: getArrayItems("about.stats")[1]?.label || "" },
        { icon: Globe, value: getArrayItems("about.stats")[2]?.value || "", label: getArrayItems("about.stats")[2]?.label || "" },
        { icon: TrendingUp, value: getArrayItems("about.stats")[3]?.value || "", label: getArrayItems("about.stats")[3]?.label || "" }
    ];

    const values = [
        {
            icon: Zap,
            title: getArrayItems("about.values")[0]?.title || "",
            description: getArrayItems("about.values")[0]?.description || ""
        },
        {
            icon: Heart,
            title: getArrayItems("about.values")[1]?.title || "",
            description: getArrayItems("about.values")[1]?.description || ""
        },
        {
            icon: CheckCircle,
            title: getArrayItems("about.values")[2]?.title || "",
            description: getArrayItems("about.values")[2]?.description || ""
        },
        {
            icon: Globe,
            title: getArrayItems("about.values")[3]?.title || "",
            description: getArrayItems("about.values")[3]?.description || ""
        }
    ];

    const milestones = [
        {
            year: getArrayItems("about.milestones")[0]?.year || "",
            title: getArrayItems("about.milestones")[0]?.title || "",
            description: getArrayItems("about.milestones")[0]?.description || ""
        },
        {
            year: getArrayItems("about.milestones")[1]?.year || "",
            title: getArrayItems("about.milestones")[1]?.title || "",
            description: getArrayItems("about.milestones")[1]?.description || ""
        },
        {
            year: getArrayItems("about.milestones")[2]?.year || "",
            title: getArrayItems("about.milestones")[2]?.title || "",
            description: getArrayItems("about.milestones")[2]?.description || ""
        },
        {
            year: getArrayItems("about.milestones")[3]?.year || "",
            title: getArrayItems("about.milestones")[3]?.title || "",
            description: getArrayItems("about.milestones")[3]?.description || ""
        },
        {
            year: getArrayItems("about.milestones")[4]?.year || "",
            title: getArrayItems("about.milestones")[4]?.title || "",
            description: getArrayItems("about.milestones")[4]?.description || ""
        }
    ];

    return (
        <div className="min-h-screen dark:text-gray-300">
            <Seo {...seoConfig} />
            <Header />

            <main>
                {/* Hero Section */}
                <section className="py-20 hero-gradient">
                    <div className="max-w-6xl mx-auto px-4 pt-16 dark:text-gray-300 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
                                {t("about.heroTitle")}{" "}
                                <span className="bg-gradient-to-r from-orange-400 to-green-500 bg-clip-text text-transparent">
                                    {t("common.asyncz")}
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                                {t("about.heroDescription")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                                    {t("about.heroButtonFreeTrial")}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all"
                                >
                                    {t("about.heroButtonContactSales")}
                                </Button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="text-white h-8 w-8" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                                    <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-6">{t("about.ourStoryTitle")}</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                    {t("about.ourStory1")}
                                </p>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                    {t("about.ourStory2")}
                                </p>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    {t("about.ourStory3")}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-100 to-green-100 dark:from-orange-900 dark:to-green-900 p-8 rounded-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <Award className="h-8 w-8 text-orange-500 mr-4" />
                                        <div>
                                            <h3 className="font-semibold">{t("about.industryRecognition")}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{t("about.industryRecognitionDesc")}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-8 w-8 text-yellow-500 mr-4" />
                                        <div>
                                            <h3 className="font-semibold">{t("about.customerSatisfaction")}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{t("about.customerSatisfactionDesc")}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Briefcase className="h-8 w-8 text-blue-500 mr-4" />
                                        <div>
                                            <h3 className="font-semibold">{t("about.enterpriseTrust")}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{t("about.enterpriseTrustDesc")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-20 section-alt">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t("about.missionVisionTitle")}</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t("about.missionVisionSubtitle")}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <Target className="h-12 w-12 text-orange-500 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">{t("about.missionTitle")}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t("about.missionDesc")}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <Globe className="h-12 w-12 text-green-500 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">{t("about.visionTitle")}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t("about.visionDesc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values */}
                <section className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t("about.valuesTitle")}</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                {t("about.valuesSubtitle")}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all">
                                    <value.icon className="h-12 w-12 text-green-500 mb-6" />
                                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="py-20 section-alt">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-6">{t("about.journeyTitle")}</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">
                                {t("about.journeySubtitle")}
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-green-500 rounded-full"></div>

                            <div className="space-y-12">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                                <div className="text-green-500 font-bold text-lg mb-2">{milestone.year}</div>
                                                <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                                            </div>
                                        </div>

                                        <div className="w-8 h-8 brand-gradient rounded-full flex items-center justify-center z-10">
                                            <Clock className="h-4 w-4 text-white" />
                                        </div>

                                        <div className="w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Info */}
                <section className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-6">{t("about.companyInfoTitle")}</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                                {t("about.companyInfoDesc")}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Company Details */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-6">{t("about.companyDetailsTitle")}</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">Company</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{t("about.company")}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Product</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{t("about.product")}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Founded</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{t("about.founded")}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Headquarters</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{t("about.headquarters")}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Global Reach</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{t("about.globalReach")}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Contact</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{t("about.contact")}</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold mb-4">{t("about.officeAddressTitle")}</h4>
                                    <div className="text-gray-600 dark:text-gray-300">
                                        <p>{t("about.officeAddress1")}</p>
                                        <p>{t("about.officeAddress2")}</p>
                                        <p></p>
                                        <p className="mt-2">{t("about.officeEmail")}</p>
                                        <p>{t("about.officePhone")}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-bold mb-6">{t("about.locationTitle")}</h3>
                                <div className="relative">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.506323956158!2d55.37495332618117!3d25.118567484879563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6f9f1fbfb607%3A0x4db0a2f5f59532d9!2sIFZA%20Business%20Park!5e0!3m2!1sen!2sde!4v1749576504538!5m2!1sen!2sde"
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="rounded-lg"
                                        title="asyncz by Deviofy Location in IFZA Business Park, Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates"
                                    ></iframe>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        {t("about.locationDesc")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold mb-6">{t("about.ctaTitle")}</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            {t("about.ctaDesc")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="brand-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                                {t("about.ctaButtonFreeTrial")}
                            </Button>
                            <Button
                                variant="outline"
                                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-all"
                            >
                                {t("about.ctaButtonScheduleDemo")}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}