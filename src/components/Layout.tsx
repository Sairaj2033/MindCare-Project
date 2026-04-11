import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AssessmentPrompt from "./AssessmentPrompt";
import DoctorRecommendation from "./DoctorRecommendation";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col gradient-soft">
    <Navbar />
    <main className="flex-1 pt-16">{children}</main>
    <Footer />
    <AssessmentPrompt />
    <DoctorRecommendation />
  </div>
);

export default Layout;
