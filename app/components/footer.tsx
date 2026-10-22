import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="c-footer">
      <div className="o-container">
        <div className="c-footer__content">
          <div className="c-footer__col contacts">
            <h4 className="title">Kontakt</h4>
            <div className="contact">
              <b>MTÜ Noorte Mereklubi</b>
              <p>Reg. Nr. 80067875</p>
            </div>
            <div className="contact">
              <b>Sõudebaasi tee 23</b>
              <p>13517 Tallinn</p>
            </div>
            <div className="contact">
              <b>
                info@<span style={{ display: "none" }}>ignoreme-</span>
                merelaager.ee
              </b>
              <p>+372 5628 6586</p>
            </div>
          </div>
          <div className="c-footer__col snippets">
            <div className="search">
              <h4 className="title">
                <label htmlFor="search">Otsing</label>
              </h4>
              <input
                className="search-box"
                id="search"
                name="search"
                placeholder="See endiselt ei tööta :("
                type="search"
              />
            </div>
            <div className="social">
              <h4 className="title">Jälgige meid</h4>
              <ul className="icons">
                <li className="icon">
                  <a href="https://www.facebook.com/merelaager/">
                    <img loading="lazy" alt="Facebook" src="/img/icons/fb_icon.svg" />
                  </a>
                </li>
                <li className="icon">
                  <a href="https://www.instagram.com/merelaager/">
                    <img loading="lazy" alt="Instagram" src="/img/icons/ig_icon.svg" />
                  </a>
                </li>
                <li className="icon">
                  <a href="https://youtu.be/traAY8Hqg_U">
                    <img loading="lazy" alt="Youtube" src="/img/icons/yt_icon.svg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="c-footer__col logo">
            <Link to={"/"}>
              <img loading="lazy" alt="Merelaagri logo" src="/img/merelaager_logo_white.svg" />
            </Link>
          </div>
        </div>
        <div className="c-footer__legal">
          <span>© {new Date().getFullYear()} Merelaager</span>
          <Link to={"/sisukaart/"}>Sisukaart</Link>
          <Link to={"/info/laagrist/#kodukord"}>Kodukord</Link>
          <Link to={"/oiguslik/kasutajatingimused/"}>Kasutajatingimused</Link>
          <Link to={"/oiguslik/isikuandmed/"}>Isikuandmete töötlemine</Link>
          <Link to={"/oiguslik/kupsised/"}>Küpsised</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
