export function sortMethods (a, b,type) {
  var newa = parseFloat(a.replace(/,/g,'')),newb = parseFloat(b.replace(/,/g,''));
  if(type == "desc"){return newb-newa;}
  if(type == "asc"){return newa-newb;}
};
