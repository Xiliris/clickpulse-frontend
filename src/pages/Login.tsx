import { FC, Suspense, useRef } from "react";
import Header from "../components/header";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

const Auth: FC = () => {
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Header title="Login" />
      <main className="h-screen w-screen flex justify-center items-center">
        <div className="border-secondary-200 border-2 p-6 rounded-md flex flex-col gap-6">
          <h1 className="text-primary text-2xl text-center">Login</h1>
          <Input placeholder="Email" type="email" name="password" />
          <Input placeholder="Password" type="password" name="password" />
        </div>
      </main>
    </Suspense>
  );
};

export default Auth;
