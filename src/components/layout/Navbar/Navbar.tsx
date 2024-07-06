import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  logOut,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";

export default function NavbarArea() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <header className="border-b-1 relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            <div>
              <h3
                id="WindUI"
                aria-label="logo"
                aria-current="page"
                className="lg:flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              >
                Comment Box
              </h3>
              <h3>Welcome Back {user?.username}</h3>
            </div>

            <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
              <button
                className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-emerald-200 transition duration-300 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                onClick={handleLogout}
              >
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
