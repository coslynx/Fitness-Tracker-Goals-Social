"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Fitness Tracker. All rights reserved.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;