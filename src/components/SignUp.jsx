import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setUser({ ...user, [id]: value });
  };

  return (
    <div className="offset-lg-3 col-lg-6">
      <div className="card">
        <div className="card-header">
          <h1>Sign up</h1>
        </div>
        <div style={{ marginTop: "20%", borderRadius: "0" }} className="form-dialogue">
          <form className="container">
            <div className="row">
              {["First name", "Last name", "Email", "Phone", "Password"].map(
                (field) => (
                  <div key={field} className="col-lg-6">
                    <div className="form-group">
                      <label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                        <span className="errmsg">*</span>
                      </label>
                      <input
                        type={field === "password" ? "password" : "text"}
                        value={user[field]}
                        onChange={handleChange}
                        name={field}
                        className="form-control"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="form-dialogue">
              <button type="submit" className="continue-shopping">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
