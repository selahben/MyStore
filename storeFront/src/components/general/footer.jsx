import { Link } from "react-router-dom";
import { SocialLinks } from "./socialLinks";

export function Footer() {
  return (
    <footer>
      <SocialLinks />
      <div id="footerMenu">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-nav navbar-collapse">
              <Link className="nav-link" to="/about">
                About
              </Link>
              <Link className="nav-link" to="#">
                Terms of Use
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div id="footerBottom">
        <p>All Right Reserved to My Store LTD.</p>
        <p>Designed and Built by Ben Cohen.</p>
      </div>
    </footer>
  );
}
