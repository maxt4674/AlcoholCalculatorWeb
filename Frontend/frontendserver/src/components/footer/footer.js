import React from 'react';
import '../../css/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Redwire Software</p>
    </footer>
  );
}

export default Footer;