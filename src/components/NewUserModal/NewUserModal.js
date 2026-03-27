import { useState } from "react";
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../firebase/config";
import styles from "./NewUserModal.module.css";

const NewUserModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let tempApp;
    try {
      tempApp = initializeApp(firebaseConfig, "temp-register");
      const tempAuth = getAuth(tempApp);
      await createUserWithEmailAndPassword(tempAuth, email, password);
      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está cadastrado.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha deve ter no mínimo 6 caracteres.");
      } else {
        setError("Erro ao cadastrar usuário.");
      }
    } finally {
      if (tempApp) await deleteApp(tempApp);
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Novo Usuário</h3>
          <button className={styles.btnClose} onClick={onClose}>✕</button>
        </div>

        {success ? (
          <div className={styles.successMsg}>
            <p>Usuário cadastrado com sucesso!</p>
            <button className={styles.btnPrimary} onClick={() => setSuccess(false)}>
              Cadastrar outro
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className={styles.field}>
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            {error && <span className={styles.error}>{error}</span>}
            <div className={styles.actions}>
              <button type="button" className={styles.btnSecondary} onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className={styles.btnPrimary} disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewUserModal;
