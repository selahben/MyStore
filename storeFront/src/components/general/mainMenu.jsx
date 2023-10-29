import { useState } from "react";
import { useStoreContext } from "../../context/store.context";

export function MainMenu() {
  const { setProductsFilter, categories, setSearchQuery } = useStoreContext();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const mobMenuClasses = [
    "collapse",
    "navbar-collapse",
    mobileMenuVisible ? "show" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav id="mainMenuNav" className="navbar navbar-expand-md">
      <div className="container-fluid justify-content-sm-center">
        <button
          id="mobileBurger"
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainMenu"
          aria-controls="mainMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
        >
          <span className="navbar-dark navbar-toggler-icon"></span>
        </button>

        <div className={mobMenuClasses} id="mainMenu">
          <ul id="mainMenuUL" className="navbar-nav">
            {categories.map((category, index) => {
              return (
                <li key={index} className={"nav-item " + category.className}>
                  <button
                    className="nav-link btn"
                    onClick={() => {
                      setProductsFilter(category.className);
                      setSearchQuery("");
                      setMobileMenuVisible(false);
                    }}
                  >
                    {category.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
