import { useState } from 'react';

function RegisterForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', username: '' };

    // Email validation
    if (!form.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email.';
      isValid = false;
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    // Username validation
    if (!form.username) {
      newErrors.username = 'Username is required.';
      isValid = false;
    } else if (form.username.length < 5 || form.username.length > 16) {
      newErrors.username = 'Username must be between 5 and 16 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitRegister = async (event) => {
    event.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form), // Send form as JSON
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Registration successful:', result);
        // Redirect to login page or show success message
      } else {
        console.error('Registration failed:', result);
        // Handle any validation errors returned from the backend (if any)
        setErrors(result.errors || {});
      }
    } catch (error) {
      console.error('Error:', error); // Catch any network or fetch errors
    }
  };

  return (
    <form onSubmit={submitRegister}>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </label>
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </label>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
          />
        </label>
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;