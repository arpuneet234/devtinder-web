const Footer = () => {
  return (
    <footer className="bg-base-200 text-center py-4 fixed bottom-0 w-full">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} DevTinder · Built with ❤️ by @yourusername
      </p>
    </footer>
  );
};

export default Footer;
