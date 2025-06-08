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

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(form), // Convert form data to JSON
        credentials: 'include', // Include cookies if needed
      });

      const result = await response.json();
      console.log(result); // Handle the server response
    } catch (error) {
      console.error('Error:', error); // Catch errors
    }
  };

  return (
    <form onSubmit={submitLogin}>
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
  );
}

export default LoginForm;