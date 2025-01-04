import React from 'react';
import { Inter } from 'next/font/google';
import { Lusitana } from 'next/font/google';

const lusitana = Lusitana({ subsets: ['latin'], weight: ['400'] });
function TextBox() {
    return (
      <div className="flex justify-center items-center h-full">
        <p className={`text-3xl text-center ${lusitana.className} font-normal`}>CVWO Forum</p>
      </div>
    );
  }
export default TextBox;