export const appData = {
    "companyInfo": {
        "name": "Mahaveer Marble Suppliers and Shree Mahaveer Stonex",
        "establishedYear": "1988",
        "yearsOfExperience": "35+",
        "customersServed": "10000+"
    },
    "contactInfo": {
        "primary": {
            "phone": "+91 7726964229",
            "whatsapp": "+91 7014580511",
            "email": "mahaveermarblesuppliers@gmail.com",
            "workingHours": "Mon-Sat: 9:00 AM - 7:00 PM"
        },
        "location": {
            "address": "Shop No. 123, Stone Market, Industrial Area",
            "city": "Kishangarh",
            "state": "Rajasthan",
            "pincode": "305801",
            "country": "India"
        },
        "maps": {
            "coordinates": {
                "latitude": "26.60406177683245", 
                "longitude": "74.84887087514004" 
            }
        },
        "socialMedia": {
            "facebook": "https://www.facebook.com/profile.php?id=100081515561625",
            "instagram": "https://www.instagram.com/mahaveermarblesuppliers",
            "whatsapp": "https://wa.me/917014580511",
            "twitter": "#"
        }
    },
    "services": [
        {
            "title": "Quality",
            "icon": "Gem", // Lucide icon name
            "description": "Providing best premium quality marble and granite."
        },
        {
            "title": "Price",
            "icon": "DollarSign", // Lucide icon name
            "description": "Affordable and best price in the market."
        },
        {
            "title": "Trust",
            "icon": "Search", // Lucide icon name
            "description": "Trustworthy Supplier for 10000+ customers."
        },
        {
            "title": "Expertise",
            "icon": "Settings", // Lucide icon name
            "description": "Expert Knowledge in stones field with 35 years+ field experience."
        }
    ],
    "sliderContent": [
        {
            "id": 1,
            "image": "images/marble1.png", // This will be overridden by placeholder in component
            "title": "INHERIT THE ELEGANCE",
            "buttonText": "Explore Products",
            "ctaLink": "/stone-types", // Link for CTA button
            "aiHint": "marble elegance" // AI hint for image generation
        },
        {
            "id": 2,
            "image": "images/MARBLE2.jpg",
            "title": "THE WHISPERS OF SOPHISTICATION",
            "buttonText": "Explore Products",
            "ctaLink": "/stone-types",
            "aiHint": "marble sophistication"
        },
        {
            "id": 3,
            "image": "images/marble3.webp",
            "title": "CREATING WINSOME VISIONS",
            "buttonText": "Explore Products",
            "ctaLink": "/stone-types",
            "aiHint": "stone vision"
        }
    ],
    "productCategories": [
        {
            "name": "Marble",
            "description": "Premium quality marble with distinctive patterns. Known for its luxurious veining and timeless appeal, marble adds a touch of elegance to any space.",
            "types": ["White Marble", "Italian Marble", "Indian Marble"],
            "imageSrc": "/images/marble_type.jpg",
            "aiHint": "marble collection"
        },
        {
            "name": "Granite",
            "description": "Durable and beautiful granite varieties. Celebrated for its durability and wide range of colors and patterns, granite is a popular choice for kitchen countertops and high-traffic areas.",
            "types": ["Black Granite", "Colored Granite", "Patterned Granite"],
            "imageSrc": "/images/granite_type.jpg",
            "aiHint": "granite selection"
        }
    ],
    // Products array is removed from here, will be managed via localStorage
    "aboutContent": {
        "mainHeading": "About Mahaveer Marble Suppliers",
        "introduction": "With over three decades of experience in the stone industry, Mahaveer Marble Suppliers has established itself as a leading provider of premium quality marble and granite.",
        "history": {
            "title": "Our Journey",
            "content": "Established in 1988, we've grown from a small local supplier to one of the most trusted names in the stone industry."
        },
        "mission": {
            "title": "Our Mission",
            "content": "To provide the highest quality stone products while maintaining excellent customer service and competitive pricing."
        },
        "vision": {
            "title": "Our Vision",
            "content": "To be the most trusted and preferred supplier of marble and granite products in India."
        },
        "achievements": [
            {
                "year": "1988",
                "title": "Company Establishment"
            },
            {
                "year": "1995",
                "title": "Expansion of Product Range"
            },
            {
                "year": "2005",
                "title": "10,000th Customer Milestone"
            },
            {
                "year": "2023",
                "title": "Digital Transformation"
            }
        ]
    },
    "features": [ // Assuming 'features' might be used elsewhere, mapping icons to Lucide
        {
            "title": "Premium Quality",
            "description": "All our products undergo strict quality control",
            "icon": "Gem" // Lucide: Gem
        },
        {
            "title": "Expert Consultation",
            "description": "Professional guidance for product selection",
            "icon": "MessageSquare" // Lucide: MessageSquare (fa-comments)
        },
        {
            "title": "Nationwide Delivery",
            "description": "Safe and timely delivery across India",
            "icon": "Truck" // Lucide: Truck
        },
        {
            "title": "Customer Support",
            "description": "24/7 customer service availability",
            "icon": "Headset" // Lucide: Headset
        }
    ],
    "testimonials": [
        {
            "name": "Rajesh Kumar",
            "position": "Property Developer",
            "comment": "Excellent quality marble and professional service.",
            "rating": 5
        },
        {
            "name": "Amit Sharma",
            "position": "Interior Designer",
            "comment": "Best supplier for premium stone products.",
            "rating": 5
        }
    ]
};
