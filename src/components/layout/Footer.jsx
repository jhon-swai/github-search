import React from 'react';

function Footer() {
	const footerYear = new Date().getFullYear();
  return <footer className='footer p-3 bg-gray-700 text-primary-content footer-center'>
    <div>
      <p>Copyrights &copy; {footerYear} Chinaa, Inc </p>
    </div>
  </footer>;
}

export default Footer;
