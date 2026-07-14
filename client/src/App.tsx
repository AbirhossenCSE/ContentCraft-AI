import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
        ContentCraft AI
      </h1>
      <p className="text-slate-400 mb-6 text-center max-w-md">
        Client scaffolding successful. AI content generation for blog posts,
        social captions, and product descriptions.
      </p>
      <div className="flex gap-4">
        <Link
          to="/about"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition"
        >
          Go to About
        </Link>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">About Page</h1>
      <p className="text-slate-400 mb-6">
        This is the about page testing React Router.
      </p>
      <Link
        to="/"
        className="text-purple-400 hover:text-purple-300 underline font-semibold"
      >
        Back Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
