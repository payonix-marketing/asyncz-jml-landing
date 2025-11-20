import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "src/components/ui/toaster";
import { TooltipProvider } from "src/components/ui/tooltip";
import { ThemeProvider } from "src/components/layout/theme-provider";
import { ScrollToTop } from "src/components/ui/scroll-to-top";
import { useLanguage } from "src/context/LanguageContext";
import { useEffect, lazy, Suspense } from "react";
import { createAnalyticsLog } from "./api/api";
import Clarity from "@microsoft/clarity";
import { Helmet } from "react-helmet-async";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";

// Lazy load pages
const Home = lazy(() => import("src/pages/home"));
const PricingDetails = lazy(() => import("src/pages/pricing-details"));
const FAQ = lazy(() => import("src/pages/faq"));
const HowItWorks = lazy(() => import("src/pages/how-it-works"));
const AboutUs = lazy(() => import("src/pages/about-us"));
const VideoTutorials = lazy(() => import("src/pages/video-tutorials"));
const PrivacyPolicy = lazy(() => import("src/pages/privacy-policy"));
const TermsConditions = lazy(() => import("src/pages/terms-conditions"));
const CookiePolicy = lazy(() => import("src/pages/cookie-policy"));
const HelpCenter = lazy(() => import("src/pages/help-center"));
const NotFound = lazy(() => import("src/pages/not-found"));
const FeaturesPage = lazy(() => import("src/pages/features"));
const ContactPage = lazy(() => import("src/pages/contact"));
const BlogPage = lazy(() => import("src/pages/blog"));
const BlogArticlePage = lazy(() => import("src/pages/blog-article"));
const AlternativePage = lazy(() => import("src/pages/alternative"));

function Router() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/:lang/pricing" component={PricingDetails} />
        <Route path="/:lang/faq" component={FAQ} />
        <Route path="/:lang/how-it-works" component={HowItWorks} />
        <Route path="/:lang/about-us" component={AboutUs} />
        <Route path="/:lang/video-tutorials" component={VideoTutorials} />
        <Route path="/:lang/features" component={FeaturesPage} />
        <Route path="/:lang/contact" component={ContactPage} />
        <Route path="/:lang/blog" component={BlogPage} />
        <Route path="/:lang/blog/:slug" component={BlogArticlePage} />
        <Route path="/:lang/alternative/:competitor" component={AlternativePage} />
        <Route path="/:lang/privacy-policy" component={PrivacyPolicy} />
        <Route path="/:lang/terms-conditions" component={TermsConditions} />
        <Route path="/:lang/cookie-policy" component={CookiePolicy} />
        <Route path="/:lang/help-center" component={HelpCenter} />
        <Route path="/:lang/?" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const { language } = useLanguage();
  // Analytics tracking effect
  useEffect(() => {
    const projectId = "tdo9gb2tnw";
    Clarity.init(projectId);

    const trackSourceVisit = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        let referrer = urlParams.get("ref"); // Check for 'ref' parameter

        if (referrer) {
          const currentTime = Date.now();
          const lastRequestTime = localStorage.getItem("lastAnalyticsRequest");

          // Check rate limit
          if (
            lastRequestTime &&
            currentTime - parseInt(lastRequestTime) < 3000
          ) {
            console.log("Rate limit: Analytics request skipped (too soon)");
            return;
          }

          // 🔥 KEY FIX: Set timestamp BEFORE making the request
          localStorage.setItem("lastAnalyticsRequest", currentTime.toString());

          try {
            await createAnalyticsLog(referrer, language);
            console.log("Analytics logged successfully");
          } catch (error) {
            // If request fails, reset the timestamp so user can retry
            localStorage.removeItem("lastAnalyticsRequest");
            throw error;
          }
        }
      } catch (error) {
        console.error("Failed to track analytics:", error);
      }
    };

    trackSourceVisit();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Helmet>
            <html lang={language} />
          </Helmet>
          <Router />
          <ScrollToTop />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;