import React from "react";
import { Map, Phone, Mail, Clock, MessageCircle } from "lucide-react";
export default function ContactSection() {
  
  const gmail = "prasunsharma08@gmail.com"
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);

  fetch(`https://formsubmit.co/ajax/${gmail}`, {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(() => {
      alert("Message sent!");
      form.reset();
    })
    .catch(err => {
      alert("Something went wrong.");
      console.error(err);
    });
};
  return (
    <div className="bg-[#0C0A09] items-center">
    <section className="max-w-6xl mx-auto p-6 text-white bg-[#0C0A09] py-36">
      <h2 className="text-3xl font-bree font-bold text-center mb-2">Contact Us</h2>
      <p className="text-center font-inter font-inter text-lg  text-gray-300 mb-10 max-w-xl mx-auto">
        We're here to help with tickets, questions, and making your theater
        experience exceptional
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Contact Form */}
       <form onSubmit={handleSubmit} className="flex-1 bg-[#1a140f] rounded-md p-6">
  <h3 className="font-semibold font-bree text-lg mb-4 flex items-center gap-2">
    <MessageCircle /> Send us a message
  </h3>

  {/* Hidden inputs for FormSubmit */}
  <input type="hidden" name="_captcha" value="false" />
  <input type="hidden" name="_template" value="box" />
  <input type="hidden" name="_autoresponse" value="Thanks for contacting us!" />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="firstName" className="block mb-1 font-inter font-semibold">
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        placeholder="Your first name"
        className="w-full rounded-md bg-[#120d0a] border border-transparent focus:border-[#E7B008] p-2 text-white font-inter"
      />
    </div>
    <div>
      <label htmlFor="lastName" className="block mb-1 font-inter font-semibold">
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Your last name"
        className="w-full rounded-md font-inter bg-[#120d0a] border border-transparent focus:border-[#E7B008] p-2 text-white"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div>
      <label htmlFor="email" className="block mb-1 font-inter font-semibold">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="your.email@example.com"
        className="w-full rounded-md font-inter bg-[#120d0a] border border-transparent focus:border-[#E7B008] p-2 text-white"
      />
    </div>
    <div>
      <label htmlFor="phone" className="block mb-1 font-inter font-semibold">
        Phone (Optional)
      </label>
      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder="(555) 123-4567"
        className="w-full rounded-md font-inter bg-[#120d0a] border border-transparent focus:border-[#E7B008] p-2 text-white"
      />
    </div>
  </div>

  <div className="mb-4">
    <label htmlFor="subject" className="block mb-1 font-inter font-semibold">
      Subject
    </label>
    <select
      id="subject"
      name="subject"
      className="w-full rounded-md font-inter bg-[#120d0a] border border-transparent focus:border-[#E7B008] p-2 text-white"
      defaultValue=""
    >
      <option disabled value="">
        What can we help you with?
      </option>
      <option>Tickets</option>
      <option>Questions</option>
      <option>Technical Support</option>
      <option>Other</option>
    </select>
  </div>

  <div className="mb-6">
    <label htmlFor="message" className="block mb-1 font-inter font-semibold">
      Message
    </label>
    <textarea
      id="message"
      name="message"
      rows={4}
      placeholder="Tell us how we can help..."
      className="w-full rounded-md font-inter bg-[#120d0a] border border-transparent focus:border-[#E7B008] p-2 text-white resize-none"
    ></textarea>
  </div>

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-[#4A0813] to-[#72001f] text-white font-semibold py-3 rounded-md hover:brightness-110 transition"
  >
    Send Message
  </button>
</form>


        {/* Right: Contact Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Info card */}
          <ContactInfoCard
            icon={<Map size="30px" color="black"/>}
            title="Visit Us"
            lines={[
              "123 Theater Street",
              "Downtown Arts District",
              "City, State 12345",
            ]}
          />
          <ContactInfoCard
            icon={<Phone size="30px" color="black"/>}
            title="Box Office"
            lines={[
              "(555) 123-SHOW",
              "Group Sales: (555) 123-4567",
              "Administration: (555) 123-4568",
            ]}
          />
          <ContactInfoCard
            icon={<Mail size="30px" color="black"/>}
            title="Email Us"
            lines={[
              "tickets@royaltheater.com",
              "info@royaltheater.com",
              "groups@royaltheater.com",
            ]}
          />
          <ContactInfoCard
            icon={<Clock size="30px" color="black"/>}
            title="Box Office Hours"
            lines={[
              "Monday - Friday: 10am - 6pm",
              "Saturday: 10am - 4pm",
              "Sunday: 2 hours before shows",
            ]}
          />
        </div>
      </div>
    </section>
    </div>
  );
}

type ContactInfoCardProps = {
  icon: React.ReactNode;
  title: string;
  lines: string[];
};

function ContactInfoCard({ icon, title, lines }: ContactInfoCardProps) {
  return (
    <div className="bg-[#1a140f] rounded-md p-4 flex gap-4 items-start">
      <div className="bg-amber-400 p-3 rounded-sm mb-4">
            {icon}        
      </div>
      <div>
        <h4 className="font-semibold font-bree text-xl mb-1">{title}</h4>
        {lines.map((line, i) => (
          <p key={i} className="text-gray-300 font-inter text-sm leading-snug">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
