import { Calendar, Users, Award, Heart, Star, Landmark } from "lucide-react";
import background from "../assets/curtins.jpg";
import Stats from "../components/stats";


const values = [
  {
    icon: <Heart size={24} className="text-yellow-400" />,
    title: "Passion for Performance",
    description: "We believe in the transformative power of live theater to move, inspire, and connect communities.",
  },
  {
    icon: <Users size={24} className="text-yellow-400" />,
    title: "Inclusive Community",
    description: "We welcome everyone and strive to reflect the diversity of our community on and off stage.",
  },
  {
    icon: <Star size={24} className="text-yellow-400" />,
    title: "Artistic Excellence",
    description: "We are committed to producing the highest quality performances with world-class talent.",
  },
  {
    icon: <Landmark size={24} className="text-yellow-400" />,
    title: "Cultural Heritage",
    description: "We preserve and celebrate the rich tradition of live theater while embracing innovation.",
  },
];

export default function About() {
  return (
    <div className="bg-[#0C0A09] text-white font-inter">
      {/* Hero */}
      <div
        className="bg-cover bg-center flex flex-col justify-center items-center text-center h-[30vh]"
        style={{ backgroundImage: `url(${background})` }}
      >
        <h1 className="text-5xl font-bold font-bree text-white drop-shadow-lg">Our Story</h1>
        <p className="text-lg mt-4 text-gray-300 max-w-xl mx-auto">
          A century of bringing exceptional theater to our community
        </p>
      </div>

      {/* Welcome Section */}
      <section className="max-w-4xl mx-auto text-center py-16 px-4">
        <h2 className="text-3xl font-bold font-bree mb-4">Welcome to Royal Theater</h2>
        <p className="text-xl text-gray-300 mb-6">
Since 1924, Royal Theater has been the cultural heart of our city, blending historic charm with modern technology to create an exceptional theatrical experience. Through the Great Depression, world wars, and social change, we’ve remained dedicated to artistic excellence. Our stage has hosted legendary performances, launched many acting careers, and served as a vibrant community gathering place. Today, we continue this tradition with a diverse lineup from beloved Broadway classics to contemporary works and world premieres that reflects the richness of our modern world.
        </p>
      </section>

      {/* Stats */}
      <Stats />

      {/* Values */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center font-bree mb-4">Our Values</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">
          The principles that guide everything we do, from selecting productions to serving our community
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-[#181310] p-5 border border-[#312621] rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <div>{value.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
