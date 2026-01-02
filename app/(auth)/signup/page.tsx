import SignupForm from "./components/signupForm";
import LoginForm from "./components/signupForm";

export default function Page() {
  return <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] pt-10 pb-20">
    <div className="flex flex-col space-y-8 text-center">
      <h1 className="text-2xl font-semibold">Welcome!</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Please, sign up to your use our app
      </p>
    </div>
    <div><SignupForm/></div>
  </div>
}