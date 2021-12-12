import { useState } from "react";
import { useRouter } from "next/router";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [campus, setCampus] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onRegister = async () => {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      campus: campus,
      password: password,
    };
    console.log("new user : ", newUser);

    fetch("/api/signup/", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        const data = res;
        console.log(data);
        return data;
      })
      .then((temp) => {
        console.log(temp);
        if (temp.status == 201) {
          console.log("token : ", temp.token);
          localStorage.setItem("token", temp.token);
          router.push("/management/management"); //management/management
        } else {
          return {
            redirect: {
              destination: "/connectionRegistration",
              permanent: false,
            },
          };
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            S'inscrire
          </h2>
        </div>
        <form method="POST">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="shadow-sm -space-y-px">
                <div>
                  <label htmlFor="first-name" className="sr-only">
                    Prénom
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="first-name"
                    required
                    className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 sm:text-sm"
                    placeholder="Prénom"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="sr-only">
                    Nom
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="last-name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 sm:text-sm"
                    placeholder="Nom"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email-address-registration"
                    className="sr-only"
                  >
                    Email vinci
                  </label>
                  <input
                    id="email-address-registration"
                    name="email-address"
                    type="email"
                    autoComplete="email-address"
                    pattern="[a-z0-9._%+-]+@(?:student.vinci.be|vinci.be)"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 sm:text-sm"
                    placeholder="Email vinci"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email-address-registration"
                    className="campus"
                  >
                    Sélectionner votre campus principal :
                  </label>
                  <select
                    id="campus"
                    required
                    name="campus"
                    autoComplete="campus"
                    className="mt-1 block w-full py-2 px-3 border rounded-none border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                    onChange={(e) => -setCampus(e.target.value)}
                    defaultValue="Woluwe"
                  >
                    <option key="Woluwe" value="Woluwe">
                      Woluwé
                    </option>
                    <option key="Louvain-la-Neuve" value="Louvain-la-Neuve">
                      Louvain-la-Neuve
                    </option>
                    <option key="Ixelles" value="Ixelles">
                      Ixelles
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="password-registration" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password-registration"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-b-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:border-green-700 bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                onClick={onRegister}
              >
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registration;
