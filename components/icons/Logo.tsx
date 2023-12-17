//import image  next/image
import  Image  from 'next/image';

const Logo = ({ className = '', ...props }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <Image src="/logo.png" alt="logo" width="32" height="32" />
   
  </svg>
);

export default Logo;
