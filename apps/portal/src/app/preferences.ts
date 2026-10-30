import {createContext,useContext} from 'react';
import {normaliseCountry} from '../features/reference/countrySearch';

// Viewer preferences chosen in the header. The country filters the Standards & Reference Library; only English
// content exists today, so language is shown but cannot change yet.
const COUNTRY_KEY='fern-country';
export function readPreferredCountry(){try{return normaliseCountry(localStorage.getItem(COUNTRY_KEY)??'');}catch{return '';}}
export function writePreferredCountry(country:string){try{if(country)localStorage.setItem(COUNTRY_KEY,country);else localStorage.removeItem(COUNTRY_KEY);}catch{/* Storage blocked: the choice lasts for this page only. */}}
export const PortalPreferences=createContext<{country:string;setCountry:(country:string)=>void}>({country:'',setCountry:()=>{}});
export const usePortalPreferences=()=>useContext(PortalPreferences);
