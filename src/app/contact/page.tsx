
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent } from "react";
import { appData } from '@/lib/appData';

export default function ContactPage() {
  const { toast } = useToast();
  const { contactInfo } = appData;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    
    toast({
      title: "Message Sent!",
      description: `Thank you, ${name}. We've received your message and will be in touch soon.`,
      // variant: "default" // Toast already defaults to 'default'
    });
    event.currentTarget.reset();
  };

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.386300542197!2d74.84887087514004!3d26.60406177683245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396bf113f6878663%3A0x535df32be8a9e5c7!2sMahaveer%20Marble%20Suppliers%20%26%20Shree%20Mahaveer%20Stonex!5e0!3m2!1sen!2sin!4v1689048842058!5m2!1sen!2sin`;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-headline font-bold mb-12 text-center">Get In Touch</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4 text-foreground">Contact Information</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>
                  {contactInfo.location.address}, <br />
                  {contactInfo.location.city}, {contactInfo.location.state} - {contactInfo.location.pincode}, <br />
                  {contactInfo.location.country}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                {contactInfo.primary.phone} (Call) / {contactInfo.primary.whatsapp} (WhatsApp)
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                {contactInfo.primary.email}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4 text-foreground">Visit Our Showroom</h2>
            <p className="text-muted-foreground mb-2">
              Experience the beauty of our stone collections firsthand. Our experts are available to guide you.
            </p>
            <p className="text-muted-foreground font-medium">Working Hours:</p>
            <p className="text-muted-foreground">{contactInfo.primary.workingHours}</p>
          </div>
           <div className="rounded-lg overflow-hidden shadow-md border border-border" data-ai-hint="map kishangarh location">
             <iframe
                src={mapSrc}
                width="100%"
                height="250px"
                style={{ border:0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to ${appData.companyInfo.name} in ${contactInfo.location.city}`}
              ></iframe>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-headline font-semibold mb-6 text-foreground">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <Input type="text" id="name" name="name" required className="mt-1 bg-card" />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input type="email" id="email" name="email" required className="mt-1 bg-card" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-foreground">Phone Number (Optional)</Label>
              <Input type="tel" id="phone" name="phone" className="mt-1 bg-card" />
            </div>
            <div>
              <Label htmlFor="subject" className="text-foreground">Subject</Label>
              <Input type="text" id="subject" name="subject" required className="mt-1 bg-card" />
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground">Message</Label>
              <Textarea id="message" name="message" rows={5} required className="mt-1 bg-card" />
            </div>
            <div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
