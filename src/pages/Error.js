import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-page centered">
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/"> Home </Link>
    </section>
  );
};

export default Error;
