import { st, classes } from "./Header.st.css";

const Header = () => {
  return (
    <div className={st(classes.root)}>
      <div>
        <img
          className={st(classes.logomgz)}
          src="http://pagebuilder.mgzdemo.com/static/version1658714282/adminhtml/Magento/backend/en_US/Magezon_Demo/images/logo.png"
          alt="Magezon"
          height="35"
        />
      </div>
      <div className={st(classes.namemgz)}>Magezon Page Builder</div>
      <div className={st(classes.btnActions)}>
        <button>abc</button>
      </div>
    </div>
  );
};

export default Header;
