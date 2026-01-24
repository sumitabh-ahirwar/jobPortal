import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job<span className="text-[#F83002]">Portal</span></h2>
            <p className="text-sm text-gray-500">
              © 2026 Your Company. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">

            {/* Facebook */}
            <a
              href="https://facebook.com"
              className="text-gray-600 hover:text-gray-800"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-gray-800"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.732 0-4.946 2.215-4.946 4.946 0 .388.045.765.127 1.124C7.728 8.85 4.1 6.884 1.671 3.905a4.932 4.932 0 0 0-.666 2.487c0 1.718.874 3.23 2.2 4.117a4.904 4.904 0 0 1-2.239-.616v.061c0 2.4 1.708 4.4 3.977 4.857a4.93 4.93 0 0 1-2.224.084c.627 1.956 2.444 3.379 4.6 3.42A9.874 9.874 0 0 1 0 19.54 13.94 13.94 0 0 0 7.548 21.75c9.057 0 14.01-7.496 14.01-13.986 0-.21-.004-.423-.014-.634A10.012 10.012 0 0 0 24 4.557z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              className="text-gray-600 hover:text-gray-800"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.85 0-2.132 1.445-2.132 2.939v5.667H9.357V9h3.414v1.561h.047c.477-.9 1.637-1.85 3.37-1.85 3.6 0 4.267 2.368 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.816 20.452H3.858V9h2.958v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
