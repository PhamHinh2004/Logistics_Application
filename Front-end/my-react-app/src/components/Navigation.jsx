const NAV_LINKS = [
  { label: "Home", path: "/", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "About us", path: "/about", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "News", path: "/news", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "Contact", path: "/contact", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" },
  { label: "Services", path: "/services", className: "block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-black-300 hover:underline mr-4" }
];

export default function Navigation() {
  return (
    <>
      <nav class="sticky top-0 left-0 w-full flex items-center justify-between flex-wrap bg-stone-100 p-3 shadow-md">
        <div class="flex items-center flex-shrink-0 text-black mr-6">
          <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span class="font-semibold text-xl tracking-tight">OceanWings</span>
        </div>
        <div class="flex items-center justify-center gap-8">
          <div class="text-sm lg:flex-grow">
           {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.path} class={link.className}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
          <div class="flex gap-4">
            <button onClick={() => window.location.href = "/login"} class="bg-emerald-900 hover:bg-emerald-700 text-white font-bold py-2 px-4 border border-emerald-900 rounded">Login</button>
            <button onClick={() => window.location.href = "/register"} class="bg-emerald-900 hover:bg-emerald-700 text-white font-bold py-2 px-4 border border-emerald-900 rounded">Register</button>
          </div>
      </nav >
    </>
  )
}