import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "src/components/ui/toaster";
import { TooltipProvider } from "src/components/ui/tooltip";
import { ThemeProvider } from "src/components/layout/theme-provider";
import { ScrollToTop } from "src/components/ui/scroll-to-top";
import { useLanguage } from "src/context/LanguageContext";
import Home from "src/pages/home";
import PricingDetails from "src/pages/pricing-details";
import FAQ from "src/pages/faq";
import HowItWorks from "src/pages/how-it-works";
import AboutUs from "src/pages/about-us";
import VideoTutorials from "src/pages/video-tutorials";
import PrivacyPolicy from "src/pages/privacy-policy";
import TermsConditions from "src/pages/terms-conditions";
import CookiePolicy from "src/pages/cookie-policy";
import HelpCenter from "src/pages/help-center";
import NotFound from "src/pages/not-found";
import FeaturesPage from "src/pages/features";
import ContactPage from "src/pages/contact";
import BlogPage from "src/pages/blog";
import BlogArticlePage from "src/pages/blog-article";
import AlternativePage from "src/pages/alternative";
import { useEffect } from "react";
import { createAnalyticsLog } from "./api/api";
import Clarity from "@microsoft/clarity";
import { Helmet } from "react-helmet-async";

function Router() {
  return (
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