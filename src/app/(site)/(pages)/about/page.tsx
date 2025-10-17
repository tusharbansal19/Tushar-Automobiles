'use client';

import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 bg-gray-2">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Learn more about our team and mission to provide the best automotive solutions
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Side - Team Information */}
                    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 lg:mb-8 text-center">Our Team</h2>

                        <div className="space-y-6 lg:space-y-8">
                            {/* Owner */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format"
                                            alt="Umesh Kumar"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                const sibling = target.nextElementSibling as HTMLElement;
                                                target.style.display = 'none';
                                                if (sibling) sibling.style.display = 'flex';
                                            }}
                                        />
                                        <span className="text-white font-bold text-lg lg:text-xl hidden">UK</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg lg:text-xl font-semibold text-gray-800">Shri Umesh Kumar</h3>
                                        <p className="text-blue-600 font-medium mb-2">Owner & Founder</p>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Visionary leader with exceptional business mindset and hard working nature.
                                        </p>

                                        {/* Personality Traits */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">Hard Working</span>
                                            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">Business Mindset</span>
                                            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">Customer Influencer</span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                30+ years of automotive industry experience
                                            </div>
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                Expert in business development & customer relations
                                            </div>
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                Established 1000+ successful partnerships
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Lead */}
                            <div className="border-b border-gray-200 pb-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format"
                                            alt="Tushar Bansal"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                const sibling = target.nextElementSibling as HTMLElement;
                                                target.style.display = 'none';
                                                if (sibling) sibling.style.display = 'flex';
                                            }}
                                        />
                                        <span className="text-white font-bold text-lg lg:text-xl hidden">TB</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg lg:text-xl font-semibold text-gray-800">Tushar Bansal</h3>
                                        <p className="text-green-600 font-medium mb-2">Tech Lead & Innovation Head</p>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Innovative tech leader with customer influencer skills and dedicated work ethic.
                                        </p>

                                        {/* Personality Traits */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">Customer Influencer</span>
                                            <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs">Hard Working</span>
                                            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs">Tech Innovator</span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                2+ years in software development & system design
                                            </div>
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                Specialized in automotive diagnostic systems
                                            </div>
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                Led 50+ successful digital transformation projects
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Lead */}
                            <div>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face&auto=format"
                                            alt="Dev Bansal"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                const sibling = target.nextElementSibling as HTMLElement;
                                                target.style.display = 'none';
                                                if (sibling) sibling.style.display = 'flex';
                                            }}
                                        />
                                        <span className="text-white font-bold text-lg lg:text-xl hidden">DB</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg lg:text-xl font-semibold text-gray-800">Dev Bansal</h3>
                                        <p className="text-purple-600 font-medium mb-2">Business Lead & Strategy Director</p>
                                        <p className="text-gray-600 text-sm mb-3">
                                            Strategic business leader with strong business mindset and customer influence expertise.
                                        </p>

                                        {/* Personality Traits */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs">Business Mindset</span>
                                            <span className="bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs">Hard Working</span>
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">Customer Influencer</span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                                2+ years in business development & operations
                                            </div>
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                                Expert in market analysis & customer engagement
                                            </div>
                                            <div className="flex items-center text-sm text-gray-700">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                                                Achieved 300% business growth in last 5 years
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6 lg:space-y-8">
                        {/* Our Mission */}
                        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-6">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We are committed to revolutionizing the automotive industry by providing
                                cutting-edge solutions that enhance the driving experience. Our mission is
                                to deliver exceptional quality products and services that exceed customer
                                expectations.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Through innovation, dedication, and a customer-first approach, we strive
                                to be the leading provider of automotive solutions in the market.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-6">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Innovation</span>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Quality</span>
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Customer Focus</span>
                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Excellence</span>
                            </div>
                        </div>

                        {/* Our Shop Image */}
                        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">Our Shop</h2>
                            <div className="relative h-48 sm:h-56 lg:h-64 w-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center px-4">
                                        <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 lg:mb-4">🏪</div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Our Modern Shop</h3>
                                        <p className="text-gray-500 mt-1 lg:mt-2 text-sm sm:text-base">State-of-the-art Automotive Center</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-600">📍 Location</span>
                                            <span className="text-gray-600">🕒 Open 24/7</span>
                                            <span className="text-gray-600">🚗 Full Service</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mt-4">
                                Visit our modern facility equipped with state-of-the-art technology
                                and a welcoming environment for all your automotive needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-8 lg:mt-12 bg-white rounded-lg shadow-lg p-6 lg:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-center">
                        <div className="p-4">
                            <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">30+</div>
                            <p className="text-gray-600 text-sm lg:text-base">Years of Experience</p>
                        </div>
                        <div className="p-4">
                            <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">1500+</div>
                            <p className="text-gray-600 text-sm lg:text-base">Happy Customers</p>
                        </div>
                        <div className="p-4">
                            <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">24/7</div>
                            <p className="text-gray-600 text-sm lg:text-base">Customer Support</p>
                        </div>
                    </div>
                </div>

                {/* Location Map Section */}
                <div className="mt-8 lg:mt-12 bg-white rounded-lg shadow-lg p-6 lg:p-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">Find Us on Map</h2>
                    <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
                        Located in the heart of Siyana, Bulandshahr, we are easily accessible and ready to serve all your automotive needs.
                    </p>

                    {/* Map Container */}
                    <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-md">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d873.9!2d78.0547183!3d28.6240976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390b6529b8b665c9%3A0x62e65ac685562995!2sTushar%20Automobiles%20and%20Shares%20Parts!5e0!3m2!1sen!2sin!4v1697123456789"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Tushar Automobiles and Shares Parts Location"
                        ></iframe>

                        {/* Map Overlay with Business Info */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Tushar Automobiles and Shares Parts</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                📍 Bulandshahr Stand, Siyana<br />
                                BSR, UP, India
                            </p>
                            <div className="flex items-center space-x-2 text-sm">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-green-700 font-medium">Open Now</span>
                            </div>
                        </div>

                        {/* Directions Button */}
                        <div className="absolute bottom-4 right-4">
                            <a
                                href="https://www.google.com/maps/place/Tushar+Automobiles+and+Shares+Parts/@28.6240976,78.0547183,20z/data=!4m6!3m5!1s0x390b6529b8b665c9:0x62e65ac685562995!8m2!3d28.6240976!4d78.0547183!16s%2Fg%2F11x18fgmfw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg"
                            >
                                Get Directions
                            </a>
                        </div>
                    </div>

                    {/* Quick Location Info */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-blue-600 text-lg mb-1">🚗</div>
                            <p className="text-sm font-medium text-gray-800">Easy Parking</p>
                            <p className="text-xs text-gray-600">Ample space available</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-green-600 text-lg mb-1">🛣️</div>
                            <p className="text-sm font-medium text-gray-800">Main Road Access</p>
                            <p className="text-xs text-gray-600">On Bulandshahr Stand</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-purple-600 text-lg mb-1">🚌</div>
                            <p className="text-sm font-medium text-gray-800">Public Transport</p>
                            <p className="text-xs text-gray-600">Bus stand nearby</p>
                        </div>
                    </div>
                </div>

                {/* Our Story & Location Section */}
                <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Our Story */}
                    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                        <div className="space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                                Founded in 1994 by Shri Umesh Kumar, our automotive center began as a small family business
                                with a vision to provide reliable and affordable automotive solutions to our community.
                                What started as a modest workshop has grown into one of the region's most trusted automotive
                                service centers.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Over the past three decades, we have continuously evolved, embracing new technologies and
                                expanding our services to meet the changing needs of modern vehicles. Our commitment to
                                excellence and customer satisfaction has earned us the trust of thousands of customers
                                across the region.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Today, we combine traditional automotive expertise with cutting-edge diagnostic equipment
                                and digital solutions, ensuring that every customer receives the highest quality service
                                for their vehicle, whether it's a classic car or the latest model.
                            </p>
                        </div>
                    </div>

                    {/* Location & Contact */}
                    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Visit Our Location</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-blue-600 text-sm">📍</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Tushar Automobiles And Spare Parts</h3>
                                    <p className="text-gray-600 text-sm">
                                        Bulandshahr Stand, Siyana<br />
                                        BSR, UP, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-green-600 text-sm">🕒</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Operating Hours</h3>
                                    <p className="text-gray-600 text-sm">
                                        Monday - Saturday: 8:00 AM - 8:00 PM<br />
                                        Sunday: 9:00 AM - 6:00 PM<br />
                                        Emergency Service: 24/7
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-purple-600 text-sm">📞</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Contact Information</h3>
                                    <p className="text-gray-600 text-sm">
                                        Phone: +91 9719167530<br />
                                        Email: tusharbansal3366@gmail.com<br />
                                        WhatsApp: +91 9719167530
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Automobile Store Gallery */}
                <div className="mt-8 lg:mt-12 bg-white rounded-lg shadow-lg p-6 lg:p-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">Our Automobile Store Gallery</h2>
                    <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                        Explore our comprehensive automotive facility featuring different departments,
                        specialized service areas, and our extensive inventory of parts and accessories.
                    </p>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Service Bay */}
                        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-100 to-blue-200">
                                <img
                                    src="https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop&auto=format"
                                    alt="Service Bay"
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23dbeafe'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%233b82f6'%3EService Bay%3C/text%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="font-semibold text-lg">Professional Service Bay</h3>
                                    <p className="text-sm opacity-90">State-of-the-art equipment for all repairs</p>
                                </div>
                            </div>
                        </div>

                        {/* Parts Inventory */}
                        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-green-100 to-green-200">
                                <img
                                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&auto=format"
                                    alt="Parts Inventory"
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23dcfce7'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%2316a34a'%3EParts Inventory%3C/text%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="font-semibold text-lg">Extensive Parts Inventory</h3>
                                    <p className="text-sm opacity-90">Genuine parts for all vehicle makes</p>
                                </div>
                            </div>
                        </div>

                        {/* Diagnostic Center */}
                        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-purple-100 to-purple-200">
                                <img
                                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop&auto=format"
                                    alt="Diagnostic Center"
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23e9d5ff'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%237c3aed'%3EDiagnostic Center%3C/text%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="font-semibold text-lg">Advanced Diagnostic Center</h3>
                                    <p className="text-sm opacity-90">Computer diagnostics & analysis</p>
                                </div>
                            </div>
                        </div>

                        {/* Customer Lounge */}
                        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-orange-100 to-orange-200">
                                <img
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&auto=format"
                                    alt="Customer Lounge"
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23fed7aa'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%23ea580c'%3ECustomer Lounge%3C/text%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="font-semibold text-lg">Comfortable Customer Lounge</h3>
                                    <p className="text-sm opacity-90">Relax while we service your vehicle</p>
                                </div>
                            </div>
                        </div>

                        {/* Tire & Wheel Center */}
                        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-red-100 to-red-200">
                                <img
                                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&auto=format"
                                    alt="Tire Center"
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23fecaca'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%23dc2626'%3ETire Center%3C/text%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="font-semibold text-lg">Tire & Wheel Center</h3>
                                    <p className="text-sm opacity-90">Complete tire services & installation</p>
                                </div>
                            </div>
                        </div>

                        {/* Oil Change Station */}
                        <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-indigo-100 to-indigo-200">
                                <img
                                    src="https://images.unsplash.com/photo-1632823471565-1ecdf7c5e3e5?w=400&h=300&fit=crop&auto=format"
                                    alt="Oil Change Station"
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        const target = e.currentTarget as HTMLImageElement;
                                        target.src = "data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23c7d2fe'/%3E%3Ctext x='50%25' y='50%25' font-size='16' text-anchor='middle' dy='.3em' fill='%234338ca'%3EOil Change%3C/text%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="font-semibold text-lg">Quick Oil Change Station</h3>
                                    <p className="text-sm opacity-90">Fast & efficient oil change service</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Overview */}
                <div className="mt-8 lg:mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg p-6 lg:p-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center">Comprehensive Automotive Services</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-3xl mb-3">🔧</div>
                            <h3 className="font-semibold text-gray-800 mb-2">General Repairs</h3>
                            <p className="text-sm text-gray-600">Complete mechanical repairs for all vehicle types</p>
                        </div>

                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-3xl mb-3">🛞</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Tire Services</h3>
                            <p className="text-sm text-gray-600">Installation, balancing, and alignment services</p>
                        </div>

                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-3xl mb-3">🔋</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Electrical Work</h3>
                            <p className="text-sm text-gray-600">Battery, alternator, and electrical system repairs</p>
                        </div>

                        <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="text-3xl mb-3">🛡️</div>
                            <h3 className="font-semibold text-gray-800 mb-2">Brake Services</h3>
                            <p className="text-sm text-gray-600">Complete brake system inspection and repair</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;