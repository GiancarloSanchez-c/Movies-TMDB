import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Netflix from "../../assets/netflix.png";

const headerNav = [
  {
    index: 1,
    name: "Home",
    path: "/",
  },
  {
    index: 2,
    name: "Movies",
    path: "/movie",
  },
  {
    index: 3,
    name: "TV Series",
    path: "/tv",
  },
];

export const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("Header-shrink");
      } else {
        headerRef.current.classList.remove("Header-shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <header ref={headerRef} className="Header">
      <div className="Wrapper">
        <div className="Header-left">
          <h1 className="Header-h1">
            <Link to="/" title="MovieNet" className="Header-a">
              <img src={Netflix} alt="Logo Netflix" loading="lazy" className="Header-img" />
            </Link>
          </h1>

          <ul className="Header-ul">
            {headerNav.map(({ name, path, index }) => (
              <li key={index} className={`Header-li ${index === active ? "active" : ""}`}>
                <Link className="Header-a" to={path} title={name}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
