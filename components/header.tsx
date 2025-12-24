import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
    return (
        <header className="align-center my-4 flex justify-between">
            <div className="space-x-6">
                <Link href="/dashboard" className="text-2xl font-bold">
                    App
                </Link>
                <Link href="/playground" className="text-2xl font-bold">
                    Playground
                </Link>
            </div>

            <div>
                <ThemeToggle/> | User dropdown
            </div>

        </header>
    );
}