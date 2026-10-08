import './Style/loginForm.css'

export const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <p className="login-subtitle">Sign in to continue to your tasks.</p>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <button type="submit">Log in</button>
      </form>
    </main>
  )
}
