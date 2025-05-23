import React from "react";
import { FaArrowRight } from "react-icons/fa";
// import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({position,  heading,  subheading,  ctabtn1,  ctabtn2,  codeblock,  backgroundGradient,  codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 lg:gap-10`}>
     
            {/* Left Section */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                
                {/* Heading */}
                {heading}
                
                {/* Sub Heading */}
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subheading}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-7 mt-7">
            
                        <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                            <div className="flex gap-2 items-center">
                                {ctabtn1.textbtn}
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                

                
                        <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                            {ctabtn2.textbtn}
                        </CTAButton>
                </div>
            </div>

            {/* Right Section - Code Block */}

             <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                 {/* HW :- BG gradient */}
                 {backgroundGradient}

                 <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold select-none">
                     <p>1</p>
                     <p>2</p>
                     <p>3</p>
                     <p>4</p>
                     <p>5</p>
                     <p>6</p>
                     <p>7</p>
                     <p>8</p>
                     <p>9</p>
                     <p>10</p>
                     <p>11</p>
                 </div>

                 <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} text-yellow-5 pr-1`}>
                      <TypeAnimation 
                      
                           sequence={[codeblock, 2000, ""]}
                           repeat={Infinity}
                            cursor={true}
                            // omitDeletionAnimation={true}
                            style={
                                {
                                    whiteSpace:"pre-line",
                                   display:"block",
                                }
                            }
                            omitDeletionAnimation={true}
                      />
                 </div>
            </div>  

    </div>
  );
};

export default CodeBlocks;
