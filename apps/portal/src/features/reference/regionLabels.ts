/** Reading labels only. Source region codes and source documents stay unchanged. */
const countries:Record<string,{name:string;flag:string}>={
 CZ:{name:'Czech Republic',flag:'🇨🇿'},
 DE:{name:'Germany',flag:'🇩🇪'},
 ES:{name:'Spain',flag:'🇪🇸'},
 FR:{name:'France',flag:'🇫🇷'},
 IT:{name:'Italy',flag:'🇮🇹'},
 PL:{name:'Poland',flag:'🇵🇱'},
 ROI:{name:'Republic of Ireland',flag:'🇮🇪'},
 SK:{name:'Slovakia',flag:'🇸🇰'},
 UK:{name:'United Kingdom',flag:'🇬🇧'},
};
export function regionLabel(code:string){
 const key=code.trim().toUpperCase();
 if(key==='ALL')return {label:`All regions (${code})`,flag:''};
 const country=Object.prototype.hasOwnProperty.call(countries,key)?countries[key]:undefined;
 return country?{label:`${country.name} (${code})`,flag:country.flag}:{label:code,flag:''};
}
