import Link from "next/link";

export default function Header() {
    return (
        <header className="align-center my-4 flex justify-between">
            <Link href="/dashboard" className="text-2xl font-bold">
                App
            </Link>

            <div>
                Toggle Theme | User dropdown
            </div>

        </header>
    );
}