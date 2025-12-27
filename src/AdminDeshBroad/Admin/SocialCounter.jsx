import {
  Facebook,
  Twitter,
  Linkedin,
  ChevronUp,
  Plus,
} from "lucide-react";

const SocialCounter = () => {
  const socials = [
    {
      id: 1,
      title: "Like us on facebook",
      count: "30,000",
      bg: "bg-[#5b6ea6]",
      icon: <Facebook size={26} />,
    },
    {
      id: 2,
      title: "Follow us on twitter",
      count: "1,11,000",
      bg: "bg-[#4aa3f0]",
      icon: <Twitter size={26} />,
    },
    {
      id: 3,
      title: "Follow us on googleplus",
      count: "19,000",
      bg: "bg-[#ff1a1a]",
      icon: (
        <div className="flex items-center gap-1 font-bold">
          G <Plus size={18} />
        </div>
      ),
    },
    {
      id: 4,
      title: "Follow us on linkedin",
      count: "45,000",
      bg: "bg-[#1665c1]",
      icon: <Linkedin size={26} />,
    },
  ];

  return (
    <>
      {/* Social Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {socials.map((item) => (
          <div
            key={item.id}
            className={`${item.bg} text-white rounded-md p-8 text-center`}
          >
            <div className="flex items-center justify-center gap-2 text-lg font-medium">
              {item.icon}
              <span>{item.title}</span>
            </div>

            <h2 className="text-3xl font-semibold mt-4">
              {item.count}
            </h2>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t py-6 px-4 text-gray-600">
        © Copyrights <b>akkhor</b> 2019. All rights reserved. Designed by{" "}
        <b>PsdBosS</b>
      </footer>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#0d2b4f] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        <ChevronUp />
      </button>
    </>
  );
};

export default SocialCounter;
