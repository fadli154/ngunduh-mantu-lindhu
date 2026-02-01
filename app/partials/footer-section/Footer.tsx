import Link from "next/link";
import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import Image from "next/image";

const links = [
  { title: "Home", href: "#home" },
  { title: "Info", href: "#info" },
  { title: "RSVP", href: "#rsvp" },
  { title: "Gift", href: "#gift" },
  { title: "Gallery", href: "#gallery" },
];

const socials = [
  { label: "X/Twitter", href: "#", icon: FaXTwitter },
  { label: "Facebook", href: "#", icon: FaFacebook },
  {
    label: "Instagram",
    href: "https://www.instagram.com/wennytrilandari?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    icon: FaInstagram,
  },
];

export default function FooterSection() {
  return (
    <footer className="py-20 md:py-30 border-t border-muted bg-primary-500/10 dark:bg-dark2-600">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm md:text-base 2xl:text-lg">
        <div className="flex justify-center mb-8">
          <Image
            src="/img/heart.png"
            alt="Logo"
            className="drop-shadow-2xl drop-shadow-text-500/30"
            width={50}
            height={50}
          />
        </div>

        <nav className="my-8 flex flex-wrap justify-center gap-6 text-sm md:text-base 2xl:text-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline opacity-60 font-semibold"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex justify-center space-x-6 text-muted-foreground">
          {socials.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="hover:text-foreground transition-colors"
            >
              <Icon className="w-5 h-5 2xl:w-6 2xl:h-6 text-text-500/50" />
            </Link>
          ))}
        </div>

        <p className="mt-10 text-xs md:text-sm 2xl:text-base text-muted-foreground">
          &copy; {new Date().getFullYear()} Lindhu & Fikha. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
