import React from 'react';
import { Lusitana } from 'next/font/google';

const lusitana = Lusitana({ subsets: ['latin'], weight: ['400'] });
//  This is the text box that displays the name of the forum.
function TextBox() {
    return (
      <div className="flex justify-center items-center h-full">
        <p className={`text-3xl text-center ${lusitana.className} font-normal`}>CVWO Forum</p>
      </div>
    );
  }
export default TextBox;