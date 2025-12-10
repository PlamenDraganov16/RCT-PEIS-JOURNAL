import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm.js";
import UserContext, { useUserContext } from "../../contexts/UserContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { loginHandler } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { isAuthenticated } = useUserContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const loginSubmitHandler = async (values) => {
    const { email, password } = values;
    let newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await loginHandler(email, password);
      navigate('/');
    } catch (err) {
      setErrors({ submit: err.message || 'Login failed' });
    } finally {
      setSubmitting(false);
    }
  };

  const { register, formAction } = useForm(loginSubmitHandler, {
    email: '',
    password: '',
  });

  return (
    <section className="content auth bg-gray-900 min-h-[80.8vh] flex items-center justify-center">
      <form className="container bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md" action={formAction}>
        <div className="brand-logo mb-4"></div>
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>

        <label htmlFor="email" className="text-gray-200">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Your Email"
          className="w-full mb-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <label htmlFor="password" className="text-gray-200">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          placeholder="Password"
          className="w-full mb-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

        {errors.submit && <p className="text-red-500 text-sm mb-2">{errors.submit}</p>}

        <button
          type="submit"
          onClick={(e) => formAction(new FormData(e.currentTarget.closest('form')))}
          disabled={submitting}
          className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${submitting ? 'bg-green-400/60 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {submitting ? 'Loading...' : 'Login'}
        </button>
      </form>
    </section>
  );
}