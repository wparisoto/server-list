import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import NewUserModal from "../NewUserModal/NewUserModal";
import styles from "./Navbar.module.css";

const Navbar = ({ user }) => {
  const [showNewUser, setShowNewUser] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.menuArea}>
          <span className={styles.title}>Servers Panel</span>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.btnMenu}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Cadastrar ▾
            </button>
            {dropdownOpen && (
              <ul className={styles.dropdownList}>
                <li>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => { setShowNewUser(true); setDropdownOpen(false); }}
                  >
                    Usuário
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className={styles.userArea}>
          <span className={styles.email}>{user.email}</span>
          <button className={styles.btnLogout} onClick={handleLogout}>
            Sair
          </button>
        </div>
      </nav>

      {showNewUser && <NewUserModal onClose={() => setShowNewUser(false)} />}
    </>
  );
};

export default Navbar;
