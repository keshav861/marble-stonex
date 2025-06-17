
import Image from 'next/image';
import { appData } from '@/lib/appData';

export default function AboutPage() {
  const { companyInfo, aboutContent, contactInfo } = appData;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-headline font-bold mb-8 text-center">{aboutContent.mainHeading}</h1>
        
        <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-xl mb-12">
          <Image 
            src="/images/logo_bigger.jpg" 
            alt="Stone Elegance Showroom" 
            data-ai-hint="showroom interior design"
            fill
            style={{objectFit: "cover"}}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-4xl font-headline text-white text-center drop-shadow-md">Crafting Beauty from Nature's Art</h2>
          </div>
        </div>

        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            {aboutContent.introduction} Welcome to Stone Elegance, where the timeless beauty of natural stone meets unparalleled craftsmanship. 
            Established in {companyInfo.establishedYear}, we have been a leading supplier of premium marble and granite for over {companyInfo.yearsOfExperience} years, transforming spaces with nature's most exquisite materials. 
            Our journey began with a simple passion: to bring the earth's artistry into homes and businesses, creating environments that inspire and endure.
          </p>
          
          <h3 className="text-2xl font-headline font-semibold mt-8 mb-2 text-foreground">{aboutContent.history.title}</h3>
          <p>{aboutContent.history.content}</p>

          <h3 className="text-2xl font-headline font-semibold mt-8 mb-2 text-foreground">{aboutContent.mission.title}</h3>
          <p>{aboutContent.mission.content}</p>

          <h3 className="text-2xl font-headline font-semibold mt-8 mb-2 text-foreground">{aboutContent.vision.title}</h3>
          <p>{aboutContent.vision.content}</p>
          
          <p>
            At Stone Elegance (representing {companyInfo.name}), we believe that every project is unique. Whether you're envisioning a stunning kitchen countertop, a luxurious bathroom vanity, or an impressive commercial facade, we are dedicated to providing personalized service and exceptional results. Our state-of-the-art fabrication facility allows us to achieve precision and artistry in every cut and finish.
          </p>
          <p>
            With over {companyInfo.customersServed} satisfied customers, our reputation is a testament to our commitment. We are proud to have played a part in creating countless beautiful spaces, and we look forward to helping you realize your vision with the enduring elegance of natural stone.
          </p>
        </div>

        {aboutContent.achievements && aboutContent.achievements.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-headline font-semibold mb-4 text-center text-foreground">Our Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutContent.achievements.map(achievement => (
                <div key={achievement.year} className="p-4 border rounded-lg shadow-sm bg-card">
                  <p className="font-bold text-primary">{achievement.year}</p>
                  <p className="text-card-foreground">{achievement.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-headline font-semibold mb-4 text-foreground">Visit Our Showroom</h3>
          <p className="text-muted-foreground mb-1">{contactInfo.location.address}, {contactInfo.location.city}</p>
          <p className="text-muted-foreground mb-2">{contactInfo.location.state} - {contactInfo.location.pincode}, {contactInfo.location.country}</p>
          <p className="text-muted-foreground">{contactInfo.primary.workingHours}</p>
        </div>
      </div>
    </div>
  );
}
