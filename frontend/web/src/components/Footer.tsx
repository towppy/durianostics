// Footer.tsx (Web - React + TypeScript)
import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <span className="text-xl font-bold text-gray-900">YourBrand</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              Empowering businesses with innovative solutions. Build better, ship faster, grow smarter.
            </p>
            <div className="flex space-x-4">
              {/* Social Links */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 ..."/>
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 ... " clipRule="evenodd"/>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328 ..."/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="/integrations" className="text-gray-600 hover:text-gray-900 transition-colors">Integrations</a></li>
              <li><a href="/changelog" className="text-gray-600 hover:text-gray-900 transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="/press" className="text-gray-600 hover:text-gray-900 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="/docs" className="text-gray-600 hover:text-gray-900 transition-colors">Documentation</a></li>
              <li><a href="/help" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="/community" className="text-gray-600 hover:text-gray-900 transition-colors">Community</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a></li>
              <li><a href="/security" className="text-gray-600 hover:text-gray-900 transition-colors">Security</a></li>
              <li><a href="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} YourBrand, Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="/sitemap" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Sitemap</a>
            <a href="/accessibility" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Accessibility</a>
            <a href="/status" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
