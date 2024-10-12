export function isValidEthereumAddressOrDomain(address: string): { isValid: boolean; type: 'Ethereum Address' | '.eth Domain' | 'Invalid' } {
    // Regex for Ethereum address
    const ethRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    
    // Regex for .eth domain
    const ethDomainRegex = /^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.eth$/;
  
    if (ethRegex.test(address)) {
      return { isValid: true, type: 'Ethereum Address' };
    } else if (ethDomainRegex.test(address)) {
      return { isValid: true, type: '.eth Domain' };
    } else {
      return { isValid: false, type: 'Invalid' };
    }
  }
