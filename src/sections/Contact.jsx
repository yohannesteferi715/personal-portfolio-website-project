import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useApi } from "@/hooks/useApi";
import { Skeleton } from "@/components/Skeleton";

export const Contact = () => {
  const { data: profile } = useApi("/api/v1/profile");

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  // Build contact info from live profile data, with sensible fallbacks
  const contactInfo = [
    profile?.email && {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    profile?.phone && {
      icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    profile?.location && {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      href: "#",
    },
  ].filter(Boolean);

  // Show placeholder rows while profile hasn't loaded yet
  const fallbackInfo = [
    { icon: Mail, label: "Email", value: null },
    { icon: Phone, label: "Phone", value: null },
    { icon: MapPin, label: "Location", value: null },
  ];

  const displayInfo = contactInfo.length > 0 ? contactInfo : fallbackInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // Graceful fallback to mailto if EmailJS service keys aren't configured in frontend env
        const recipient = profile?.email || "yohannes.teferi@example.com";
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        setSubmitStatus({
          type: "success",
          message: `Opening your email client to send your message directly to ${recipient}!`,
        });
        setFormData({ name: "", email: "", message: "" });
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmitStatus({
        type: "error",
        message: err.text || err.message || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-8 md:py-12 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 animate-fade-in animation-delay-100 text-secondary-foreground">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {/* Contact form */}
          <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/30 animate-fade-in animation-delay-300">
            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name…"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message…"
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <Button className="w-full" type="submit" size="lg" disabled={isLoading}>
                {isLoading ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact info + availability */}
          <div className="space-y-6 animate-fade-in animation-delay-400">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {displayInfo.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                      item.value ? "hover:bg-surface group" : ""
                    }`}
                    {...(item.value
                      ? { as: "a", href: item.href }
                      : {})}
                  >
                    {item.value ? (
                      <a href={item.href} className="flex items-center gap-4 w-full group">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </a>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass rounded-3xl p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`w-3 h-3 rounded-full animate-pulse ${
                    profile?.available_for_work === false ? "bg-yellow-500" : "bg-green-500"
                  }`}
                />
                <span className="font-medium">
                  {profile?.available_for_work === false
                    ? "Not currently available"
                    : "Currently Available"}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                I'm currently open to new opportunities and exciting projects.
                Whether you need a full-time engineer or a freelance consultant,
                let's talk!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
