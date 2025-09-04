"use client";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Pre-footer: Ready to Hire */}
        <div className="text-center mb-12 py-8">
          <p className="font-content text-green-400 text-sm font-bold tracking-widest" style={{ fontFamily: 'var(--font-agdasima)' }}>READY TO HIRE</p>
          <h2 className="font-content font-bold text-4xl lg:text-6xl mt-4 mb-6" style={{ fontFamily: 'var(--font-agdasima)' }}>
            Enough talk. Let's make <br />
            something great together.
          </h2>
          <a
            href="mailto:sl177y.log0@gmail.com"
            className="font-content inline-block border border-gray-600 rounded-full px-8 py-3 text-lg text-white hover:bg-green-500 hover:border-green-500 hover:text-black transition-all duration-300"
            style={{ fontFamily: 'var(--font-agdasima)' }}
          >
            SL177Y.LOG0@GMAIL.COM
          </a>
        </div>

        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 gap-8 items-center border-t border-gray-800 pt-8">
          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-gray-400" style={{ fontFamily: 'var(--font-agdasima)' }}>
              © {new Date().getFullYear()} SL177Y. All Rights Reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            <a href="https://github.com/SL177Y-0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sl177y" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://x.com/SL177Y0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
          </div>

          {/* Footer Nav */}
          <div className="flex justify-center lg:justify-end gap-x-8">
            <a href="#hero" className="text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-agdasima)' }}>
              Home
            </a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-agdasima)' }}>
              Projects
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-agdasima)' }}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
