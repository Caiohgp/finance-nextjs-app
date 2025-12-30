import LoginForm from "./components/loginform";

export default function Page() {
  return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] pt-10 pb-20">
    <div className="flex flex-col space-y-8 text-center">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Enter your username and password to sign in/create your account.
      </p>
    </div>
    <div><LoginForm/></div>
  </div>
}