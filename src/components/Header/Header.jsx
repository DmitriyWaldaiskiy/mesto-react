import logo from '../../images/Vector_header.svg';
export default function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип сайта' />
    </header>
  );
}
