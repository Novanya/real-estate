import React from "react";

function Services() {
  const services = [
    {
      title: "Property Listing",
      desc: "Find the perfect property for you.",
    },
    {
      title: "Consulting",
      desc: "Expert advice on real estate investments.",
    },
    {
      title: "Valuation",
      desc: "Know your property value instantly.",
    },
    {
      title: "Legal Support",
      desc: "Guidance on property laws.",
    },
    {
      title: "Maintenance",
      desc: "Keep your property in top shape.",
    },
  ];
  return (
    <div className="w-full min-h-screen bg-gray-200 p-10 text-black text-center">
      <h1 className="font-extrabold text-5xl m-5">Our Services</h1>
      <div>
        <p className="font-serif font-medium">
          Explore our handpicked selection of prime real estate properties
          available for sale — your perfect home or investment awaits!
        </p>
      </div>
      <div className=" flex flex-wrap justify-center m-auto gap-5 md:mt-16">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center gap-5 w-60 m-2 h-64 shadow-xl shadow-black p-6 text-gray-200 bg-gray-600 hover:scale-105 transform transition duration-300`}
          >
            <h3 className="text-2xl font-bold mb-2 text-gray-100">
              {service.title}
            </h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
