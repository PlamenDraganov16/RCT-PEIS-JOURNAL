import { useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import { useUserContext } from "../../contexts/UserContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { registerHandler } = useUserContext();
  const [errors, setErrors] = useState({});

  const registerSubmitHandler = async (values) => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await registerHandler(email, password);
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.message || 'Registration failed' });
    }
  };

  const { register, formAction } = useForm(registerSubmitHandler, {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <section className="content auth bg-gray-900 min-h-[80.8vh] flex items-center justify-center">
      <form className="container bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md" action={formAction}>
        <div className="brand-logo mb-4"></div>
        <h1 className="text-2xl font-bold text-white mb-4">Register</h1>

        <label htmlFor="firstName" className="text-gray-200">First Name:</label>
        <input
          id="firstName"
          {...register('firstName')}
          placeholder="First Name"
          className="w-full mb-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.firstName && <p className="text-red-500 text-sm mb-2">{errors.firstName}</p>}

        <label htmlFor="lastName" className="text-gray-200">Last Name:</label>
        <input
          id="lastName"
          {...register('lastName')}
          placeholder="Last Name"
          className="w-full mb-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.lastName && <p className="text-red-500 text-sm mb-2">{errors.lastName}</p>}

        <label htmlFor="email" className="text-gray-200">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          placeholder="Your Email"
          className="w-full mb-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <label htmlFor="password" className="text-gray-200">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          placeholder="Password"
          className="w-full mb-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        <label htmlFor="confirmPassword" className="text-gray-200">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          placeholder="Repeat Password"
          className="w-full mb-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}

        {errors.submit && <p className="text-red-500 text-sm mb-2">{errors.submit}</p>}

        <input
          className="btn submit w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
          type="submit"
          value="Register"
        />
      </form>
    </section>
  );
}