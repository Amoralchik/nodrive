import mainImage from "../assets/landing/main.png";
import { Header } from "@components/Layout/Header";
import { Footer } from "@components/Layout/Footer";
import { Helmet } from "react-helmet";

export function Landing({}: {}) {
  return (
    <div className="bg-gray-900 h-full font-mono">
      <Helmet>
        <title>
          Introducing a New Web Service for File Storage and Sharing
        </title>
      </Helmet>
      <div
        className="bg-cover bg-center flex col-span-2 min-h-screen flex-col justify-between"
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        <div className="bg-white">
          <div className="container mx-auto">
            <Header />
          </div>
        </div>
        <h1 className="self-center backdrop-blur-md backdrop-opacity-50 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
          Introducing a New Web Service for File Storage and Sharing
        </h1>
        <Footer />
      </div>
    </div>
  );
}
