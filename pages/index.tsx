import { Inter } from "next/font/google";
import Above from "./components/Above.js";
import ObjectDetection from "./components/ObjectDetection.js"
import WebCam from "./components/WebCam.js"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen sm:pt-20 bg-black ">
      <Above />
      <ObjectDetection />
      <WebCam />
    </div>
  );
}
