import dns from 'dns';
import util from 'util';

const resolve4 = util.promisify(dns.resolve4);
const resolveCname = util.promisify(dns.resolveCname);

export const testJikanDns = async () => {
  try {
    console.log('Testing DNS resolution for api.jikan.moe...');
    
    // Test IPv4
    const addresses = await resolve4('api.jikan.moe');
    console.log('IPv4 addresses:', addresses);
    
    // Test CNAME
    try {
      const cname = await resolveCname('api.jikan.moe');
      console.log('CNAME:', cname);
    } catch (error) {
      console.log('No CNAME record');
    }
    
    return addresses;
  } catch (error) {
    console.error('DNS resolution failed:', error);
    return null;
  }
};