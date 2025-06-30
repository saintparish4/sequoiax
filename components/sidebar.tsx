"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Dashboard", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Raise", href: "/raise" },
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/api/auth/logout" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-60 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <div className="py-6 px-4 text-2xl font-bold">Sequoia</div>
      <nav className="mt-6 space-y-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              "block px-4 py-2 rounded" +
              (path.startsWith(item.href)
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700")
            }
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
