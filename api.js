import axios from 'axios';


const foreignRequest = (type, fullPath,params,config) => axios
    .request({ url: `${fullPath}`, method: type, params:params, headers:config})
    .then(req => req.data);

export const getSolar = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/solarData.php',{},{'Content-Type':'application/json'});

export const getUtcTime = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/utcTime.php',{},{'Content-Type':'application/json'});

export const getResults = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/getFull.php',params,{'Content-Type':'application/json'});

export const getPrefix = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/getPrefixInfo.php',params,{'Content-Type':'application/json'});

export const getPrefixInverse = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/getPrefixInverseInfo.php',params,{'Content-Type':'application/json'});

export const getRepeaters = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/getRepesV2.php',params,{'Content-Type':'application/json'});
export const getRepeatersLocals = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/getLocalsR.php',params,{'Content-Type':'application/json'});
export const postQSOLA = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/postQSOAL.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});

export const getFeedback = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/getFeedbacks.php',params,{'Content-Type':'application/json'});
export const postFeedback = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/newFeedback.php',params,{'Content-Type':'Content-Type: text/html','Control-Allow-Origin':'*'});
export const newMember = (params) => foreignRequest('get', 'http://ham.qrits.com.ar/api/newMember.php',params,{'Content-Type':'Content-Type: text/html'});
export const getCountries = () => foreignRequest('get', 'http://ham.qrits.com.ar/api/getCountries.php',null,{'Content-Type':'application/json'});
