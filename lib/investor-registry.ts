import kedia from "../data/ace-investors.json";
import kacholia from "../data/ashish-kacholia.json";
import mukul from "../data/mukul-agrawal.json";
import malabar from "../data/malabar-investments.json";
import nalanda from "../data/nalanda-capital.json";
import abakkus from "../data/abakkus.json";
import goel from "../data/anil-kumar-goel.json";
import dolly from "../data/dolly-khanna.json";
import porinju from "../data/porinju-veliyath.json";
import dhawan from "../data/ashish-dhawan.json";
import nemish from "../data/nemish-shah.json";
import pabrai from "../data/mohnish-pabrai.json";
import philosophies from "../data/investor-philosophies.json";
import type {InvestorPortfolio} from "./ace-investor-view";

export const investorProfiles=[
 {id:"kedia",name:"Vijay Kedia",initials:"VK",description:"Direct holdings & Kedia Securities",portfolio:kedia as InvestorPortfolio},
 {id:"kacholia",name:"Ashish Kacholia",initials:"AK",description:"Personal holdings · Other holders shown separately",portfolio:kacholia as InvestorPortfolio},
 {id:"mukul",name:"Mukul Agrawal",initials:"MA",description:"Personal disclosed holdings",portfolio:mukul as InvestorPortfolio},
 {id:"malabar",name:"Malabar Investments",initials:"MI",description:"Sumeet Nagar · Disclosed fund holdings",portfolio:malabar as InvestorPortfolio},
 {id:"nalanda",name:"Nalanda Capital",initials:"NC",description:"Pulak Prasad · Disclosed fund holdings",portfolio:nalanda as InvestorPortfolio},
 {id:"abakkus",name:"Abakkus",initials:"AB",description:"Sunil Singhania · Disclosed investment vehicles",portfolio:abakkus as InvestorPortfolio},
 {id:"goel",name:"Anil Kumar Goel",initials:"AG",description:"Personal disclosed holdings",portfolio:goel as InvestorPortfolio},
 {id:"dolly",name:"Dolly Khanna",initials:"DK",description:"Rajiv Khanna manages · Dolly’s disclosed holdings",portfolio:dolly as InvestorPortfolio},
 {id:"porinju",name:"Porinju Veliyath",initials:"PV",description:"Personal holdings · PMS positions excluded",portfolio:porinju as InvestorPortfolio},
 {id:"dhawan",name:"Ashish Dhawan",initials:"AD",description:"Personal holdings · ChrysCapital positions excluded",portfolio:dhawan as InvestorPortfolio},
 {id:"nemish",name:"Nemish S. Shah",initials:"NS",description:"Individual disclosures · Family and HUF separated",portfolio:nemish as InvestorPortfolio},
 {id:"pabrai",name:"Mohnish Pabrai",initials:"MP",description:"Pabrai Wagons ETF · Indian-listed investments",portfolio:pabrai as InvestorPortfolio}
];
