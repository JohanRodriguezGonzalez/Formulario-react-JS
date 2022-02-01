import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { rol: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.rol) {
      errors.rol = "El rol es obligatorio!";
    }
    if (!values.email) {
      errors.email = "El email es obligatorio!";
    } else if (!regex.test(values.email)) {
      errors.email = "Este no es un formato de correo electrónico válido!";
    }
    if (!values.password) {
      errors.password = "El Password es obligatorio";
    } else if (values.password.length < 4) {
      errors.password = "El password debe tener más de 4 caracteres";
    } else if (values.password.length > 10) {
      errors.password =  " El no puede exceder más de 10 caracteres";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Iniciado sesión con éxito</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Formulario </h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>rol</label>
            <input
              type="text"
              name="Rol"
              placeholder="Rol"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
