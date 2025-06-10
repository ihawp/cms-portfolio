import { useState } from 'react';

function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const submitLogin = async (event) => {
        event.preventDefault();

        // Attempt a login.
        try {
          const response = await fetch(import.meta.env.VITE_SERVER_URL + 'auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
            credentials: 'include',
          });

          const result = await response.json();
          console.log(result);
        } catch (error) {
          // Do nothing. The interface is just for me, and anyone attempting logins should get to know nothing.
        }
    };

    return <form onSubmit={submitLogin}>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            required
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            required
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Login" />
    </form>
}

export default LoginForm;