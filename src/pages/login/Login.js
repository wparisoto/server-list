import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResetMsg("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setResetMsg("");

    if (!email) {
      setError("Preencha o e-mail acima para recuperar a senha.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMsg("E-mail de recuperação enviado. Verifique sua caixa de entrada.");
    } catch (err) {
      setError("Não foi possível enviar o e-mail. Verifique o endereço informado.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Servers Panel</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <span className={styles.error}>{error}</span>}
          {resetMsg && <span className={styles.success}>{resetMsg}</span>}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button type="button" className={styles.btnReset} onClick={handlePasswordReset}>
            Esqueceu a senha?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
